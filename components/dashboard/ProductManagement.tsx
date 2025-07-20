'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/lib/mock-data';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products] = useState(mockProducts.slice(0, 10)); // Show first 10 products

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product added successfully!');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Add Product Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Product Management</h3>
          <p className="text-gray-600">Manage your store inventory</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Add a new product to your store inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" placeholder="Enter product name" required />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (Rs.)</Label>
                  <Input id="price" type="number" placeholder="0" required />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" required />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" placeholder="per kg, per piece" required />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Product description..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit">Add Product</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Products</CardTitle>
          <CardDescription>
            Manage your existing products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Stock</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="p-2">Rs. {product.price}</td>
                    <td className="p-2">
                      <span className={
                        product.stock < 10 ? 'text-orange-600' : 
                        product.stock === 0 ? 'text-red-600' : 'text-green-600'
                      }>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-2">
                      <Badge  
                        variant={
                          product.stock === 0 ? 'destructive' :
                          product.stock < 10 ? 'secondary' : 'default'
                        }
                      >
                        {product.stock === 0 ? 'Out of Stock' :
                         product.stock < 10 ? 'Low Stock' : 'In Stock'}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}