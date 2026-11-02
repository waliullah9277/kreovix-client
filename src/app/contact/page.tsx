import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CircleHelp,
  Mail,
  MessageSquareText,
  Sparkles,
  Building2,
} from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Kreovix",
  description:
    "Get in touch with Kreovix about studio bookings, hosting, your account, or a general question.",
};

const faqs = [
  {
    question: "How can I find a studio?",
    answer: "Browse the studio listings, open a space to review its details, and choose a booking time.",
  },
  {
    question: "Can I list my own studio?",
    answer: "Yes. Sign in to your Kreovix account and use Add New Studio to create a listing.",
  },
  {
    question: "Where can I view my bookings?",
    answer: "Once you are signed in, visit My Bookings from the profile menu.",
  },
];

export default function ContactPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#242321] transition-colors dark:bg-[#111827] dark:text-[#F9FAFB]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#17232E] text-white">
        <div className="pointer-events-none absolute -right-24 -top-40 h-[420px] w-[420px] rounded-full bg-[#F06A3C]/15 blur-[95px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F06A3C]/30 bg-[#F06A3C]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FFAF90]">
            <Sparkles size={15} /> Contact Kreovix
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s start a <span className="text-[#F06A3C]">conversation.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
            Questions about booking a studio, listing your space, or your
            account? Tell us what you need and we&apos;ll help you find the
            right next step.
          </p>
        </div>
      </section>

      {/* Contact form and details */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-7 px-4 sm:px-6 lg:grid-cols-[1.45fr_0.85fr] lg:gap-9 lg:px-8">
          <div className="rounded-2xl border border-[#EAE5DF] bg-white p-6 shadow-sm dark:border-[#374151] dark:bg-[#1F2937] sm:p-9">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F06A3C]">
              Send a message
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              We&apos;d love to hear from you.
            </h2>
            <p className="mb-8 mt-3 text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1]">
              Fill in the details below to prepare an email for the Kreovix team.
            </p>
            <ContactForm />
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-[#EAE5DF] bg-white p-6 dark:border-[#374151] dark:bg-[#1F2937] sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE4DB] text-[#F06A3C] dark:bg-[#F06A3C]/15">
                <Mail size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold">Email Us</h3>
              <p className="mt-2 text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1]">
                Prefer writing an email directly? Use the address below.
              </p>
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-4 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-[#F06A3C] hover:text-[#D9562D]"
                >
                  {contactEmail} <ArrowUpRight size={16} className="shrink-0" />
                </a>
              ) : (
                <p className="mt-4 text-sm font-medium text-[#77736F] dark:text-[#9CA3AF]">
                  Contact email will be available soon.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-[#EAE5DF] bg-white p-6 dark:border-[#374151] dark:bg-[#1F2937] sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE4DB] text-[#F06A3C] dark:bg-[#F06A3C]/15">
                <MessageSquareText size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold">Quick Help</h3>
              <p className="mt-2 text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1]">
                Looking for a space or need to manage a listing? You can get
                started directly from the platform.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/studios"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F06A3C] transition hover:text-[#D9562D]"
                >
                  Explore Studios <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/my-listings"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F06A3C] transition hover:text-[#D9562D]"
                >
                  Manage My Listings <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-[#17232E] p-6 text-white sm:p-7">
              <Building2 size={25} className="text-[#F06A3C]" />
              <h3 className="mt-4 text-lg font-bold">Have a space to share?</h3>
              <p className="mt-2 text-sm leading-7 text-white/65">
                Make your creative space discoverable to people looking for
                their next place to create.
              </p>
              <Link
                href="/add-new-studio"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#F06A3C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
              >
                List Your Studio <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16 dark:bg-[#0F1724] sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F06A3C]">
              <CircleHelp size={16} /> Useful answers
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1]">
              Some quick answers to help you get started.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#EAE5DF] bg-[#FAF8F5] p-6 dark:border-[#374151] dark:bg-[#1F2937] sm:p-7"
              >
                <h3 className="font-bold text-[#242321] dark:text-[#F9FAFB]">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
