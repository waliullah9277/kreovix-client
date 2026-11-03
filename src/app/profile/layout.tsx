
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "My Profile | Kreovix",
  },

  description:
    "Manage your Kreovix profile, view your account information, and personalize your creative studio booking experience.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "My Profile | Kreovix",
    description:
      "Manage your account and profile information on Kreovix.",
    url: "/profile",
    type: "website",
    siteName: "Kreovix",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
