import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { MainLayout } from "../components/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TransitOps Smart",
  description: "Fleet management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-base tracking-wide bg-[#0F111A] text-gray-200">
        <AuthProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
