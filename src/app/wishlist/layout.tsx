
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "My Wishlist | Kreovix",
  },

  description:
    "Explore your saved creative studios on Kreovix. Manage favorite studios and find the perfect workspace for your next project.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "My Wishlist | Kreovix",
    description:
      "Discover and manage your favorite creative studios on Kreovix.",
    url: "/wishlist",
    type: "website",
    siteName: "Kreovix",
  },

  twitter: {
    card: "summary",
    title: "My Wishlist | Kreovix",
    description:
      "View your saved creative studio spaces on Kreovix.",
  },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
