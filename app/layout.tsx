import type { Metadata } from "next";
import {  Public_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/appContext";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fintrack",
  description: "Fintrack interview submission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
