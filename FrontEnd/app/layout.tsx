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

// Optional SEO metadata
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your App Description",
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

        {/* Tawk.to Live Chat Script */}
        <Script
          id="tawk-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function () {
                var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/687e53f104ad1b191957cac9/1j0mnfqmu';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />

        <AppContextProvider>
          {/* <WishlistProvider> */}
            {/* <Header /> */}
            <main className="min-h-screen">{children}</main>
            {/* <Footer /> */}
          {/* </WishlistProvider> */}
        </AppContextProvider>
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




