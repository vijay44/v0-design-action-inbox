import React from "react"
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Action Inbox - Actionable Comments",
  description:
    "Your personal accountability layer for Jira and Confluence comments",
};

export const viewport: Viewport = {
  themeColor: "#0C66E4",
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
