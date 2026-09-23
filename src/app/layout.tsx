import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multi-Step Form",
  description:
    "A user-friendly multi-step form for streamlined data collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
