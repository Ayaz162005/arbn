import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SessionProvider from "../context/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/nextauthoption";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.className} px-10 relative bg-zinc-100`}>
        <SessionProvider session={session}>
          <Toaster position="top-center" />
          <Navbar />
          {children}
        </SessionProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
