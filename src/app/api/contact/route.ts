import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

// Clean up stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();

    // 1. Rate Limiting Check
    const rateEntry = rateLimitMap.get(ip);
    if (rateEntry) {
      if (now < rateEntry.resetTime) {
        if (rateEntry.count >= MAX_REQUESTS) {
          const retryAfterSec = Math.ceil((rateEntry.resetTime - now) / 1000);
          return NextResponse.json(
            {
              error: "Rate limit reached. Please wait before sending another inquiry.",
              retryAfterSec,
            },
            {
              status: 429,
              headers: { "Retry-After": String(retryAfterSec) },
            }
          );
        }
        rateEntry.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // 2. Body parsing
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // 3. Honeypot Bot Detection
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json(
        { error: "Invalid submission detected." },
        { status: 400 }
      );
    }

    // 4. Input Validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long." },
        { status: 420 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json(
        { error: "Subject must be at least 3 characters long." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 8) {
      return NextResponse.json(
        { error: "Message must be at least 8 characters long." },
        { status: 400 }
      );
    }

    // 5. Test Email Dispatch Simulation / Provider Logging
    const testDeliveryNotice = `[Contact API] From: "${name}" <${email}> | Subject: "${subject}" | Length: ${message.length} chars`;
    console.log(testDeliveryNotice);

    return NextResponse.json({
      success: true,
      message: "Your message has been received! I will get back to you shortly.",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
