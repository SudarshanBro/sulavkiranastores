"use client";

import React, { useState } from "react";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function CustomerProductsPage() {
  // Local state for user ratings
  const [userRatings, setUserRatings] = useState<{ [productId: string]: number }>({});

  const handleRate = (productId: string, rating: number) => {
    setUserRatings((prev) => ({ ...prev, [productId]: rating }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardContent className="flex-1 flex flex-col">
              <ProductCard product={product} />
              <div className="flex items-center mt-3 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 cursor-pointer transition-colors ${
                      userRatings[product.id] && userRatings[product.id] >= star
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRate(product.id, star)}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-500">
                  {userRatings[product.id] ? `Your rating: ${userRatings[product.id]}` : "Rate this"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 