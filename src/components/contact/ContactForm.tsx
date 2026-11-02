"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";

const fieldClass =
  "w-full rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] px-4 py-3.5 text-sm text-[#242321] outline-none transition placeholder:text-[#A7A19A] focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10 dark:border-[#374151] dark:bg-[#111827] dark:text-[#F9FAFB] dark:placeholder:text-[#9CA3AF]";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General enquiry");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contactEmail) {
      toast.error("Contact email is not configured yet.");
      return;
    }

    const emailSubject = `[Kreovix] ${subject}`;
    const emailBody = `Name: ${name}\nEmail: ${email}\nEnquiry: ${subject}\n\n${message}`;
    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Opens the visitor's mail app. This is not a server-side form submission.
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]">
            Your Name <span className="text-[#F06A3C]">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            className={fieldClass}
            required
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]">
            Email Address <span className="text-[#F06A3C]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={fieldClass}
            required
            maxLength={254}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]">
          How can we help? <span className="text-[#F06A3C]">*</span>
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={fieldClass}
          required
        >
          <option value="General enquiry">General enquiry</option>
          <option value="Studio booking">Studio booking</option>
          <option value="Listing a studio">Listing a studio</option>
          <option value="Account support">Account support</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]">
          Your Message <span className="text-[#F06A3C]">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us a little about what you need..."
          className={`${fieldClass} resize-y`}
          required
          minLength={10}
          maxLength={3000}
        />
        <p className="mt-2 text-xs text-[#99938C] dark:text-[#9CA3AF]">
          Please do not include passwords or payment information.
        </p>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F06A3C] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D9562D] sm:w-auto"
      >
        <Send size={17} /> Compose Message <ArrowRight size={16} />
      </button>
      <p className="text-xs leading-6 text-[#77736F] dark:text-[#9CA3AF]">
        This form opens your email application with a prepared message. You will
        need to send the email from there; it does not submit directly to a server.
      </p>
    </form>
  );
}
