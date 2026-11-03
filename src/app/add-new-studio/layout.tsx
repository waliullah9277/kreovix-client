
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Add New Studio | Kreovix",
  },

  description:
    "List your creative studio on Kreovix. Add studio details, amenities, pricing, and images to connect with photographers, filmmakers, and creators.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Add New Studio | Kreovix",
    description:
      "Share your creative space with the Kreovix community.",
    url: "/add-new-studio",
    type: "website",
    siteName: "Kreovix",
  },
};

export default function AddNewStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
