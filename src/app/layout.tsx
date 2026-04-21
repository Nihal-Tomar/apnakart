import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "ApnaKart — Fresh Groceries Delivered Fast",
  description: "Apnakart delivers fresh groceries, dairy, fruits and vegetables to your door in 45 minutes. Track your budget, get AI-powered meal suggestions.",
  keywords: ["grocery", "budget", "AI", "India", "shopping", "daily needs", "fresh", "delivery"],
  openGraph: {
    title: "ApnaKart — Fresh Groceries Delivered Fast",
    description: "Fresh groceries delivered in 45 minutes with AI-powered budget tracking",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('apnakart-theme');
                var resolved = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', resolved);
              } catch (e) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
