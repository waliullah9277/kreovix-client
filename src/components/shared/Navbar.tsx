
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  UserRound,
  LayoutDashboard,
  Plus,
  Building2,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  // Temporary authentication state
  const isAuthenticated = false;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ];

  const profileLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add New Studio", href: "/dashboard/add-studio", icon: Plus },
    { name: "My Studio Listings", href: "/dashboard/my-studios", icon: Building2 },
    { name: "My Bookings", href: "/dashboard/my-bookings", icon: CalendarDays },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EAE5DF] bg-[#FAF8F5]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-2xl font-extrabold tracking-tight text-[#242321]">
            Kreo<span className="text-[#F06A3C]">vix</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-[#F06A3C]"
                  : "text-[#77736F] hover:text-[#F06A3C]"
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#F06A3C]" />
              )}
            </Link>
          ))}
        </div>

        {/* Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-1.5 text-sm font-semibold text-[#242321] transition hover:bg-[#F0ECE6]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#F06A3C] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full border border-[#EAE5DF] p-1 pr-3 transition hover:bg-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FCE4DB] text-[#F06A3C]">
                  <UserRound size={18} />
                </div>

                <span className="text-sm font-semibold text-[#242321]">
                  User Name
                </span>

                <ChevronDown size={16} className="text-[#77736F]" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-[#EAE5DF] bg-white py-2 shadow-xl">
                  <div className="border-b border-[#EAE5DF] px-4 py-3">
                    <p className="font-semibold text-[#242321]">User Name</p>
                    <p className="text-xs text-[#77736F]">user@example.com</p>
                  </div>

                  {profileLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#77736F] transition hover:bg-[#FAF8F5] hover:text-[#F06A3C]"
                      >
                        <Icon size={17} />
                        {link.name}
                      </Link>
                    );
                  })}

                  <div className="mt-1 border-t border-[#EAE5DF] pt-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        // TODO: Connect logout functionality
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-[#242321] transition hover:bg-[#F0ECE6] lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-[#EAE5DF] bg-[#FAF8F5] px-5 py-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-[#FCE4DB] text-[#F06A3C]"
                    : "text-[#77736F] hover:bg-white hover:text-[#F06A3C]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t border-[#EAE5DF] pt-4">
            {!isAuthenticated ? (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 rounded-lg border border-[#EAE5DF] py-2 text-center text-sm font-semibold text-[#242321] transition hover:bg-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 rounded-lg bg-[#F06A3C] py-2 text-center text-sm font-semibold text-white transition hover:bg-[#D9562D]"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {profileLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[#77736F] transition hover:bg-white hover:text-[#F06A3C]"
                    >
                      <Icon size={17} />
                      {link.name}
                    </Link>
                  );
                })}

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    // TODO: Connect logout functionality
                  }}
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
