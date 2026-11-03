
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Edit Studio | Kreovix",
  },

  description:
    "Update your studio details, images, amenities, and rental pricing on Kreovix. Manage your creative workspace with ease.",

  robots: {
    index: false,
    follow: false,
  },

  // Prevent inheriting the /studios canonical URL.
  alternates: null,

  openGraph: {
    title: "Edit Studio | Kreovix",
    description:
      "Manage and update your creative studio listing on Kreovix.",
    type: "website",
    siteName: "Kreovix",
  },
};

export default function EditStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
