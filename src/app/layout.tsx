import type { Metadata } from "next";
import "./globals.css";
import Navbar from './components/Navbar';
import BackgroundMesh from './components/BackgroundMesh';
import Footer from './sections/Footer';

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
      <body className="font-mono text-text-primary overflow-x-hidden min-h-screen selection:bg-accent-cyan selection:text-void bg-void antialiased">
        <BackgroundMesh />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
