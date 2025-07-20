import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/lib/cart-context';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sulav Kirana Stores - Your Local Store Online',
  description: 'Shop quality groceries and daily essentials from Sulav Kirana Stores, Dhairing. Fresh products, competitive prices, and convenient delivery.',
  keywords: 'kirana store, grocery, Dhairing, Nepal, online shopping, daily essentials',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}