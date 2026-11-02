
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu,
    X,
    UserRound,
    Plus,
    Building2,
    CalendarDays,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    const isAuthenticated = !!user;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore Studios", href: "/studios" },
        { name: "How It Works", href: "/#how-booking-works" },
        { name: "About Us", href: "/about" },
    ];

    const profileLinks = [
        { name: "Profile", href: "/profile", icon: UserRound },
        { name: "Add New Studio", href: "/add-new-studio", icon: Plus },
        { name: "My Studio Listings", href: "/my-listings", icon: Building2 },
        { name: "My Bookings", href: "/my-bookings", icon: CalendarDays },
    ];

    const handleNavClick = (href: string) => {
        if (href === "/#how-booking-works") {
            setActiveSection("how-booking-works");
        } else {
            setActiveSection(null);
        }
    };

    const isActive = (href: string) => {
        if (href === "/") {
            return (
                pathname === "/" &&
                activeSection !== "how-booking-works"
            );
        }

        if (href === "/#how-booking-works") {
            return (
                pathname === "/" &&
                activeSection === "how-booking-works"
            );
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleLogout = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "Logout failed!");
                return;
            }

            setIsProfileOpen(false);
            setIsMenuOpen(false);

            toast.success("Logged out successfully!");

            router.push("/login");
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    const renderAvatar = (size = "h-8 w-8") => (
        <div
            className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FCE4DB] text-[#F06A3C] dark:bg-[#374151]`}
        >
            {user?.image ? (
                <Image
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                />
            ) : (
                <UserRound size={18} />
            )}
        </div>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#EAE5DF] bg-[#FAF8F5]/95 backdrop-blur-md transition-colors duration-300 dark:border-[#374151] dark:bg-[#111827]/95">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="shrink-0"
                    onClick={() => setActiveSection(null)}
                >
                    <span className="text-2xl font-extrabold tracking-tight text-[#242321] transition-colors dark:text-[#F9FAFB]">
                        Kreo
                        <span className="text-[#F06A3C]">
                            vix
                        </span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                                isActive(link.href)
                                    ? "text-[#F06A3C]"
                                    : "text-[#77736F] hover:text-[#F06A3C] dark:text-[#CBD5E1] dark:hover:text-[#F06A3C]"
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

                    {/* Desktop Theme Toggle */}
                    <ThemeToggle />

                    {isPending ? (
                        <div className="h-9 w-24 animate-pulse rounded-lg bg-[#F0ECE6] dark:bg-[#374151]" />
                    ) : !isAuthenticated ? (
                        <>
                            <Link
                                href="/login"
                                className="rounded-lg px-4 py-1.5 text-sm font-semibold text-[#242321] transition-colors hover:bg-[#F0ECE6] dark:text-[#F9FAFB] dark:hover:bg-[#1F2937]"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-lg bg-[#F06A3C] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#D9562D] dark:hover:bg-[#E85D31]"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div
                            className="relative"
                            onMouseEnter={() => setIsProfileOpen(true)}
                            onMouseLeave={() => setIsProfileOpen(false)}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setIsProfileOpen(!isProfileOpen)
                                }
                                className="flex items-center gap-2 rounded-full border border-[#EAE5DF] p-1 pr-3 transition-colors hover:bg-white dark:border-[#374151] dark:bg-[#1F2937] dark:hover:bg-[#374151]"
                                aria-expanded={isProfileOpen}
                            >
                                {renderAvatar()}

                                <span className="max-w-32 truncate text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                    {user?.name || "User"}
                                </span>

                                <ChevronDown
                                    size={16}
                                    className={`text-[#77736F] transition-transform dark:text-[#CBD5E1] ${
                                        isProfileOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-full z-50 w-60 pt-2">
                                    <div className="overflow-hidden rounded-xl border border-[#EAE5DF] bg-white py-2 shadow-xl dark:border-[#374151] dark:bg-[#1F2937]">

                                        {/* User Information */}
                                        <div className="border-b border-[#EAE5DF] px-4 py-3 dark:border-[#374151]">
                                            <p className="truncate font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                {user?.name || "User"}
                                            </p>

                                            <p className="truncate text-xs text-[#77736F] dark:text-[#CBD5E1]">
                                                {user?.email}
                                            </p>
                                        </div>

                                        {/* Profile Links */}
                                        {profileLinks.map((link) => {
                                            const Icon = link.icon;

                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() =>
                                                        setIsProfileOpen(false)
                                                    }
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#77736F] transition-colors hover:bg-[#FAF8F5] hover:text-[#F06A3C] dark:text-[#CBD5E1] dark:hover:bg-[#374151] dark:hover:text-[#F06A3C]"
                                                >
                                                    <Icon size={17} />
                                                    {link.name}
                                                </Link>
                                            );
                                        })}

                                        {/* Logout */}
                                        <div className="mt-1 border-t border-[#EAE5DF] pt-1 dark:border-[#374151]">
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                            >
                                                <LogOut size={17} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Theme Toggle & Menu Button */}
                <div className="flex items-center gap-2 lg:hidden">

                    {/* Mobile Theme Toggle */}
                    <ThemeToggle />

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-lg p-2 text-[#242321] transition-colors hover:bg-[#F0ECE6] dark:text-[#F9FAFB] dark:hover:bg-[#1F2937]"
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? (
                            <X size={23} />
                        ) : (
                            <Menu size={23} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-[#EAE5DF] bg-[#FAF8F5] px-5 py-4 shadow-lg dark:border-[#374151] dark:bg-[#111827]">

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleNavClick(link.href);
                                }}
                                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                    isActive(link.href)
                                        ? "bg-[#FCE4DB] text-[#F06A3C] dark:bg-[#374151] dark:text-[#F06A3C]"
                                        : "text-[#77736F] hover:bg-white hover:text-[#F06A3C] dark:text-[#CBD5E1] dark:hover:bg-[#1F2937] dark:hover:text-[#F06A3C]"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Authentication */}
                    <div className="mt-3 border-t border-[#EAE5DF] pt-4 dark:border-[#374151]">
                        {isPending ? (
                            <div className="h-10 animate-pulse rounded-lg bg-[#F0ECE6] dark:bg-[#374151]" />
                        ) : !isAuthenticated ? (
                            <div className="flex gap-3">
                                <Link
                                    href="/login"
                                    onClick={() =>
                                        setIsMenuOpen(false)
                                    }
                                    className="flex-1 rounded-lg border border-[#EAE5DF] py-2 text-center text-sm font-semibold text-[#242321] transition-colors hover:bg-white dark:border-[#374151] dark:text-[#F9FAFB] dark:hover:bg-[#1F2937]"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={() =>
                                        setIsMenuOpen(false)
                                    }
                                    className="flex-1 rounded-lg bg-[#F06A3C] py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#D9562D]"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">

                                {/* Mobile User Information */}
                                <div className="mb-2 flex items-center gap-3 border-b border-[#EAE5DF] px-3 pb-3 dark:border-[#374151]">
                                    {renderAvatar("h-10 w-10")}

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                            {user?.name || "User"}
                                        </p>

                                        <p className="truncate text-xs text-[#77736F] dark:text-[#CBD5E1]">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Mobile Profile Links */}
                                {profileLinks.map((link) => {
                                    const Icon = link.icon;

                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() =>
                                                setIsMenuOpen(false)
                                            }
                                            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[#77736F] transition-colors hover:bg-white hover:text-[#F06A3C] dark:text-[#CBD5E1] dark:hover:bg-[#1F2937] dark:hover:text-[#F06A3C]"
                                        >
                                            <Icon size={17} />
                                            {link.name}
                                        </Link>
                                    );
                                })}

                                {/* Mobile Logout */}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
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
