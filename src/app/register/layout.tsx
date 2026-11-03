
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Create Account | Kreovix",
  },

  description:
    "Join Kreovix and bring your creative vision to life. Create an account to discover, book, and manage creative studio spaces.",

  keywords: [
    "Kreovix Registration",
    "Create Kreovix Account",
    "Creative Studio Booking",
    "Join Kreovix",
    "Studio Marketplace",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Create Account | Kreovix",
    description:
      "Join Kreovix to discover inspiring studios, connect with creators, and book your perfect creative space.",
    url: "/register",
    type: "website",
    siteName: "Kreovix",
  },

  twitter: {
    card: "summary",
    title: "Create Account | Kreovix",
    description:
      "Join Kreovix and start your creative journey today.",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
