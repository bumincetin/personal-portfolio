import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bumin Kağan Çetin | Data Scientist & AI Specialist",
  description: "Data Scientist and AI Specialist at Bocconi University, specializing in NLP and deep learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-mono text-text-primary overflow-x-hidden min-h-screen selection:bg-accent-cyan selection:text-void bg-void antialiased">
        {children}
      </body>
    </html>
  );
}
