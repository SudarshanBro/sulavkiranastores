'use client';

import { useRef } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Get first 8 products as new arrivals
  const newArrivals = mockProducts.slice(0, 8);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
          <p className="text-gray-600">Fresh products just added to our store</p>
        </div>

        {/* Product List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivals.map((product) => (
            <div key={product.id} className="flex-none w-72 sm:w-80">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom Navigation - Centered */}
        <div className="flex items-center justify-center space-x-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('left')}
              className="h-10 w-10 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('right')}
              className="h-10 w-10 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Link href="/groceries">
            <Button variant="ghost" className="text-green-600 hover:text-green-700">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}