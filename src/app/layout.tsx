import type { Metadata } from "next";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import {Poppins} from "next/font/google";
import { Toaster } from "react-hot-toast";

// Add a metadata object to the file
export const metadata: Metadata = {
  title: "Exam App",
  description: "Generated with Elevate for practice",
};

// google font var
const poppins = Poppins({
  weight: ['100' , '200' , '300' ,'400' , '500' , '600' , '700' , '800' , '900'], 
  subsets: ['latin'], 
  style : ['normal' , 'italic']
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${poppins.className} dark:bg-gray-800 text-gray-900  transition-colors duration-500  antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
