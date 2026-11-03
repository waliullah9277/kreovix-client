
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Login | Kreovix",
  },

  description:
    "Sign in to your Kreovix account to explore creative studios, book inspiring spaces, and manage your studio reservations.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Login | Kreovix",
    description:
      "Welcome back to Kreovix. Sign in to access your creative workspace.",
    url: "/login",
    type: "website",
    siteName: "Kreovix",
  },

  twitter: {
    card: "summary",
    title: "Login | Kreovix",
    description:
      "Sign in to your Kreovix account.",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
