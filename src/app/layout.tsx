import type { Metadata } from "next";
import Avatar from '../../public/assets/Avatar.png'

import './index.scss'
import Navigation from "@/app/_components/Navigation";

export const metadata: Metadata = {
  title: `Sten ter Stal | Personal Website`,
  description: `Online resume and collection of projects`,
  openGraph: {
    // images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <meta name="theme-color" content="#000"/>
          <link rel="icon" type="image/svg+xml" href="/favicon/favicon.png"/>
          <link rel="alternate" type="application/rss+xml" href="/feed.xml"/>
      </head>
      <body>
        <Navigation/>
          <main>
              {children}
          </main>
      </body>
    </html>
  );
}
