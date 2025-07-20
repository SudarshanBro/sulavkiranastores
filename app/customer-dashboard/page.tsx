'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';

export default function CustomerDashboardPage() {
  const { isAuthenticated, isAdmin, isCustomer } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Redirect admins to admin home page
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Only show customer dashboard for customer users
  if (isCustomer) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <CustomerDashboard />
        </main>
        <Footer />
      </div>
    );
  }

  return null; // Will redirect admins to home page
} 