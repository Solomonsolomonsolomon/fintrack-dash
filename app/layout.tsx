import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast-provider";
import { SearchProvider } from "@/context/searchContext";
import { AppProvider } from "@/context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinTrack - Financial Management",
  description: "Track your finances with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <SearchProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </SearchProvider>
        </AppProvider>
      </body>
    </html>
  );
}
