import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//providers
import AppProvider from "@/providers";

//libs
import { cn } from "@/lib/tailwind-merge/utils";

//components
import Layout from "./_components/layout";

const inter = Inter({ subsets: ["latin"] });

//todo
export const metadata: Metadata = {
  title: "Lucky Draw",
  description: "Lucky Draw",
  generator: "Next.js",
  keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
  authors: [
    { name: "Raphael Brandão Mesquita" },
    {
      name: "Raphael Brandão Mesquita",
      url: "https://www.linkedin.com/in/raphael-mesquita-/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
    { rel: "icon", url: "/icon-192x192.png" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn(inter.className, 'bg-background')}>
        <AppProvider>
          <Layout>
            {children}
          </Layout>
        </AppProvider>
      </body>
    </html>
  );
}
