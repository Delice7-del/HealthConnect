import type { Metadata } from "next";
import { Abel, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const abel = Abel({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-abel",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "HealthConnect - Connect with Healthcare Providers",
  description: "A comprehensive health education and appointment platform.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abel.variable} ${outfit.variable} antialiased`}>
        <AuthProvider>
          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: '#042f2e',
                color: '#fff',
                borderRadius: '16px',
              }
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
