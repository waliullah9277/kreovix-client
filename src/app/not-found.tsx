import Link from "next/link";
import { ArrowLeft, Camera, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-[85vh] items-center justify-center bg-[#FAF8F5] dark:bg-[#111827] px-4 py-16">
            <div className="mx-auto max-w-xl text-center">

                {/* Illustration */}
                <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-[#FFF0E9] dark:bg-[#3B2B26]">
                    <div className="absolute -right-3 top-3 h-8 w-8 rounded-full bg-[#F06A3C]/20" />
                    <div className="absolute -left-4 bottom-5 h-5 w-5 rounded-full bg-[#F06A3C]/30" />

                    <Camera
                        size={76}
                        strokeWidth={1.3}
                        className="text-[#F06A3C]"
                    />
                </div>

                {/* Error Code */}
                <h1 className="text-8xl font-black tracking-tight text-[#F06A3C] sm:text-9xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold text-[#242321] dark:text-[#F9FAFB] sm:text-3xl">
                    Oops! This Space Is Missing
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#77736F] dark:text-[#CBD5E1] sm:text-base">
                    Looks like this creative space doesn't exist or has
                    been moved. Let's get you back to exploring amazing studios.
                </p>

                {/* Home Button */}
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F06A3C] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
                >
                    <Home size={17} />
                    Return to Home
                    <ArrowLeft size={16} />
                </Link>

            </div>
        </main>
    );
}