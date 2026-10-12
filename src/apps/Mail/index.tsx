"use client";

import * as React from "react";
import { profileData } from "@/data/profile";
import { Send, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MailApp() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-xl mx-auto font-sans text-white">
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <Mail className="w-5 h-5 text-[var(--ubuntu-orange)]" />
        <div>
          <h1 className="text-lg font-bold tracking-tight">Compose Message</h1>
          <p className="text-xs text-zinc-400">Send an inquiry directly to {profileData.email}</p>
        </div>
      </div>

      {submitted ? (
        <div className="p-6 rounded-[var(--window-radius)] bg-white/5 border border-white/10 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h2 className="text-base font-semibold">Message Dispatched!</h2>
          <p className="text-xs text-zinc-400">
            Thank you for reaching out. I will respond to your email as soon as possible.
          </p>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", subject: "", message: "" });
            }}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-zinc-300 font-medium">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Recruiter / Collaborator Name"
              className="w-full h-9 px-3 rounded-[var(--control-radius)] bg-black/40 border border-white/10 text-white outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-300 font-medium">Your Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full h-9 px-3 rounded-[var(--control-radius)] bg-black/40 border border-white/10 text-white outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-300 font-medium">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Full-Stack Engineering Opportunity / Project Discussion"
              className="w-full h-9 px-3 rounded-[var(--control-radius)] bg-black/40 border border-white/10 text-white outline-none focus:border-[var(--ubuntu-orange)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-300 font-medium">Message Body</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Hi Sojib, I checked out your portfolio and would like to discuss..."
              className="w-full p-3 rounded-[var(--control-radius)] bg-black/40 border border-white/10 text-white outline-none focus:border-[var(--ubuntu-orange)] transition-colors resize-none"
            />
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </Button>
        </form>
      )}
    </div>
  );
}

