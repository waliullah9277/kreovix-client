
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Explore Spaces", href: "/studios" },
    { name: "How It Works", href: "/#how-booking-works" },
    { name: "Become a Host", href: "/#become-a-host" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    {
      name: "Photography Studios",
      href: "/studios?category=photography",
    },
    {
      name: "Film & Production",
      href: "/studios?category=film",
    },
    {
      name: "Podcast Studios",
      href: "/studios?category=podcast",
    },
    {
      name: "Creative Spaces",
      href: "/studios?category=creative",
    },
    {
      name: "Event Spaces",
      href: "/studios?category=event",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#17232E] text-white">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#F06A3C]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 h-96 w-96 rounded-full bg-[#F06A3C]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Newsletter Section */}
        <div className="border-b border-white/10 py-14 md:py-16">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-xl">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#F06A3C]">
                Stay Inspired
              </span>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                A little creativity in
                <br className="hidden sm:block" /> your inbox.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/50">
                Get creative space inspiration, new studio discoveries, and
                exclusive updates straight to your inbox.
              </p>
            </div>

            {/* Newsletter Form - UI Only */}
            <div className="w-full max-w-md">
              <label
                htmlFor="newsletter-email"
                className="mb-3 block text-xs font-medium text-white/70"
              >
                Subscribe to our newsletter
              </label>

              <div className="flex items-center rounded-full border border-white/15 bg-white/[0.06] p-1.5 transition-colors focus-within:border-[#F06A3C]">
                <Mail
                  size={18}
                  className="ml-3 shrink-0 text-white/40"
                />

                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
                />

                <button
                  type="button"
                  aria-label="Subscribe to newsletter"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F06A3C] text-white transition-all hover:bg-[#D9562D]"
                >
                  <ArrowRight size={19} />
                </button>
              </div>

              <p className="mt-3 text-xs text-white/35">
                No spam. Just inspiration. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F06A3C]">
                <span className="text-xl font-bold text-white">K</span>
              </div>

              <span className="text-xl font-bold tracking-tight">
                Kreovix
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
              A space for every creative vision. Discover unique studios,
              connect with inspiring hosts, and bring your next big idea to life.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/50">
              <MapPin size={16} className="text-[#F06A3C]" />
              Made for creators, everywhere.
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all duration-300 hover:border-[#F06A3C] hover:bg-[#F06A3C] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.8V21h-3.8v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.4V9Z" />
                </svg>
              </a>

              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all duration-300 hover:border-[#F06A3C] hover:bg-[#F06A3C] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.1L5.8 22H2.6l7.3-8.4L2 2h6.5l4.4 6.5L18.9 2Zm-1.1 18h1.7L7.5 3.9H5.7L17.8 20Z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all duration-300 hover:border-[#F06A3C] hover:bg-[#F06A3C] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.25 3.28 1.6.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.22-5.08 5.49.4.35.75 1.02.75 2.06V22c0 .29.2.63.76.53A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-6 text-sm font-semibold text-white">
              Explore
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-[#F06A3C]"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 text-sm font-semibold text-white">
              Popular Categories
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-white/50 transition-colors hover:text-[#F06A3C]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-sm font-semibold text-white">
              Legal
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/50 transition-colors hover:text-[#F06A3C]"
                >
                  Privacy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/50 transition-colors hover:text-[#F06A3C]"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Kreovix. All rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Designed for creators. Built for possibilities.
          </p>

          <Link
            href="/terms"
            className="inline-flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-[#F06A3C]"
          >
            Terms & Conditions
            <ArrowUpRight size={13} />
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
