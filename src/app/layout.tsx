
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kreovix-client.vercel.app"),

  title: "Kreovix — Where Creative Visions Find Their Space",

  description:
    "Kreovix is a creative studio marketplace where photographers, filmmakers, podcasters, and creators can discover, book, and manage creative spaces.",

  applicationName: "Kreovix",

  keywords: [
    "Kreovix",
    "Creative Vision",
    "Creative Studio Booking",
    "Photography Studios",
    "Podcast Studios",
    "Studio Rental",
    "Film Production",
    "Creative Spaces",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kreovix",
    title: "Kreovix — Where Creative Visions Find Their Space",
    description:
      "Discover inspiring creative studios, book the perfect space, and bring your creative vision to life.",
    url: "/",
  },

  twitter: {
    card: "summary",
    title: "Kreovix — Creative Vision",
    description:
      "Discover. Book. Create. Find the perfect space for your next creative project.",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="kreovix-theme"
        >
          <Navbar />

          {children}

          <Toaster
            position="top-right"
            offset="80px"
            toastOptions={{
              classNames: {
                success: "!bg-green-600 !text-white !border-green-600",
                error: "!bg-red-600 !text-white !border-red-600",
              },
            }}
          />

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
