"use client";

import { useRouter } from "next/navigation";
import { mockOffers, mockProducts } from "@/lib/mock-data";
import Header from "@/components/Header";
import { useEffect, useRef } from "react";
import Footer from "@/components/Footer";

export default function DiscountsPage() {
  const router = useRouter();
  const flashScrollRef = useRef<HTMLDivElement>(null);

  // Find a product in groceries that matches the offer's category or image
  const getProductIdForOffer = (offer: any) => {
    // Try to match by category first
    const product = mockProducts.find(
      (p) => p.category === offer.category || p.image === offer.image
    );
    return product ? product.id : null;
  };

  const handleDiscountClick = (offer: any) => {
    const productId = getProductIdForOffer(offer);
    if (productId) {
      // Redirect to groceries page with anchor to product card
      router.push(`/groceries#product-${productId}`);
    } else {
      router.push("/groceries");
    }
  };

  // Endless auto-scroll for flash offers
  useEffect(() => {
    const container = flashScrollRef.current;
    if (!container) return;
    let interval: NodeJS.Timeout;
    let paused = false;
    let scrollAmount = 1000;
    const itemWidth = 280; // min-w-[260px] + gap
    const visibleItems = 2;
    const scrollStep = itemWidth;
    const pauseDuration = 2000;

    function scrollNext() {
      if (!container) return;
      if (paused) return;
      scrollAmount += scrollStep;
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 1000;
      }
      container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }

    interval = setInterval(scrollNext, pauseDuration);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Live Discounts & Offers</h1>
        {/* Flash Offers Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-orange-600">Flash Offers</h2>
          <div
            ref={flashScrollRef}
            className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollBehavior: 'smooth', width: '100%' }}
          >
            {mockOffers.map((offer) => (
              <div
                key={offer.id}
                className="min-w-[260px] max-w-[260px] bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 rounded-lg shadow p-4 flex-shrink-0 cursor-pointer hover:shadow-lg transition"
                onClick={() => handleDiscountClick(offer)}
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-28 object-cover rounded-md mb-2"
                />
                <div className="flex items-center justify-between mb-1">
                  <span className="text-orange-600 font-bold text-sm">{offer.discount}% OFF</span>
                  <span className="text-xs text-gray-400">{offer.validUntil}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{offer.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Main Discounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => handleDiscountClick(offer)}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold mb-1 text-green-700">{offer.title}</h2>
              <p className="text-gray-600 mb-2">{offer.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-bold">{offer.discount}% OFF</span>
                <span className="text-xs text-gray-400">Valid until {offer.validUntil}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
} 