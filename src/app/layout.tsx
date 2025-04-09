"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import NavMen from "@/components/nav";
import "./globals.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const staticpages = pathname === "/auth" || pathname === "/signup";

  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          {staticpages ? (
            <div className="flex flex-col h-[100dvh] overflow-hidden gap-5 p-5 justify-center">
              {children}
            </div>
          ): (
            <div className="flex flex-col justify-center gap-5 p-5 scroll-pb-24 pb-24">
              {children}
              <NavMen />
            </div>
          )}
        </QueryClientProvider>
      </body>
    </html>
  );
}
