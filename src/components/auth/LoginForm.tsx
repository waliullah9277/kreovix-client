"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Redirect to requested page after login
    const requestedPath = searchParams.get("callbackUrl");

    const callbackUrl =
        requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
            ? requestedPath
            : "/";

    // Email & Password Login
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Login failed!");
                return;
            }

            if (data) {
                toast.success("Login successful!");

                router.push(callbackUrl);
                router.refresh();
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Google Login
    const handleGoogleLogin = async () => {
        setIsLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: callbackUrl,
            });

            if (error) {
                toast.error(error.message || "Google login failed!");
            }
        } catch {
            toast.error("Something went wrong with Google login.");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-[#EAE5DF] bg-white py-3 pl-11 pr-4 text-sm text-[#242321] outline-none transition placeholder:text-[#A7A19A] focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10";

    return (
        <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8 text-center">
                <Link
                    href="/"
                    className="inline-block text-3xl font-extrabold tracking-tight text-[#242321]"
                >
                    Kreo<span className="text-[#F06A3C]">vix</span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold text-[#242321]">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-[#77736F]">
                    Sign in to continue exploring creative spaces.
                </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-[#242321]"
                    >
                        Email Address
                    </label>

                    <div className="relative">
                        <Mail
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A]"
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

                {/* Password */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-[#242321]"
                        >
                            Password
                        </label>

                        <button
                            type="button"
                            disabled
                            title="Forgot password is not available"
                            className="cursor-not-allowed text-xs font-medium text-[#A7A19A]"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <div className="relative">
                        <Lock
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A]"
                            size={18}
                        />

                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className={`${inputClass} pr-12`}
                            required
                            autoComplete="current-password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A] hover:text-[#242321]"
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-[#F06A3C] py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#EAE5DF]" />
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-[#FAF8F5] px-3 text-xs text-[#A7A19A]">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>

            {/* Google Login */}
            <button
                onClick={handleGoogleLogin}
                type="button"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#EAE5DF] bg-white py-3 text-sm font-semibold text-[#242321] transition hover:bg-[#F5F1EB] disabled:cursor-not-allowed disabled:opacity-60"
            >
                <svg
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                    aria-hidden="true"
                >
                    <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                        transform="translate(0 5)"
                    />
                    <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.71 7.18l7.27 5.64c4.24-3.91 7.48-9.65 7.48-17.29Z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.78-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z"
                        transform="translate(0 5)"
                    />
                    <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.14 15.91-5.81l-7.27-5.64c-2.02 1.35-4.6 2.15-8.64 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                        transform="translate(0 -5)"
                    />
                </svg>

                Continue with Google
            </button>

            {/* Register Link */}
            <p className="mt-7 text-center text-sm text-[#77736F]">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-[#F06A3C] hover:text-[#D9562D]"
                >
                    Create Account
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;