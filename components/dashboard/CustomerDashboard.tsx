'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Gift, 
  Package, 
  Truck, 
  User,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  TrendingUp,
  Award,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const mockOrderHistory = [
  { id: '#ORD-001', date: '2024-01-15', total: 125.50, status: 'Delivered', items: 3 },
  { id: '#ORD-002', date: '2024-01-10', total: 89.99, status: 'Delivered', items: 2 },
  { id: '#ORD-003', date: '2024-01-05', total: 234.00, status: 'Delivered', items: 5 },
  { id: '#ORD-004', date: '2024-01-01', total: 67.25, status: 'Delivered', items: 1 },
];

const mockCurrentOrders = [
  { id: '#ORD-005', date: '2024-01-18', total: 156.75, status: 'In Transit', items: 4, estimatedDelivery: '2024-01-20' },
  { id: '#ORD-006', date: '2024-01-17', total: 89.50, status: 'Processing', items: 2, estimatedDelivery: '2024-01-22' },
];

const mockFavoriteProducts = [
  { id: 1, name: 'Organic Basmati Rice', price: 89.99, image: '/images/rice.jpg', rating: 4.5 },
  { id: 2, name: 'Fresh Cow Milk', price: 45.00, image: '/images/milk.jpg', rating: 4.8 },
  { id: 3, name: 'Whole Wheat Bread', price: 35.50, image: '/images/bread.jpg', rating: 4.2 },
  { id: 4, name: 'Free Range Eggs', price: 120.00, image: '/images/eggs.jpg', rating: 4.7 },
];

const mockDiscounts = [
  { code: 'SAVE10', discount: '10% off', validUntil: '2024-01-31', minPurchase: 500 },
  { code: 'FRESH20', discount: '20% off on fresh items', validUntil: '2024-01-25', minPurchase: 300 },
  { code: 'WELCOME15', discount: '15% off first order', validUntil: '2024-02-15', minPurchase: 200 },
];

const mockSuggestedProducts = [
  { id: 5, name: 'Organic Honey', price: 199.99, image: '/images/honey.jpg', rating: 4.6 },
  { id: 6, name: 'Green Tea', price: 75.00, image: '/images/tea.jpg', rating: 4.4 },
  { id: 7, name: 'Mixed Nuts', price: 299.99, image: '/images/nuts.jpg', rating: 4.8 },
];

export default function CustomerDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const router = useRouter();
  const { user, addLoyaltyPoints } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in transit': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <Package className="h-4 w-4" />;
      case 'in transit': return <Truck className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleBuyProduct = (productId: number, productName: string) => {
    // Redirect to groceries page with anchor to the product
    router.push(`/groceries#product-${productId}`);
  };

  const handleResetPoints = () => {
    addLoyaltyPoints(-(user?.loyaltyPoints || 0));
  };

  return (
    <div className="space-y-6">
      {/* Header with Profile */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Customer'}!</h1>
          <p className="text-gray-600">Here's what's happening with your account</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Loyalty Points</p>
            <p className="text-2xl font-bold text-green-600">{user?.loyaltyPoints || 0}</p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.avatar || '/images/avatar.jpg'} alt={user?.name || 'Customer'} />
            <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('') || 'C'}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrderHistory.length + mockCurrentOrders.length}</div>
            <p className="text-xs opacity-90">
              Lifetime orders
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(mockOrderHistory.reduce((sum, order) => sum + order.total, 0) + 
                 mockCurrentOrders.reduce((sum, order) => sum + order.total, 0)).toLocaleString()}
            </div>
            <p className="text-xs opacity-90">
              Lifetime spending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Items</CardTitle>
            <Heart className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFavoriteProducts.length}</div>
            <p className="text-xs opacity-90">
              Saved products
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Discounts</CardTitle>
            <Gift className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDiscounts.length}</div>
            <p className="text-xs opacity-90">
              Available offers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-500" />
              <span>Current Orders</span>
              <Badge variant="secondary">{mockCurrentOrders.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCurrentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.items} items • ₹{order.total}</p>
                      <p className="text-xs text-gray-500">Est. delivery: {order.estimatedDelivery}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-500" />
              <span>Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.avatar || '/images/avatar.jpg'} alt={user?.name || 'Customer'} />
                <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('') || 'C'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name || 'Customer'}</p>
                <p className="text-sm text-gray-600">Member since {new Date(user?.memberSince || '').toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{user?.email || ''}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{user?.phone || ''}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="truncate">{user?.address || ''}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-2">Loyalty Progress</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Level</span>
                  <span className="font-medium">Silver</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-gray-600">650 points to Gold level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discounts and Favorites */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Discounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-orange-500" />
              <span>Available Discounts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDiscounts.map((discount, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-medium text-orange-800">{discount.code}</p>
                    <p className="text-sm text-orange-700">{discount.discount}</p>
                    <p className="text-xs text-orange-600">Min. purchase: ₹{discount.minPurchase}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-orange-600">Valid until</p>
                    <p className="text-sm font-medium text-orange-800">{discount.validUntil}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Favorite Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Favorite Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockFavoriteProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">₹{product.price}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleBuyProduct(product.id, product.name)}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Buy
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggested Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <span>Recommended for You</span>
          </CardTitle>
          <CardDescription>Based on your purchase history and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockSuggestedProducts.map((product, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="h-24 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-sm mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{product.rating}</span>
                  </div>
                  <span className="font-medium text-green-600">₹{product.price}</span>
                </div>
                <Button size="sm" className="w-full mt-3" onClick={() => handleBuyProduct(product.id, product.name)}>
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Buy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 