
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
    UserRound,
    Camera,
    Mail,
    CalendarDays,
    Save,
    Loader2,
} from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Initialize form values from session
    const [initialized, setInitialized] = useState(false);

    if (user && !initialized) {
        setName(user.name || "");
        setImage(user.image || "");
        setInitialized(true);
    }

    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        setIsSaving(true);

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
                image: image.trim() || null,
            });

            if (error) {
                toast.error(error.message || "Failed to update profile");
                return;
            }

            toast.success("Profile updated successfully!");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#F06A3C]" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                <UserRound className="mb-4 h-12 w-12 text-[#F06A3C]" />

                <h2 className="text-2xl font-semibold text-[#242321]">
                    Please log in
                </h2>

                <p className="mt-2 text-sm text-[#77736F]">
                    You need to log in to access your profile.
                </p>

                <Link
                    href="/login"
                    className="mt-6 rounded-lg bg-[#F06A3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
                >
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FAF8F5] px-4 py-10 md:px-6 lg:py-16">
            <div className="mx-auto max-w-5xl">

                {/* Page Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#F06A3C]">
                        Account Settings
                    </p>

                    <h1 className="text-3xl font-bold text-[#242321] md:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-[#77736F] md:text-base">
                        Manage your personal information and account settings.
                    </p>
                </div>

                {/* Profile Overview */}
                <section className="mb-8 rounded-2xl border border-[#EAE5DF] bg-white p-6 md:p-8">
                    <div className="flex flex-col items-center gap-5 sm:flex-row">

                        {/* Avatar */}
                        <div className="relative">
                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#F8E8E1]">
                                {image ? (
                                    <Image
                                        src={image}
                                        alt={user.name || "User"}
                                        width={100}
                                        height={100}
                                        className="h-24 w-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <UserRound className="h-11 w-11 text-[#F06A3C]" />
                                )}
                            </div>

                            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#F06A3C] text-white">
                                <Camera size={15} />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-xl font-bold text-[#242321]">
                                {user.name}
                            </h2>

                            <p className="mt-1 text-sm text-[#77736F]">
                                {user.email}
                            </p>

                            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#F0F8F1] px-3 py-1 text-xs font-medium text-green-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                Active Account
                            </p>
                        </div>

                    </div>
                </section>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Personal Information */}
                    <section className="rounded-2xl border border-[#EAE5DF] bg-white p-6 md:p-8 lg:col-span-2">
                        <div className="mb-7">
                            <h2 className="text-xl font-bold text-[#242321]">
                                Personal Information
                            </h2>

                            <p className="mt-1 text-sm text-[#77736F]">
                                Update your profile details.
                            </p>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-5">

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#242321]">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#99938C]" />

                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] py-3 pl-12 pr-4 text-sm text-[#242321] outline-none transition focus:border-[#F06A3C]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#242321]">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#99938C]" />

                                    <input
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        className="w-full cursor-not-allowed rounded-xl border border-[#EAE5DF] bg-gray-100 py-3 pl-12 pr-4 text-sm text-[#77736F] outline-none"
                                    />
                                </div>

                                <p className="mt-2 text-xs text-[#99938C]">
                                    Email address cannot be changed here.
                                </p>
                            </div>

                            {/* Profile Image URL */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#242321]">
                                    Profile Image URL
                                </label>

                                <div className="relative">
                                    <Camera className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#99938C]" />

                                    <input
                                        type="url"
                                        name="image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="https://ibb.co.com/xpDwsgn"
                                        className="w-full rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] py-3 pl-12 pr-4 text-sm text-[#242321] outline-none transition focus:border-[#F06A3C]"
                                    />
                                </div>

                                <p className="mt-2 text-xs text-[#99938C]">
                                    Enter a publicly accessible image URL.
                                </p>
                            </div>

                            {/* Save Button */}
                            <div className="pt-3">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F06A3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSaving ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save size={17} />
                                    )}

                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                        </form>
                    </section>

                    {/* Account Details */}
                    <aside>
                        <section className="rounded-2xl border border-[#EAE5DF] bg-white p-6">
                            <h2 className="mb-5 text-lg font-bold text-[#242321]">
                                Account Details
                            </h2>

                            <div className="space-y-5">

                                {/* Account Created */}
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-[#F8E8E1] p-2">
                                        <CalendarDays className="h-5 w-5 text-[#F06A3C]" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-[#99938C]">
                                            Account Created
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#242321]">
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "Not available"}
                                        </p>
                                    </div>
                                </div>

                                {/* Email Verification */}
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-[#F8E8E1] p-2">
                                        <Mail className="h-5 w-5 text-[#F06A3C]" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-[#99938C]">
                                            Email Verification
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#242321]">
                                            {user.emailVerified ? "Verified" : "Not Verified"}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </aside>

                </div>
            </div>
        </main>
    );
}
