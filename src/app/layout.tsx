import type { Metadata } from "next";
import './index.scss'
import './App.scss'
import Navigation from "@/app/_components/Navigation";
import Footer from "@/app/_components/Footer";

export const metadata: Metadata = {
    metadataBase: new URL('https://stenterstal.com'),
    title: `Sten ter Stal | Full Stack Software Engineer`,
    description: `Online resume and collection of projects`,
    openGraph: {
        locale: 'en_US',
        images: [{
            url: "/assets/img/Avatar.png",
            alt: 'Pixelated avatar'
        }],
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
          <link rel="icon" type="image/svg+xml" href="/favicon/icon.png"/>
          <link rel="alternate" type="application/rss+xml" href="/feed.xml"/>
      </head>
      <body>
          <Navigation/>
          <main>
              <div className={"main-container"}>
                  {children}
              </div>
              <Footer/>
          </main>
      </body>
    </html>
  );
}
