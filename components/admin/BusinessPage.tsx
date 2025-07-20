'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Store, 
  Package, 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  TrendingUp,
  Users,
  ShoppingCart,
  AlertTriangle,
  Calendar,
  DollarSign,
  Percent
} from 'lucide-react';
import AdminHeader from './AdminHeader';
import Footer from '@/components/Footer';
import AdminOffersSection from '@/components/offers/AdminOffersSection';

// Mock data for admin home page
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
  }
];

const mockProducts = [
  { 
    id: 1, 
    name: 'Organic Basmati Rice', 
    category: 'Grains', 
    price: 89.99, 
    stock: 45, 
    minStock: 10, 
    status: 'In Stock',
    description: 'Premium quality organic basmati rice',
    sku: 'RICE-001'
  },
  { 
    id: 2, 
    name: 'Fresh Cow Milk', 
    category: 'Dairy', 
    price: 45.00, 
    stock: 3, 
    minStock: 8, 
    status: 'Low Stock',
    description: 'Fresh farm milk delivered daily',
    sku: 'MILK-001'
  },
  { 
    id: 3, 
    name: 'Whole Wheat Bread', 
    category: 'Bakery', 
    price: 35.50, 
    stock: 2, 
    minStock: 6, 
    status: 'Low Stock',
    description: 'Fresh whole wheat bread',
    sku: 'BREAD-001'
  },
  { 
    id: 4, 
    name: 'Free Range Eggs', 
    category: 'Dairy', 
    price: 120.00, 
    stock: 25, 
    minStock: 12, 
    status: 'In Stock',
    description: 'Farm fresh free range eggs',
    sku: 'EGGS-001'
  }
];

const mockInventory = [
  { 
    id: 1, 
    name: 'Organic Basmati Rice', 
    category: 'Grains', 
    quantity: 45, 
    unit: 'kg',
    minQuantity: 10,
    location: 'Warehouse A',
    lastUpdated: '2024-01-15',
    status: 'In Stock'
  },
  { 
    id: 2, 
    name: 'Fresh Cow Milk', 
    category: 'Dairy', 
    quantity: 3, 
    unit: 'liters',
    minQuantity: 8,
    location: 'Cold Storage B',
    lastUpdated: '2024-01-14',
    status: 'Low Stock'
  },
  { 
    id: 3, 
    name: 'Whole Wheat Bread', 
    category: 'Bakery', 
    quantity: 2, 
    unit: 'pieces',
    minQuantity: 6,
    location: 'Bakery Section',
    lastUpdated: '2024-01-14',
    status: 'Low Stock'
  },
  { 
    id: 4, 
    name: 'Free Range Eggs', 
    category: 'Dairy', 
    quantity: 25, 
    unit: 'dozens',
    minQuantity: 12,
    location: 'Cold Storage A',
    lastUpdated: '2024-01-13',
    status: 'In Stock'
  }
];

const mockStats = {
  totalOffers: 3,
  activeOffers: 2,
  totalProducts: 89,
  lowStockProducts: 8,
  totalInventory: 156,
  pendingRestock: 5
};

export default function BusinessPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [offers, setOffers] = useState(mockOffers);
  const [products, setProducts] = useState(mockProducts);
  const [inventory, setInventory] = useState(mockInventory);
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'in stock': return 'bg-green-100 text-green-800';
      case 'low stock': return 'bg-orange-100 text-orange-800';
      case 'out of stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = (items: any[], searchField: string) => {
    return items.filter(item => {
      const matchesSearch = item[searchField].toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const categories = ['all', ...Array.from(new Set([
    ...offers.map(o => o.category),
    ...products.map(p => p.category),
    ...inventory.map(i => i.category)
  ]))];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Home</h1>
            <p className="text-gray-600">Manage your store operations, offers, products, and inventory</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button>
              <Store className="h-4 w-4 mr-2" />
              Store Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeOffers}</div>
              <p className="text-xs text-muted-foreground">
                {mockStats.totalOffers} total offers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {mockStats.lowStockProducts} low stock
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalInventory}</div>
              <p className="text-xs text-muted-foreground">
                {mockStats.pendingRestock} need restock
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest store activities and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Tag className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">New offer created</p>
                        <p className="text-sm text-gray-600">Summer Sale - 20% Off</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Low stock alert</p>
                        <p className="text-sm text-gray-600">Fresh Milk - 3 liters remaining</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Package className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Product added</p>
                        <p className="text-sm text-gray-600">Organic Honey - New product</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setShowAddOffer(true)}
                    >
                      <Plus className="h-6 w-6 mb-2" />
                      Add Offer
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setShowAddProduct(true)}
                    >
                      <Package className="h-6 w-6 mb-2" />
                      Add Product
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setShowAddInventory(true)}
                    >
                      <ShoppingCart className="h-6 w-6 mb-2" />
                      Add Inventory
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                    >
                      <TrendingUp className="h-6 w-6 mb-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <AdminOffersSection 
              showHeader={false}
              showStats={false}
              showFilters={true}
              showTabs={false}
            />
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>Manage your product catalog</CardDescription>
                  </div>
                  <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                          Add a new product to your catalog
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="productName">Product Name</Label>
                          <Input id="productName" placeholder="Enter product name" />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Input id="category" placeholder="Enter category" />
                        </div>
                        <div>
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input id="price" type="number" placeholder="0.00" />
                        </div>
                        <div>
                          <Label htmlFor="stock">Stock Quantity</Label>
                          <Input id="stock" type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label htmlFor="minStock">Minimum Stock</Label>
                          <Input id="minStock" type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Enter product description" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowAddProduct(false)}>
                          Add Product
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                          <p className="text-xs text-gray-500">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">₹{product.price}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{product.stock}</p>
                          <p className="text-xs text-gray-600">in stock</p>
                        </div>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
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

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Inventory Management</CardTitle>
                    <CardDescription>Track and manage inventory levels</CardDescription>
                  </div>
                  <Dialog open={showAddInventory} onOpenChange={setShowAddInventory}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Inventory Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Inventory Item</DialogTitle>
                        <DialogDescription>
                          Add a new item to your inventory
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="itemName">Item Name</Label>
                          <Input id="itemName" placeholder="Enter item name" />
                        </div>
                        <div>
                          <Label htmlFor="itemCategory">Category</Label>
                          <Input id="itemCategory" placeholder="Enter category" />
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input id="quantity" type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label htmlFor="unit">Unit</Label>
                          <Input id="unit" placeholder="kg, liters, pieces, etc." />
                        </div>
                        <div>
                          <Label htmlFor="minQuantity">Minimum Quantity</Label>
                          <Input id="minQuantity" type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="Warehouse, Shelf, etc." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddInventory(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowAddInventory(false)}>
                          Add Item
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.category}</p>
                          <p className="text-xs text-gray-500">Location: {item.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">{item.quantity} {item.unit}</p>
                          <p className="text-sm text-gray-600">Min: {item.minQuantity}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Last Updated</p>
                          <p className="text-xs text-gray-500">{item.lastUpdated}</p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
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
      </main>
      
      <Footer />
    </div>
  );
} 