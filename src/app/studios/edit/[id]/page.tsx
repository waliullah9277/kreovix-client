"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Studio } from "@/types/studio";
import { authClient } from "@/lib/auth-client";

import EditMyListings from "@/components/studios/EditMyListings";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface EditStudioPageProps {
    params: Promise<{ id: string }>;
}

export default function EditStudioPage({
    params,
}: EditStudioPageProps) {
    const { id } = use(params);
    const router = useRouter();

    // Authentication
    const { data: session, isPending } = authClient.useSession();

    const [studio, setStudio] = useState<Studio | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch Existing Studio
    useEffect(() => {
        if (isPending) return;

        if (!session?.user) {
            router.replace("/login");
            return;
        }

        const controller = new AbortController();

        const fetchStudio = async () => {
            setLoading(true);

            try {
                const token = await getTokenFromClient()
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/studios/${id}`,
                    {
                        cache: "no-store",
                        signal: controller.signal,
                        headers:{
                            authorization: `Bearer ${token}`,
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch studio data");
                }

                const data = await response.json();

                if (!controller.signal.aborted) {
                    setStudio(data);
                }
            } catch (error) {
                if (controller.signal.aborted) return;

                console.error("Fetch error:", error);
                toast.error("Failed to load studio data.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchStudio();

        return () => controller.abort();
    }, [id, isPending, session?.user, router]);

    // Private Route
    if (!isPending && !session?.user) {
        return null;
    }

    // Loading
    if (isPending || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#F06A3C]" />
            </div>
        );
    }

    // Studio Not Found
    if (!studio) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <h2 className="text-xl font-semibold">
                    Studio Not Found
                </h2>

                <button
                    onClick={() => router.push("/my-listings")}
                    className="rounded-lg bg-[#F06A3C] px-5 py-2 text-white"
                >
                    Back to My Listings
                </button>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#FAF8F5] dark:bg-[#111827] px-4 py-12">
            <div className="mx-auto max-w-5xl">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                        Update Studio
                    </h1>

                    <p className="mt-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                        Update your studio information. Your existing details
                        are already filled in.
                    </p>
                </div>

                {/* Existing Edit Form */}
                <EditMyListings
                    key={studio._id}
                    listings={studio}
                />

            </div>
        </section>
    );
}