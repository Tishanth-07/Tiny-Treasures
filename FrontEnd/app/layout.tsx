// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "@/context/WishlistContext";
import ClientWrapper from "@/components/ClientWrapper";

// Website metadata
export const metadata: Metadata = {
  title: "Tiny Treasures - Handcrafted Miniature Models",
  description: "Discover our unique collection of handcrafted miniature models. Perfect for collectors and hobbyists.",
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'Tiny Treasures - Handcrafted Miniature Models',
    description: 'Discover our unique collection of handcrafted miniature models. Perfect for collectors and hobbyists.',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Tiny Treasures Logo',
      },
    ],
    siteName: 'Tiny Treasures',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiny Treasures - Handcrafted Miniature Models',
    description: 'Discover our unique collection of handcrafted miniature models',
    images: ['/logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {/* Google Maps Script */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />

        {/* Global Toast Notifications */}
        <Toaster position="top-center" />

        {/* App Wrapper */}
        <div className="debug">
          <ClientWrapper>
            <WishlistProvider>{children}</WishlistProvider>
          </ClientWrapper>
        </div>
      </body>
    </html>
  );
}