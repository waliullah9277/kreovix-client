
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "My Studio Listings | Kreovix",
  },

  description:
    "Manage your creative studio listings on Kreovix. View, edit, update, and remove your studio spaces from one convenient place.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "My Studio Listings | Kreovix",
    description:
      "Manage your studio listings and creative spaces on Kreovix.",
    url: "/my-listings",
    type: "website",
    siteName: "Kreovix",
  },
};

export default function MyListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
