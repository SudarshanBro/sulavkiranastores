'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminOffersSection from '@/components/offers/AdminOffersSection';

export default function OffersPage() {
  // Debug logging
  console.log('OffersPage component rendered');

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        <AdminOffersSection />
      </main>
    </div>
  );
}