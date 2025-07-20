'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, Package, Edit, Trash2, Plus } from 'lucide-react';

// Mock product data
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
  },
  { 
    id: 5, 
    name: 'Organic Honey', 
    category: 'Sweeteners', 
    price: 199.99, 
    stock: 15, 
    minStock: 5, 
    status: 'In Stock',
    description: 'Pure organic honey',
    sku: 'HONEY-001'
  },
  { 
    id: 6, 
    name: 'Green Tea', 
    category: 'Beverages', 
    price: 75.00, 
    stock: 30, 
    minStock: 8, 
    status: 'In Stock',
    description: 'Premium green tea leaves',
    sku: 'TEA-001'
  },
];

// Available categories
const categories = ['Grains', 'Dairy', 'Bakery', 'Sweeteners', 'Beverages', 'Vegetables', 'Fruits', 'Spices', 'Snacks'];

export default function AdminProductManagement() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    minStock: '',
    sku: ''
  });

  const getStockStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in stock': return 'bg-green-100 text-green-800';
      case 'low stock': return 'bg-orange-100 text-orange-800';
      case 'out of stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= minStock) return 'Low Stock';
    return 'In Stock';
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const availableCategories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock || !newProduct.sku) {
      alert('Please fill in all required fields');
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      description: newProduct.description,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      minStock: parseInt(newProduct.minStock) || 5,
      status: getStockStatus(parseInt(newProduct.stock), parseInt(newProduct.minStock) || 5),
      sku: newProduct.sku
    };

    setProducts([...products, product]);
    
    // Reset form
    setNewProduct({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      minStock: '',
      sku: ''
    });
    
    setShowAddProduct(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory and catalog</p>
        </div>
        <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                  placeholder="Product name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="col-span-3"
                  placeholder="Product description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category *
                </Label>
                <Select value={newProduct.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (₹) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="col-span-3"
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock *
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minStock" className="text-right">
                  Min Stock
                </Label>
                <Input
                  id="minStock"
                  type="number"
                  value={newProduct.minStock}
                  onChange={(e) => handleInputChange('minStock', e.target.value)}
                  className="col-span-3"
                  placeholder="5"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sku" className="text-right">
                  SKU *
                </Label>
                <Input
                  id="sku"
                  value={newProduct.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  className="col-span-3"
                  placeholder="SKU-001"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Items</CardTitle>
          <CardDescription>Manage your product Items</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                {availableCategories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="space-y-4">
            {filteredProducts.map((product) => (
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
                  <Badge className={getStockStatusColor(product.status)}>
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
    </div>
  );
} 