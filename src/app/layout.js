import { Geist, Geist_Mono, Noto_Sans_Khmer, Baloo_2 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-khmer",
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
});

// A rounded, friendly display face for headings and buttons — reads as
// playful/kid-oriented without competing with the Khmer script for
// attention.
const baloo = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  title: "Chesh — ចេះភាសាខ្មែរ",
  description: "Chesh helps you learn Khmer — alphabet, vocabulary, numbers, and more.",
  manifest: `${basePath}/assets/site.webmanifest`,
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Chesh",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKhmer.variable} ${baloo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
