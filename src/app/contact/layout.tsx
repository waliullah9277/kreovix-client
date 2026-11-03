
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Us | Kreovix",
  },

  description:
    "Get in touch with Kreovix. Have questions about studio bookings, listing your creative space, or our services? Contact our team for assistance.",

  keywords: [
    "Contact Kreovix",
    "Kreovix Support",
    "Studio Booking Support",
    "Creative Studio Marketplace",
    "Studio Rental Help",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Us | Kreovix",
    description:
      "Have questions or need assistance? Connect with the Kreovix team and bring your creative vision to life.",
    url: "/contact",
    type: "website",
    siteName: "Kreovix",
  },

  twitter: {
    card: "summary",
    title: "Contact Us | Kreovix",
    description:
      "Get in touch with Kreovix for studio bookings, creative spaces, and support.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
