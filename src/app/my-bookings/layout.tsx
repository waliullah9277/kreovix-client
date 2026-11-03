
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "My Bookings | Kreovix",
  },

  description:
    "View and manage your studio bookings on Kreovix. Track reservation status, review booking details, and manage your creative space reservations.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "My Bookings | Kreovix",
    description:
      "Manage your creative studio reservations on Kreovix.",
    url: "/my-bookings",
    type: "website",
    siteName: "Kreovix",
  },

  twitter: {
    card: "summary",
    title: "My Bookings | Kreovix",
    description:
      "View and manage your studio bookings on Kreovix.",
  },
};

export default function MyBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
