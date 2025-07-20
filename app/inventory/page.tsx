'use client';

import { useAuth } from '@/lib/auth-context';
import AdminInventoryManagement from '@/components/products/AdminInventoryManagement';
import AdminHeader from '@/components/admin/AdminHeader';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InventoryPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // For now, show admin inventory management for all authenticated users
  // In a real app, you'd check user.role === 'admin'
  return (
    <div className="min-h-screen">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <AdminInventoryManagement />
      </main>
      <Footer />
    </div>
  );
} 