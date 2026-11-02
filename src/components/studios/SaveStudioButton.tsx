
"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "sonner";

interface SaveStudioButtonProps {
  studioId: string;
}

const SaveStudioButton = ({ studioId }: SaveStudioButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check whether studio is already saved
  useEffect(() => {
    let cancelled = false;

    const checkSavedStudio = async () => {
      if (isPending) return;

      if (!session?.user) {
        setIsSaved(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const token = await getTokenFromClient();

        if (!token) {
          throw new Error("Authentication token missing!");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/wishlist/check/${studioId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to check wishlist!");
        }

        const data = await response.json();

        if (!cancelled) {
          setIsSaved(data.saved);
        }
      } catch (error) {
        console.error("Wishlist Check Error:", error);

        if (!cancelled) {
          toast.error("Unable to load saved studio status.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void checkSavedStudio();

    return () => {
      cancelled = true;
    };
  }, [studioId, session?.user?.id, isPending]);

  // Save or remove studio
  const handleSaveStudio = async () => {
    if (isLoading) return;

    // Redirect unauthenticated users
    if (!session?.user) {
      toast.error("Please login to save a studio!");

      router.push(
        `/login?callbackUrl=${encodeURIComponent(pathname)}`
      );

      return;
    }

    setIsLoading(true);

    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Authentication token missing!");
      }

      const method = isSaved ? "DELETE" : "POST";

      const url = isSaved
        ? `${process.env.NEXT_PUBLIC_URL}/wishlist/${studioId}`
        : `${process.env.NEXT_PUBLIC_URL}/wishlist`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        ...(!isSaved && {
          body: JSON.stringify({ studioId }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update wishlist!"
        );
      }

      setIsSaved(data.saved);

      toast.success(
        data.saved
          ? "Studio saved successfully!"
          : "Studio removed from wishlist!"
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSaveStudio}
      disabled={isLoading}
      aria-pressed={isSaved}
      className={`flex items-center gap-2 self-start rounded-full border px-4 py-2.5 text-sm font-medium transition sm:self-auto disabled:cursor-wait disabled:opacity-70 ${
        isSaved
          ? "border-[#F06A3C] bg-[#F06A3C]/10 text-[#F06A3C]"
          : "border-[#EAE5DF] dark:border-[#374151] text-[#242321] dark:text-[#F9FAFB] hover:border-[#F06A3C] hover:text-[#F06A3C]"
      }`}
    >
      <Heart
        size={17}
        className={isSaved ? "fill-current" : ""}
      />

      {isSaved ? "Saved" : "Save Studio"}
    </button>
  );
};

export default SaveStudioButton;
