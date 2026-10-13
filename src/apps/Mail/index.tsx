"use client";

import * as React from "react";
import { profileData } from "@/data/profile";
import { Send, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MailApp() {
  const [submitted, setSubmitted] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Bot honeypot
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const errStr = err instanceof Error ? err.message : "Failed to deliver message.";
      setErrorMessage(errStr);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-xl mx-auto font-sans text-[var(--color-text-primary)] select-text">
      <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border-subtle)]">
        <Mail className="w-5 h-5 text-[var(--ubuntu-orange)]" />
        <div>
          <h1 className="text-lg font-bold tracking-tight">Compose Inquiry</h1>
          <p className="text-xs text-[var(--color-text-muted)]">Direct message to {profileData.email}</p>
        </div>
      </div>

      {submitted ? (
        <div className="p-6 rounded-[var(--window-radius)] bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] text-center space-y-3 animate-in fade-in duration-200 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h2 className="text-base font-semibold">Message Dispatched!</h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Thank you for reaching out. Your transmission has been recorded and I will respond to your email promptly.
          </p>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
            }}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Hidden Honeypot for bots */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-1.5">
            <label className="text-[var(--color-text-secondary)] font-medium">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Recruiter or Hiring Manager Name"
              className="w-full h-9 px-3 rounded-[var(--control-radius)] bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[var(--color-text-secondary)] font-medium">Your Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full h-9 px-3 rounded-[var(--control-radius)] bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[var(--color-text-secondary)] font-medium">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Full-Stack Opportunity / Software Engineering Role"
              className="w-full h-9 px-3 rounded-[var(--control-radius)] bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[var(--color-text-secondary)] font-medium">Message Body</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Hi Sojib, I reviewed your Ubuntu developer portfolio and would like to connect regarding..."
              className="w-full p-3 rounded-[var(--control-radius)] bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--ubuntu-orange)] transition-colors resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSending}
            className="w-full flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Transmission...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
