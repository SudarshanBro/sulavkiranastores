import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Offer } from '@/types';
import { Clock, Tag, ArrowRight } from 'lucide-react';

interface OfferCardProps {
  offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <Badge className="bg-orange-600 hover:bg-orange-700">
              <Tag className="h-3 w-3 mr-1" />
              {offer.discount}% OFF
            </Badge>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">
              {offer.title}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4 line-clamp-2">
            {offer.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            {offer.category && (
              <Badge variant="secondary">
                {offer.category}
              </Badge>
            )}
            
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Valid till {formatDate(offer.validUntil)}
            </div>
          </div>

          <Link href="/products">
            <Button className="w-full">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}