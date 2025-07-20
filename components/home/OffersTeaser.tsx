import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, Clock, ArrowRight } from 'lucide-react';

export default function OffersTeaser() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Tag className="h-12 w-12 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Offers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our limited-time deals and seasonal discounts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Featured Offer */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 lg:h-80">
                <Image
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                  alt="Special Offer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
                  <Badge className="w-fit mb-4 bg-orange-600">
                    Limited Time
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                    Weekend Special
                  </h3>
                  <p className="text-lg mb-4 text-gray-200">
                    Get up to 25% off on fresh groceries
                  </p>
                  <div className="flex items-center text-sm text-gray-300 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    Ends Sunday night
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Offers */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-32">
                  <Image
                    src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg"
                    alt="Daily Essentials"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-center p-4 text-white">
                    <Badge className="w-fit mb-2 bg-green-600">
                      15% OFF
                    </Badge>
                    <h4 className="font-bold">Daily Essentials</h4>
                    <p className="text-sm text-gray-200">Rice, Oil, Pulses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-32">
                  <Image
                    src="https://images.pexels.com/photos/1842332/pexels-photo-1842332.jpeg"
                    alt="Snacks & Beverages"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-center p-4 text-white">
                    <Badge className="w-fit mb-2 bg-blue-600">
                      Buy 2 Get 1
                    </Badge>
                    <h4 className="font-bold">Snacks & Drinks</h4>
                    <p className="text-sm text-gray-200">All brands included</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Link href="/discounts">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              View All Offers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}