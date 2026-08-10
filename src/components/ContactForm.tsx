"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", service: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass rounded-3xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10">
          <svg className="h-8 w-8 text-[#25D366]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Message sent!</h3>
        <p className="mt-2 text-[#a7b1d4]">
          We&apos;ll get back to you within 24 hours. For faster responses,{" "}
          <a
            href="https://wa.me/917305448354"
            className="text-[#25D366] underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            message us on WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#a7b1d4]">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-[#5a6388] focus:border-[#6d8bff]/50 focus:outline-none focus:ring-1 focus:ring-[#6d8bff]/50"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#a7b1d4]">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-[#5a6388] focus:border-[#6d8bff]/50 focus:outline-none focus:ring-1 focus:ring-[#6d8bff]/50"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-[#a7b1d4]">
          What are you looking for?
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-[#6d8bff]/50 focus:outline-none focus:ring-1 focus:ring-[#6d8bff]/50"
        >
          <option value="" className="bg-[#0a0e1f]">Select a service</option>
          <option value="ai-apps" className="bg-[#0a0e1f]">AI-Powered App</option>
          <option value="3d-website" className="bg-[#0a0e1f]">3D Interactive Website</option>
          <option value="crm" className="bg-[#0a0e1f]">Custom CRM</option>
          <option value="other" className="bg-[#0a0e1f]">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-[#a7b1d4]">
          Budget range
        </label>
        <select
          id="budget"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-[#6d8bff]/50 focus:outline-none focus:ring-1 focus:ring-[#6d8bff]/50"
        >
          <option value="" className="bg-[#0a0e1f]">Select a range</option>
          <option value="1k-3k" className="bg-[#0a0e1f]">$1,000 – $3,000</option>
          <option value="3k-5k" className="bg-[#0a0e1f]">$3,000 – $5,000</option>
          <option value="5k-10k" className="bg-[#0a0e1f]">$5,000 – $10,000</option>
          <option value="10k+" className="bg-[#0a0e1f]">$10,000+</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#a7b1d4]">
          Tell us about your project <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-[#5a6388] focus:border-[#6d8bff]/50 focus:outline-none focus:ring-1 focus:ring-[#6d8bff]/50"
          placeholder="What do you want to build? Any timeline or specific needs?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full rounded-xl px-6 py-3 text-center font-medium disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 text-center">
          Something went wrong. Please try{" "}
          <a href="https://wa.me/917305448354" className="underline" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>{" "}
          instead.
        </p>
      )}
    </form>
  );
}
