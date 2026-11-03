import type { Metadata } from "next";
import StudioDetails from "@/components/studios/StudioDetails";
import { notFound } from "next/navigation";

interface StudioDetailsPageProps {
  params: Promise<{ id: string }>;
}



export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const fallback: Metadata = {
    title: {
      absolute: "Studio Details | Kreovix",
    },
    description:
      "Explore creative studios and book your ideal space on Kreovix.",
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/studios/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        ...fallback,
        robots: {
          index: false,
        },
      };
    }

    const studio = await response.json();

    const studioName =
      studio.title || studio.name || "Studio Details";

    const description =
      studio.description?.slice(0, 160) ||
      `Discover ${studioName} on Kreovix. Explore studio facilities, pricing, and book your perfect creative space.`;

    return {
      title: {
        absolute: `${studioName} | Kreovix`,
      },

      description,

      alternates: {
        canonical: `/studios/${id}`,
      },

      openGraph: {
        title: `${studioName} | Kreovix`,
        description,
        url: `/studios/${id}`,
        type: "website",
        siteName: "Kreovix",
      },

      twitter: {
        card: "summary",
        title: `${studioName} | Kreovix`,
        description,
      },
    };
  } catch (error) {
    console.error("Studio metadata error:", error);
    return fallback;
  }
}


const StudioDetailsPage = async ({
  params,
}: StudioDetailsPageProps) => {
  const { id } = await params;

  // Validate Studio ID
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    notFound();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/studios/${id}`,
    {
      cache: "no-store",
    }
  );

  // Studio Not Found
  if (res.status === 404) {
    notFound();
  }

  // Other API Errors
  if (!res.ok) {
    console.error(
      "Studio API Error:",
      res.status,
      await res.text()
    );

    throw new Error("Failed to load studio details.");
  }

  const data = await res.json();

  if (!data) {
    notFound();
  }

  return <StudioDetails studio={data} />;
};

export default StudioDetailsPage;
