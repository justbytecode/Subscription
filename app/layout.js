import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "@/components/ui/toast";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RecurX",
  description: "A Decentralized Subscription Payment Gateway",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ToastProvider>
        <ToastContainer/>
        <Provider>
        <ToastContainer />
        {!session && <Navbar />}
        {children}
        <Analytics/>
        <SpeedInsights/>
        {!session && <Footer />}
       </Provider>
       </ToastProvider>
      </body>
    </html>
  );
}

// 0x8622095A788FC1168f77bBf71392B597A3893Be8
