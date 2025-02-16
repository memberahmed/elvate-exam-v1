import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Poppins, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/providers";

// Add a metadata object to the file
export const metadata: Metadata = {
  title: "Exam App",
  description: "Generated with Elevate for practice",
};

// Configure Poppins
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-poppins", // Creates a CSS variable named --font-poppins
});

// Configure Inter
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter", // Creates a CSS variable named --font-inter
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`
          ${poppins.className} 
          ${inter.className} 
          dark:bg-gray-800 
          text-gray-900  
          transition-colors 
          duration-500  
          antialiased
        `}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
