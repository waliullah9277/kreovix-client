
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  ArrowUpRight,
  Trash2,
  Loader2,
  Search,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  imageUrl?: string;
  images?: string[];
}

export default function WishlistPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  const userId = session?.user?.id;

  // Fetch Saved Studios
  useEffect(() => {
    if (isPending) return;

    if (!userId) {
      router.replace("/login?callbackUrl=%2Fwishlist");
      return;
    }

    let cancelled = false;

    const loadWishlist = async () => {
      setLoading(true);
      setError("");

      try {
        const token = await getTokenFromClient();

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load saved studios.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid wishlist response.");
        }

        if (!cancelled) {
          setStudios(data as Studio[]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadWishlist();

    return () => {
      cancelled = true;
    };
  }, [isPending, userId, retry, router]);

  // Remove Studio from Wishlist
  const removeFromWishlist = async (studioId: string) => {
    if (removingId) return;

    setRemovingId(studioId);

    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Please log in again.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/wishlist/${studioId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove studio.");
      }

      setStudios((current) =>
        current.filter((studio) => studio._id !== studioId)
      );

      toast.success("Studio removed from wishlist!");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] py-12 transition-colors dark:bg-[#111827] lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[#F06A3C]">
              <Heart size={19} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">
                Your Saved Spaces
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#242321] dark:text-[#F9FAFB] sm:text-4xl lg:text-5xl">
              My <span className="text-[#F06A3C]">Wishlist.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#77736F] dark:text-[#CBD5E1] sm:text-base">
              All your favorite creative studios, saved in one place.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
            <Heart size={17} className="text-[#F06A3C]" />
            <span>
              <strong className="text-[#242321] dark:text-[#F9FAFB]">
                {studios.length}
              </strong>{" "}
              saved {studios.length === 1 ? "studio" : "studios"}
            </span>
          </div>
        </div>

        {/* Loading */}
        {isPending || loading ? (
          <div className="flex min-h-[45vh] items-center justify-center gap-3 text-[#77736F] dark:text-[#CBD5E1]">
            <Loader2 className="h-6 w-6 animate-spin text-[#F06A3C]" />
            Loading your wishlist...
          </div>
        ) : error ? (

          /* Error State */
          <div className="rounded-2xl border border-[#EAE5DF] bg-white px-6 py-16 text-center dark:border-[#374151] dark:bg-[#1F2937]">
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRetry((n) => n + 1)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F06A3C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#D9562D]"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : studios.length === 0 ? (

          /* Empty Wishlist */
          <div className="rounded-2xl border border-[#EAE5DF] bg-white px-5 py-20 text-center dark:border-[#374151] dark:bg-[#1F2937]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0E9] text-[#F06A3C] dark:bg-[#3B2B26]">
              <Heart size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
              No Saved Studios Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#77736F] dark:text-[#CBD5E1]">
              Explore studios and click &quot;Save Studio&quot; to add
              your favorite spaces here.
            </p>

            <Link
              href="/studios"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F06A3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
            >
              <Search size={16} />
              Explore Studios
            </Link>
          </div>
        ) : (

          /* Saved Studio Cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => {
              const image =
                studio.imageUrl || studio.images?.[0];

              return (
                <article
                  key={studio._id}
                  className="group overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#F06A3C]/40 hover:shadow-xl dark:border-[#374151] dark:bg-[#1F2937]"
                >
                  {/* Studio Image */}
                  <div className="relative h-56 overflow-hidden bg-[#F0ECE7] dark:bg-[#374151]">
                    {image ? (
                      <Image
                        src={image}
                        alt={studio.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#77736F] dark:text-[#CBD5E1]">
                        No image available
                      </div>
                    )}

                    {/* Category */}
                    <span className="absolute left-4 top-4 rounded-lg border border-white/40 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#34312E] shadow-sm">
                      {studio.category}
                    </span>

                    {/* Remove Heart */}
                    <button
                      type="button"
                      onClick={() =>
                        void removeFromWishlist(studio._id)
                      }
                      disabled={removingId === studio._id}
                      aria-label={`Remove ${studio.title} from wishlist`}
                      className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#F06A3C] shadow-md transition hover:bg-[#FFF0E9] disabled:opacity-60 dark:bg-[#1F2937] dark:hover:bg-[#374151]"
                    >
                      {removingId === studio._id ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <Heart
                          size={19}
                          className="fill-current"
                        />
                      )}
                    </button>

                    {/* Hourly Price */}
                    <div className="absolute bottom-4 right-4 rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#242321] shadow-sm">
                      ${studio.hourlyRate}
                      <span className="text-xs font-normal text-[#77736F]">
                        {" "}/ hr
                      </span>
                    </div>
                  </div>

                  {/* Studio Details */}
                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold text-[#242321] transition group-hover:text-[#F06A3C] dark:text-[#F9FAFB]">
                      {studio.title}
                    </h3>

                    <p className="mt-2 text-xs font-medium text-[#F06A3C]">
                      {studio.category}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                      <MapPin
                        size={16}
                        className="shrink-0 text-[#F06A3C]"
                      />
                      <span className="line-clamp-1">
                        {studio.location}
                      </span>
                    </div>

                    <div className="my-5 border-t border-[#F0ECE7] dark:border-[#374151]" />

                    {/* Card Actions */}
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        disabled={removingId === studio._id}
                        onClick={() =>
                          void removeFromWishlist(studio._id)
                        }
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#77736F] transition hover:text-red-600 disabled:opacity-50 dark:text-[#CBD5E1] dark:hover:text-red-400"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>

                      <Link
                        href={`/studios/${studio._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#F06A3C] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#D9562D]"
                      >
                        View Details
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
