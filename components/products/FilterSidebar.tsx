'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Star, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
  };
  onFiltersChange: (filters: any) => void;
}

const categories = [
  'All Categories',
  'Grains',
  'Vegetables',
  'Fruits',
  'Dairy',
  'Cooking Oil',
  'Pulses',
  'Spices',
  'Beverages',
  'Dry Fruits',
  'Instant Food',
  'Natural Products',
  'Sweeteners'
];

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const resetFilters = () => {
    onFiltersChange({
      category: '',
      minPrice: 0,
      maxPrice: 10000,
      rating: 0,
    });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Category</Label>
          <Select
            value={filters.category || 'All Categories'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                category: value === 'All Categories' ? '' : value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range: Rs. {filters.minPrice} - Rs. {filters.maxPrice}
          </Label>
          <div className="space-y-4">
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) =>
                onFiltersChange({
                  ...filters,
                  minPrice: min,
                  maxPrice: max,
                })
              }
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <div className="space-y-2">
            {[4, 3, 2, 1, 0].map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  onFiltersChange({ ...filters, rating })
                }
                className={`flex items-center space-x-2 w-full p-2 rounded hover:bg-gray-50 transition-colors ${
                  filters.rating === rating ? 'bg-green-50 border border-green-200' : ''
                }`}
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {rating === 0 ? 'All ratings' : `${rating}+ stars`}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}