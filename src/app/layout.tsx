import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bumin Kagan Cetin | Data Scientist",
  description: "Personal portfolio website of Bumin Kagan Cetin, showcasing data science projects and expertise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-gray-900`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
