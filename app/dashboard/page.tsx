'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/Header';
import AdminHeader from '@/components/admin/AdminHeader';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

export default function DashboardPage() {
  const { isAuthenticated, isAdmin, isCustomer } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Redirect customers to customer dashboard
  useEffect(() => {
    if (isAuthenticated && isCustomer) {
      router.push('/customer-dashboard');
    }
  }, [isAuthenticated, isCustomer, router]);

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Show admin dashboard for admin users
  if (isAdmin) {
    return (
      <div className="min-h-screen">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    );
  }

  return null; // Will redirect customers to customer dashboard
}