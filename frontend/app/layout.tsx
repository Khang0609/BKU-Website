import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ClientLayout } from "@/components/layout";
import { Toaster } from "sonner";
import { ToastProvider } from "@/hooks/useToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "BKU Student Portal",
    template: "%s | BKU Student Portal",
  },
  description:
    "Official student portal for Ho Chi Minh University of Technology (HCMUT). Access your courses, grades, calendar, messages, and student services.",
  keywords: [
    "BKU",
    "HCMUT",
    "Ho Chi Minh University of Technology",
    "student portal",
    "academic portal",
    "university portal",
    "Vietnam National University",
    "VNU-HCM",
  ],
  authors: [{ name: "HCMUT" }],
  creator: "HCMUT IT Department",
  publisher: "Ho Chi Minh University of Technology",
  metadataBase: new URL("https://portal.hcmut.edu.vn"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portal.hcmut.edu.vn",
    title: "BKU Student Portal",
    description:
      "Official student portal for Ho Chi Minh University of Technology (HCMUT)",
    siteName: "BKU Student Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "BKU Student Portal",
    description:
      "Official student portal for Ho Chi Minh University of Technology (HCMUT)",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when deploying
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultCollapsed =
    cookieStore.get("sidebarCollapsed")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <ClientLayout defaultCollapsed={defaultCollapsed}>
              {children}
            </ClientLayout>
          </ToastProvider>
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
