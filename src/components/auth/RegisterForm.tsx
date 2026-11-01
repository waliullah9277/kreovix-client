
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

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries()) as { name: string, email: string, image: string, password: string }

        console.log(user)

        const { data, error } = await authClient.signUp.email({
            ...user,
        })


        if (data) {
            toast.success('User Create Successfully!');
            redirect("/")
        }
        if (error) {
            toast.error(error instanceof Error
                ? error.message
                : "Something went wrong!")
        }
    };

        const inputClass =
            "w-full rounded-xl border border-[#EAE5DF] bg-white py-3 pl-11 pr-4 text-sm text-[#242321] outline-none transition placeholder:text-[#A7A19A] focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10";

        return (
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight text-[#242321]">
                        Kreo<span className="text-[#F06A3C]">vix</span>
                    </Link>

                    <h1 className="mt-6 text-2xl font-bold text-[#242321]">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-[#77736F]">
                        Join Kreovix and discover creative spaces.
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#242321]">
                            Full Name
                        </label>
                        <div className="relative">
                            <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A]" size={18} />
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
                        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#242321]">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A]" size={18} />
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
                        <label htmlFor="photoURL" className="mb-2 block text-sm font-semibold text-[#242321]">
                            Photo URL <span className="font-normal text-[#A7A19A]">(Optional)</span>
                        </label>
                        <div className="relative">
                            <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A]" size={18} />
                            <input
                                id="photoURL"
                                type="url"
                                name="image"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                placeholder="https://example.com/photo.jpg"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#242321]">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A]" size={18} />
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
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A7A19A] hover:text-[#242321]"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <p className="mt-2 text-xs text-[#77736F]">
                            Minimum 6 characters, including uppercase and lowercase letters.
                        </p>
                    </div>

                    {error && (
                        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
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
                        <div className="w-full border-t border-[#EAE5DF]" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-[#FAF8F5] px-3 text-xs text-[#A7A19A]">
                            OR CONTINUE WITH
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    // onClick={handleGoogleRegister}
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#EAE5DF] bg-white py-3 text-sm font-semibold text-[#242321] transition hover:bg-[#F5F1EB] disabled:opacity-60"
                >
                    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 5)" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.71 7.18l7.27 5.64c4.24-3.91 7.48-9.65 7.48-17.29Z" />
                        <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.78-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z" transform="translate(0 5)" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.14 15.91-5.81l-7.27-5.64c-2.02 1.35-4.6 2.15-8.64 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -5)" />
                    </svg>
                    Continue with Google
                </button>

                <p className="mt-7 text-center text-sm text-[#77736F]">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-[#F06A3C] hover:text-[#D9562D]">
                        Sign In
                    </Link>
                </p>

                <p className="mt-6 text-center text-xs text-[#A7A19A]">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-[#77736F] underline">
                        Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#77736F] underline">
                        Privacy Policy
                    </Link>.
                </p>
            </div>
        );
    };

export default RegisterForm;
