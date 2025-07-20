'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Calendar,
  TrendingUp
} from 'lucide-react';
import Footer from '@/components/Footer';

// Mock data for offers
const mockOffers = [
  { 
    id: 1, 
    title: 'Summer Sale - 20% Off', 
    description: 'Get 20% off on all summer products',
    discount: 20,
    validFrom: '2024-06-01',
    validTo: '2024-08-31',
    status: 'Active',
    category: 'Seasonal'
  },
  { 
    id: 2, 
    title: 'New Customer Discount', 
    description: '10% off for first-time customers',
    discount: 10,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'Active',
    category: 'Customer'
  },
  { 
    id: 3, 
    title: 'Bulk Purchase Bonus', 
    description: 'Buy 5 items, get 1 free',
    discount: 16.67,
    validFrom: '2024-03-01',
    validTo: '2024-05-31',
    status: 'Expired',
    category: 'Bulk'
  },
  { 
    id: 4, 
    title: 'Holiday Special', 
    description: '15% off on all festive items',
    discount: 15,
    validFrom: '2024-12-01',
    validTo: '2024-12-31',
    status: 'Upcoming',
    category: 'Holiday'
  },
  { 
    id: 5, 
    title: 'Loyalty Rewards', 
    description: 'Extra 5% for loyal customers',
    discount: 5,
    validFrom: '2024-02-01',
    validTo: '2024-04-30',
    status: 'Expired',
    category: 'Loyalty'
  }
];

interface AdminOffersSectionProps {
  showHeader?: boolean;
  showStats?: boolean;
  showFilters?: boolean;
  showTabs?: boolean;
}

export default function AdminOffersSection({ 
  showHeader = true, 
  showStats = true, 
  showFilters = true, 
  showTabs = true 
}: AdminOffersSectionProps) {
  const [offers, setOffers] = useState(mockOffers);
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Debug logging
  console.log('AdminOffersSection component rendered');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || offer.status.toLowerCase() === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const activeOffers = offers.filter(offer => offer.status === 'Active');
  const expiredOffers = offers.filter(offer => offer.status === 'Expired');
  const upcomingOffers = offers.filter(offer => offer.status === 'Upcoming');

  const categories = ['all', ...Array.from(new Set(offers.map(offer => offer.category)))];
  const statuses = ['all', 'active', 'expired', 'upcoming'];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 space-y-6">
        {/* Header */}
        {showHeader && (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Offers Management</h1>
              <p className="text-gray-600">Manage promotional offers and discounts</p>
            </div>
            <div className="flex space-x-3">
              <Dialog open={showAddOffer} onOpenChange={setShowAddOffer}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Offer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Offer</DialogTitle>
                    <DialogDescription>
                      Create a new promotional offer
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="offerTitle">Offer Title</Label>
                      <Input id="offerTitle" placeholder="Enter offer title" />
                    </div>
                    <div>
                      <Label htmlFor="offerDescription">Description</Label>
                      <Textarea id="offerDescription" placeholder="Enter offer description" />
                    </div>
                    <div>
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input id="discount" type="number" placeholder="20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="validFrom">Valid From</Label>
                        <Input id="validFrom" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="validTo">Valid To</Label>
                        <Input id="validTo" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="offerCategory">Category</Label>
                      <Input id="offerCategory" placeholder="Seasonal, Customer, etc." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddOffer(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowAddOffer(false)}>
                      Add Offer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{offers.length}</div>
                <p className="text-xs text-muted-foreground">
                  All time offers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeOffers.length}</div>
                <p className="text-xs text-muted-foreground">
                  Currently running
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expired Offers</CardTitle>
                <Calendar className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{expiredOffers.length}</div>
                <p className="text-xs text-muted-foreground">
                  Past offers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Offers</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{upcomingOffers.length}</div>
                <p className="text-xs text-muted-foreground">
                  Scheduled offers
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">Search Offers</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        {showTabs ? (
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Offers ({filteredOffers.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeOffers.length})</TabsTrigger>
              <TabsTrigger value="expired">Expired ({expiredOffers.length})</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming ({upcomingOffers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Offers</CardTitle>
                  <CardDescription>Complete list of all promotional offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredOffers.map((offer) => (
                      <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Tag className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{offer.title}</p>
                            <p className="text-sm text-gray-600">{offer.description}</p>
                            <p className="text-xs text-gray-500">{offer.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-green-600">{offer.discount}% OFF</p>
                            <p className="text-sm text-gray-600">
                              {offer.validFrom} - {offer.validTo}
                            </p>
                          </div>
                          <Badge className={getStatusColor(offer.status)}>
                            {offer.status}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Offers</CardTitle>
                  <CardDescription>Currently running promotional offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeOffers.map((offer) => (
                      <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Tag className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{offer.title}</p>
                            <p className="text-sm text-gray-600">{offer.description}</p>
                            <p className="text-xs text-gray-500">{offer.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-green-600">{offer.discount}% OFF</p>
                            <p className="text-sm text-gray-600">
                              {offer.validFrom} - {offer.validTo}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expired" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Expired Offers</CardTitle>
                  <CardDescription>Past promotional offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiredOffers.map((offer) => (
                      <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Tag className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{offer.title}</p>
                            <p className="text-sm text-gray-600">{offer.description}</p>
                            <p className="text-xs text-gray-500">{offer.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-gray-600">{offer.discount}% OFF</p>
                            <p className="text-sm text-gray-600">
                              {offer.validFrom} - {offer.validTo}
                            </p>
                          </div>
                          <Badge className="bg-red-100 text-red-800">
                            Expired
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Offers</CardTitle>
                  <CardDescription>Scheduled promotional offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingOffers.map((offer) => (
                      <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Tag className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{offer.title}</p>
                            <p className="text-sm text-gray-600">{offer.description}</p>
                            <p className="text-xs text-gray-500">{offer.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-blue-600">{offer.discount}% OFF</p>
                            <p className="text-sm text-gray-600">
                              {offer.validFrom} - {offer.validTo}
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            Upcoming
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // Simple list view when tabs are disabled
          <Card>
            <CardHeader>
              <CardTitle>Offers</CardTitle>
              <CardDescription>List of promotional offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Tag className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{offer.title}</p>
                        <p className="text-sm text-gray-600">{offer.description}</p>
                        <p className="text-xs text-gray-500">{offer.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-green-600">{offer.discount}% OFF</p>
                        <p className="text-sm text-gray-600">
                          {offer.validFrom} - {offer.validTo}
                        </p>
                      </div>
                      <Badge className={getStatusColor(offer.status)}>
                        {offer.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
} 