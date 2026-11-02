import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF8F5]">
            <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-[#F06A3C]/10" />

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F06A3C]/10">
                    <LoaderCircle
                        size={32}
                        className="animate-spin text-[#F06A3C]"
                    />
                </div>
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#242321]">
                Kreovix
            </h2>

            <p className="mt-2 text-sm text-[#77736F]">
                Preparing your creative space...
            </p>
        </div>
    );
}