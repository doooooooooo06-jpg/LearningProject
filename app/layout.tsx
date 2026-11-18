import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Ai",
  description: "A Next.js app built with the App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
