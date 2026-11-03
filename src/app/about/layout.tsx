
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "About Us | Kreovix",
  },

  description:
    "Learn about Kreovix, our creative vision, and our mission to connect photographers, filmmakers, podcasters, and creators with inspiring studio spaces.",

  keywords: [
    "About Kreovix",
    "Creative Vision",
    "Creative Studio Marketplace",
    "Studio Booking Platform",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Us | Kreovix",
    description:
      "Discover the story, mission, and creative vision behind Kreovix.",
    url: "/about",
    type: "website",
    siteName: "Kreovix",
  },

  twitter: {
    card: "summary",
    title: "About Us | Kreovix",
    description:
      "Learn about Kreovix and our mission to empower creative professionals.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
