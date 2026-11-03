
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Explore Studios | Kreovix",
  },

  description:
    "Explore and book creative studios on Kreovix. Discover photography studios, podcast rooms, sound stages, music suites, and art workshops for your next creative project.",

  keywords: [
    "Kreovix Studios",
    "Explore Studios",
    "Creative Studio Booking",
    "Photography Studios",
    "Podcast Rooms",
    "Sound Stages",
    "Music Suites",
    "Art Workshops",
    "Studio Rental",
  ],

  alternates: {
    canonical: "/studios",
  },

  openGraph: {
    title: "Explore Studios | Kreovix",
    description:
      "Discover inspiring creative studios, explore different categories, and book the perfect space for your next project.",
    url: "/studios",
    type: "website",
    siteName: "Kreovix",
  },

  twitter: {
    card: "summary",
    title: "Explore Studios | Kreovix",
    description:
      "Find and book photography, podcast, music, and creative studios on Kreovix.",
  },
};

export default function StudiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
