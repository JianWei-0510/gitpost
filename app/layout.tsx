import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";

const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitPost",
  description: "Login with your Github, select a repository as your blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang='en' data-color-mode='dark' suppressHydrationWarning>
        <head />
        <body className={cn(notoSansTC.className)}>
          <ThemeProvider attribute='class'>
            <Toaster position='top-center' richColors />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
