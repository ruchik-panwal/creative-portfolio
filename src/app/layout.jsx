import { DM_Sans } from "next/font/google";
import "./globals.css";

// 1. Fix the typo (const) and give the variable a different name than the import
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans", // This is the variable we will pass to Tailwind
  display: "swap",
});

export const metadata = {
  title: "Creative Portfolio",
  description: "My personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Remove the old "geist" variables and add your new dmSans variable */}
      <body className={`${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}