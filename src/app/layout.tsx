import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "saintlee83 | Delivering Value to the World",
  description:
    "Full-stack developer crafting beautiful digital experiences. Explore my portfolio of innovative projects and creative solutions.",
  keywords: ["developer", "portfolio", "full-stack", "web development", "design"],
  authors: [{ name: "saintlee83" }],
  openGraph: {
    title: "saintlee83 | Delivering Value to the World",
    description: "Full-stack developer crafting beautiful digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* Gmarket Sans 폰트 CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'GmarketSans';
                font-weight: 300;
                src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');
              }
              @font-face {
                font-family: 'GmarketSans';
                font-weight: 500;
                src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
              }
              @font-face {
                font-family: 'GmarketSans';
                font-weight: 700;
                src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
              }
            `,
          }}
        />
      </head>
      <body className={`${playfair.variable} font-gmarket antialiased`}>{children}</body>
    </html>
  );
}
