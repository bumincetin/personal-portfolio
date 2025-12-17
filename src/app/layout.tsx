import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Data & Finance | Computational Etherealism",
  description: "Leveraging advanced analytics for absolute financial clarity. Decoding value in a noisy world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-void text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
