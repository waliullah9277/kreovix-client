
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, UserRound, Mail, Image, Lock } from "lucide-react";
import { toast } from "sonner";

const RegisterForm = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Password Validation
    const validatePassword = (value: string) => {
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }

        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter.";
        }

        if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter.";
        }

        return "";
    };

    // Real-time Password Validation
    const passwordChecks = {
        minLength: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
    };

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check password before registration
        const passwordError = validatePassword(password);

        if (passwordError) {
            setError(passwordError);
            return;
        }

        setError("");

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            image: string;
            password: string;
        };

        // console.log(user);

        const { data, error } = await authClient.signUp.email({
            ...user,
        });

        if (data) {
            toast.success("User Create Successfully!");
            redirect("/");
        }

        if (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        }
    };

    const handleGoogleRegister = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    const inputClass =
        "w-full rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] py-3 pl-11 pr-4 text-sm text-[#242321] dark:text-[#F9FAFB] outline-none transition placeholder:text-[#A7A19A] dark:placeholder:text-[#9CA3AF] focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10";

    return (
        <div className="w-full max-w-md">
            <div className="mb-8 text-center">
                <Link
                    href="/"
                    className="inline-block text-3xl font-extrabold tracking-tight text-[#242321] dark:text-[#F9FAFB]"
                >
                    Kreo<span className="text-[#F06A3C]">vix</span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                    Create your account
                </h1>

                <p className="mt-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                    Join Kreovix and discover creative spaces.
                </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]"
                    >
                        Full Name
                    </label>

                    <div className="relative">
                        <UserRound
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A] dark:text-[#9CA3AF]"
                            size={18}
                        />

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className={inputClass}
                            required
                            autoComplete="name"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]"
                    >
                        Email Address
                    </label>

                    <div className="relative">
                        <Mail
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A] dark:text-[#9CA3AF]"
                            size={18}
                        />

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={inputClass}
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="photoURL"
                        className="mb-2 block text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]"
                    >
                        Photo URL{" "}
                        <span className="font-normal text-[#A7A19A] dark:text-[#9CA3AF]">
                            (Optional)
                        </span>
                    </label>

                    <div className="relative">
                        <Image
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A] dark:text-[#9CA3AF]"
                            size={18}
                        />

                        <input
                            id="photoURL"
                            type="url"
                            name="image"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="https://i.ibb.co.com/example.jpg"
                            className={inputClass}
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <Lock
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A] dark:text-[#9CA3AF]"
                            size={18}
                        />

                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);

                                if (error) setError("");
                            }}
                            placeholder="Create a strong password"
                            className={`${inputClass} pr-12`}
                            required
                            autoComplete="new-password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A] dark:text-[#9CA3AF] hover:text-[#242321] dark:hover:text-white"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    {/* Real-time Password Requirements */}
                    <div className="mt-2 space-y-1.5">
                        <p className="text-xs text-[#77736F] dark:text-[#CBD5E1]">
                            Password must contain:
                        </p>

                        <p
                            className={`flex items-center gap-2 text-xs ${passwordChecks.minLength
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-[#99938C] dark:text-[#9CA3AF]"
                                }`}
                        >
                            <span>
                                {passwordChecks.minLength ? "✓" : "○"}
                            </span>
                            At least 6 characters
                        </p>

                        <p
                            className={`flex items-center gap-2 text-xs ${passwordChecks.uppercase
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-[#99938C] dark:text-[#9CA3AF]"
                                }`}
                        >
                            <span>
                                {passwordChecks.uppercase ? "✓" : "○"}
                            </span>
                            At least one uppercase letter (A-Z)
                        </p>

                        <p
                            className={`flex items-center gap-2 text-xs ${passwordChecks.lowercase
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-[#99938C] dark:text-[#9CA3AF]"
                                }`}
                        >
                            <span>
                                {passwordChecks.lowercase ? "✓" : "○"}
                            </span>
                            At least one lowercase letter (a-z)
                        </p>
                    </div>
                </div>

                {error && (
                    <p
                        role="alert"
                        className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2.5 text-sm text-red-600 dark:text-red-400"
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-[#F06A3C] py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#EAE5DF] dark:border-[#374151]" />
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-[#FAF8F5] dark:bg-[#111827] px-3 text-xs text-[#A7A19A] dark:text-[#9CA3AF]">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>

            <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] py-3 text-sm font-semibold text-[#242321] dark:text-[#F9FAFB] transition hover:bg-[#F5F1EB] dark:hover:bg-[#374151] disabled:opacity-60"
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                    aria-hidden="true"
                >
                    <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.24 5.48-4.75 7.18l7.73 6C44.43 38.03 46.98 31.85 46.98 24.55z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                </svg>

                Continue with Google
            </button>

            <p className="mt-7 text-center text-sm text-[#77736F] dark:text-[#CBD5E1]">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-[#F06A3C] hover:text-[#D9562D]"
                >
                    LogIn
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
