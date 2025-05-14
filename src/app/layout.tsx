import type {Metadata} from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Changed import
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster for notifications "es' --exclude='./.git' --exclude='./project_archive.tar.gz' --exclude='./project_source_code.tar.gz' --exclude='./proyect.tar.gz' --exclude='./.idx' --exclude='./.vscode' ."

const inter = Inter({ // Changed to Inter
  variable: '--font-sans', // Updated variable name for clarity
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({ // Changed to Roboto_Mono
  variable: '--font-mono', // Updated variable name for clarity
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AetherChat - Intelligent Conversational AI',
  description: 'AetherChat provides a seamless chat experience with powerful AI agents.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
