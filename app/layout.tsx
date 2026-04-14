import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Appbar } from "./components/Appbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "100x Exchange | Professional Crypto Trading",
  description: "Lightning-fast crypto trading with advanced charts, deep liquidity, and enterprise-grade security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Appbar/>
        {children}
      </body>
    </html>
  );
}
