import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { SmoothScrollProvider } from "@/components/providers";
import { ContactModalProvider } from "@/components/providers/contact-modal-provider";

const excon = localFont({
  src: [
    {
      path: "./fonts/Excon-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-excon",
});

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.melwyn.co.in'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Melwyn Titus | Full Stack Developer & Product Engineer',
    template: '%s | Melwyn Titus'
  },
  description: 'Full Stack Developer & Product Engineer specializing in modern web technologies, scalable applications, and user-centric products. Expertise in React, Next.js, Node.js, and cloud architecture.',
  keywords: [
    'Full Stack Developer',
    'Product Engineer',
    'React Developer',
    'Next.js',
    'Node.js',
    'Web Development',
    'Melwyn Titus',
    'Software Engineer',
    'JavaScript',
    'TypeScript',
    'Portfolio'
  ],
  authors: [{ name: 'Melwyn Titus', url: 'https://www.melwyn.co.in' }],
  creator: 'Melwyn Titus',
  publisher: 'Melwyn Titus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.melwyn.co.in',
    title: 'Melwyn Titus | Full Stack Developer & Product Engineer',
    description: 'Full Stack Developer & Product Engineer specializing in modern web technologies and scalable applications.',
    siteName: 'Melwyn Titus Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Melwyn Titus - Full Stack Developer & Product Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melwyn Titus | Full Stack Developer & Product Engineer',
    description: 'Full Stack Developer & Product Engineer specializing in modern web technologies and scalable applications.',
    images: ['/twitter-image.png'],
    creator: '@melwyntitus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#08080a',
  colorScheme: 'dark',
};

import { OrganizationSchema, PersonSchema, WebsiteSchema } from "@/app/components/structured-data";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="min-h-svh">
      <body
        className={`${excon.variable} ${satoshi.variable} relative min-h-svh bg-[#08080a]`}
        suppressHydrationWarning={true}
      >
        <PersonSchema />
        <OrganizationSchema />
        <WebsiteSchema />
        <SmoothScrollProvider>
          <ContactModalProvider>{children}</ContactModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
