"use client";

import React, { useState } from "react";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Header from "@/components/Header";
import type { Product } from "@/types";
import { useAuth } from "@/lib/auth-context";
import Footer from "@/components/Footer";

export default function GroceriesPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userRatings, setUserRatings] = useState<{ [productId: string]: number }>(
    Object.fromEntries(mockProducts.map((p) => [p.id, 5]))
  );
  const { addLoyaltyPoints } = useAuth();

  const handleRate = (productId: string, rating: number) => {
    setUserRatings((prev) => ({ ...prev, [productId]: rating }));
    addLoyaltyPoints(rating);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">All Groceries</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <Card key={product.id} className="flex flex-col" id={`product-${product.id}`}>
              <CardContent className="flex-1 flex flex-col">
                <Dialog>
                  <DialogTrigger asChild>
                    <div>
                      <div
                        className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer mb-2"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-40 rounded-lg"
                        />
                      </div>
                      <div
                        className="font-semibold text-sm line-clamp-2 text-gray-900 hover:underline cursor-pointer text-center mb-2"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.name}
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-col items-center">
                      <h2 className="text-lg font-bold mb-2">Rate {selectedProduct?.name || product.name}</h2>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-7 w-7 cursor-pointer transition-colors ${
                              userRatings[product.id] && userRatings[product.id] >= star
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                            onClick={() => handleRate(product.id, star)}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {userRatings[product.id] ? `Your rating: ${userRatings[product.id]}` : "Click a star to rate"}
                      </span>
                    </div>
                  </DialogContent>
                </Dialog>
                <ProductCard 
                  product={{ ...product, rating: userRatings[product.id] ?? 5 }}
                  hideImageAndName
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
} 