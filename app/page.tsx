'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import NewArrivals from '@/components/home/NewArrivals';
import OffersTeaser from '@/components/home/OffersTeaser';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import LoginPromptCard from '@/components/LoginPromptCard';
import BusinessPage from '@/components/admin/BusinessPage';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

export default function Home() {
  const { isAuthenticated, isAdmin, isCustomer, user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User authenticated:', {
        name: user?.name,
        email: user?.email,
        role: user?.role,
        isAdmin,
        isCustomer
      });
    }
  }, [isAuthenticated, user, isAdmin, isCustomer]);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoginPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (isAuthenticated && isAdmin) {
    return <BusinessPage />;
  }

  if (isAuthenticated && isCustomer) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <NewArrivals />
          <OffersTeaser />
          <WhyChooseUs />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
      {showLoginPrompt && (
        <LoginPromptCard onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
}

function LandingPage() {
  return (
    <section className="relative h-[600px] overflow-hidden flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <Image
        src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"
        alt="Landing Hero"
        fill
        className="object-cover object-center opacity-70"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center mb-6">
          <Store className="h-12 w-12 text-green-400 mr-2" />
          <span className="text-4xl font-bold text-white drop-shadow-lg">Sulav Kirana</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg text-center">
          Welcome to Sulav Kirana Stores
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 text-center max-w-2xl">
          Your trusted neighborhood store for fresh groceries, daily essentials, and exclusive offers. Shop smart, live well.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto">
          <Link href="/login">
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-green-900">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
