'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Fresh Groceries Delivered",
    subtitle: "Quality products from your trusted neighborhood store",
    image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "Daily Essentials at Great Prices",
    subtitle: "Everything you need for your home and family",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
    cta: "Browse Products"
  },
  {
    id: 3,
    title: "Special Offers & Discounts",
    subtitle: "Save more on your favorite products",
    image: "https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg",
    cta: "View Offers"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {slide.cta === 'View Offers' ? (
                      <Link href="/offers">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          {slide.cta}
                        </Button>
                      </Link>
                    ) : (
                    <Link href="/groceries">
                      <Button size="lg" className="bg-green-600 hover:bg-green-700">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        {slide.cta}
                      </Button>
                    </Link>
                    )}
                    <Link href="/about">
                      <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-green-900">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
}