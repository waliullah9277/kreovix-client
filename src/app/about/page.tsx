import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Clapperboard,
  HeartHandshake,
  Lightbulb,
  Mic2,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Kreovix",
  description:
    "Discover the idea behind Kreovix: a space to find studios, connect with creative hosts, and bring projects to life.",
};

const spaces = [
  { icon: Camera, name: "Photography", detail: "A frame for every story" },
  { icon: Mic2, name: "Podcasting", detail: "Make your voice heard" },
  { icon: Clapperboard, name: "Film & Video", detail: "Build your next scene" },
];

const values = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Creativity comes first",
    description:
      "Great ideas need the right environment. We focus on making it easier to discover spaces that fit your creative vision.",
  },
  {
    icon: HeartHandshake,
    number: "02",
    title: "Better connections",
    description:
      "We bring creators and studio hosts closer together, so finding and sharing a creative space feels more personal.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Clarity at every step",
    description:
      "Clear studio information and a straightforward booking experience help everyone plan with more confidence.",
  },
];

const steps = [
  {
    number: "01",
    title: "Find your space",
    description:
      "Explore studios and discover a setting that matches your project.",
  },
  {
    number: "02",
    title: "Choose your time",
    description:
      "Review studio details and select the booking time that works for you.",
  },
  {
    number: "03",
    title: "Create something great",
    description:
      "Focus on the work you love, with a space that supports your vision.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#242321] transition-colors dark:bg-[#111827] dark:text-[#F9FAFB]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#17232E] text-white">
        <div className="pointer-events-none absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[#F06A3C]/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-56 left-1/4 h-[440px] w-[440px] rounded-full bg-white/5 blur-[110px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F06A3C]/30 bg-[#F06A3C]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FFAF90]">
              <Sparkles size={15} /> About Kreovix
            </span>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              Every great idea deserves the <span className="text-[#F06A3C]">right space.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
              Kreovix is a creative studio discovery and booking platform built to
              connect people with spaces where ideas can come to life. From the
              first photo to the final take, the right setting makes a difference.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F06A3C] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#D9562D]"
              >
                Explore Studios <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#F06A3C] hover:bg-white/10"
              >
                Get in Touch <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Visual content uses icons rather than an external image. */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-3 rounded-[36px] border border-white/10" />
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFAF90]">
                    Made for creators
                  </p>
                  <h2 className="mt-3 max-w-xs text-2xl font-bold leading-snug sm:text-3xl">
                    Find a place to make it happen.
                  </h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F06A3C] text-white">
                  <Sparkles size={23} />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {spaces.map((space) => {
                  const Icon = space.icon;
                  return (
                    <div
                      key={space.name}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F06A3C]/15 text-[#FF986F]">
                        <Icon size={22} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white">{space.name}</p>
                        <p className="mt-1 text-xs text-white/55">{space.detail}</p>
                      </div>
                      <Check size={17} className="text-[#FF986F]" />
                    </div>
                  );
                })}
              </div>
              <p className="mt-7 text-center text-xs text-white/45">
                Creative spaces. Creative possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F06A3C]">
              Our purpose
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Making creative spaces <span className="text-[#F06A3C]">more accessible.</span>
            </h2>
          </div>
          <div className="border-l-2 border-[#F06A3C] pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#625D58] dark:text-[#CBD5E1] sm:text-lg">
              Whether you are a photographer, podcaster, filmmaker, or someone
              with a new idea, finding a suitable studio should not stand in
              the way of creating.
            </p>
            <p className="mt-5 text-sm leading-8 text-[#77736F] dark:text-[#9CA3AF] sm:text-base">
              Kreovix brings studio discovery and booking into one place. We
              want creators to spend less time searching and more time doing
              what they do best—creating.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 dark:bg-[#0F1724] sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F06A3C]">
              What matters to us
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around the way creators work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1] sm:text-base">
              A few simple principles guide the experience we are building.
            </p>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="group rounded-2xl border border-[#EAE5DF] bg-[#FAF8F5] p-7 transition-colors hover:border-[#F06A3C]/40 dark:border-[#374151] dark:bg-[#1F2937] dark:hover:border-[#F06A3C]/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE4DB] text-[#F06A3C] dark:bg-[#F06A3C]/15">
                      <Icon size={23} />
                    </div>
                    <span className="text-sm font-bold text-[#C9C2BB] dark:text-[#64748B]">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-7 text-lg font-bold text-[#242321] dark:text-[#F9FAFB]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F06A3C]">
                Your creative journey
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Your idea. Your space. Your moment.
              </h2>
            </div>
            <Link
              href="/#how-booking-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#F06A3C] transition hover:text-[#D9562D]"
            >
              See how booking works <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-[#EAE5DF] bg-white p-7 dark:border-[#374151] dark:bg-[#1F2937]"
              >
                <span className="text-4xl font-black text-[#F06A3C]/35 dark:text-[#F06A3C]/60">
                  {step.number}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#17232E] px-7 py-14 text-center text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#F06A3C]/15 blur-[70px]" />
          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F06A3C]/15 text-[#F06A3C]">
              <UsersRound size={24} />
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to bring your idea to life?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Find a studio for your next project or share your own creative
              space with the community.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F06A3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
              >
                Find a Studio <ArrowRight size={17} />
              </Link>
              <Link
                href="/add-new-studio"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                List Your Space <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
