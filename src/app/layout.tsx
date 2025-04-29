// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokedex</title>
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" /> */}
        <link rel="stylesheet" href="/" />
      </head>
      <body >
        <header />
        <main>
          {children}
        </main>
        <footer />
      </body>
    </html>
  );
}
