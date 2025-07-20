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
import { Search, Filter, Package, Edit, Trash2, Plus, MapPin, Warehouse, Box, DollarSign } from 'lucide-react';

// Mock inventory data
const mockInventory = [
  {
    id: 1,
    name: 'Main Warehouse',
    location: 'Lasti, Parbat',
    address: 'Jaljala, 7- Lasti, Parbat',
    capacity: 10000,
    usedCapacity: 7500,
    items: [
      { id: 1, name: 'Organic Basmati Rice', quantity: 500, sku: 'RICE-001', category: 'Grains', price: 120 },
      { id: 2, name: 'Fresh Cow Milk', quantity: 200, sku: 'MILK-001', category: 'Dairy', price: 80 },
      { id: 3, name: 'Whole Wheat Bread', quantity: 150, sku: 'BREAD-001', category: 'Bakery', price: 45 },
      { id: 4, name: 'Free Range Eggs', quantity: 300, sku: 'EGGS-001', category: 'Dairy', price: 15 },
    ],
    status: 'Active',
    manager: 'Tara Devi Acharya',
    phone: '+977 9847620003'
  },
  {
    id: 2,
    name: 'Dhairing Distribution Center',
    location: 'Dhairing, Parbat',
    address: 'Jaljala, 7- Dhairing, Parbat',
    capacity: 8000,
    usedCapacity: 5200,
    items: [
      { id: 5, name: 'Organic Honey', quantity: 100, sku: 'HONEY-001', category: 'Sweeteners', price: 350 },
      { id: 6, name: 'Green Tea', quantity: 250, sku: 'TEA-001', category: 'Beverages', price: 180 },
      { id: 7, name: 'Fresh Vegetables', quantity: 400, sku: 'VEG-001', category: 'Vegetables', price: 60 },
    ],
    status: 'Active',
    manager: 'Krishna Prasad Acharya',
    phone: '+977 9847620003'
  },
  {
    id: 3,
    name: 'Ghahakhet Storage Facility',
    location: 'Ghahakhet, Parbat',
    address: 'Jaljala, 7- Ghahakhet, Parbat',
    capacity: 6000,
    usedCapacity: 3800,
    items: [
      { id: 8, name: 'Fresh Fruits', quantity: 300, sku: 'FRUITS-001', category: 'Fruits', price: 200 },
      { id: 9, name: 'Organic Spices', quantity: 150, sku: 'SPICES-001', category: 'Spices', price: 450 },
      { id: 10, name: 'Snacks Pack', quantity: 500, sku: 'SNACKS-001', category: 'Snacks', price: 25 },
    ],
    status: 'Active',
    manager: 'Jayanti Acharya',
    phone: '+977 9847655866'
  },
  {
    id: 4,
    name: 'Cold Storage Unit',
    location: 'Dhairing, Parbat',
    address: 'Jaljala, 7- Dhairing, Parbat',
    capacity: 3000,
    usedCapacity: 2100,
    items: [
      { id: 11, name: 'Frozen Foods', quantity: 200, sku: 'FROZEN-001', category: 'Frozen', price: 280 },
      { id: 12, name: 'Ice Cream', quantity: 100, sku: 'ICE-001', category: 'Dairy', price: 120 },
      { id: 13, name: 'Frozen Vegetables', quantity: 150, sku: 'FROZEN-VEG-001', category: 'Frozen', price: 180 },
    ],
    status: 'Active',
    manager: 'Shiva Acharya',
    phone: '+977 9857630003'
  }
];

// Available locations for new inventory
const locations = ['Lasti', 'Dhairing', 'Ghahakhet', 'Foksing', 'Kerabari'];
const statusOptions = ['Active', 'Inactive', 'Maintenance', 'Full'];

export default function AdminInventoryManagement() {
  const [inventory, setInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [showEditInventory, setShowEditInventory] = useState(false);
  const [showManageItems, setShowManageItems] = useState(false);
  const [editingInventory, setEditingInventory] = useState<any>(null);
  const [managingInventory, setManagingInventory] = useState<any>(null);
  const [newInventory, setNewInventory] = useState({
    name: '',
    location: '',
    address: '',
    capacity: '',
    manager: '',
    phone: ''
  });
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    sku: '',
    category: '',
    price: ''
  });

  const getCapacityPercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  const getCapacityColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-100 text-red-800';
    if (percentage >= 75) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const calculateUsedCapacity = (items: any[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || item.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  const availableLocations = ['all', ...Array.from(new Set(inventory.map(i => i.location.split(',')[0])))];

  const handleAddInventory = () => {
    if (!newInventory.name || !newInventory.location || !newInventory.capacity) {
      alert('Please fill in all required fields');
      return;
    }

    const inventoryItem = {
      id: inventory.length + 1,
      name: newInventory.name,
      location: newInventory.location,
      address: newInventory.address,
      capacity: parseInt(newInventory.capacity),
      usedCapacity: 0,
      items: [],
      status: 'Active',
      manager: newInventory.manager,
      phone: newInventory.phone
    };

    setInventory([...inventory, inventoryItem]);
    
    // Reset form
    setNewInventory({
      name: '',
      location: '',
      address: '',
      capacity: '',
      manager: '',
      phone: ''
    });
    
    setShowAddInventory(false);
  };

  const handleEditInventory = () => {
    if (!editingInventory) return;

    const updatedInventory = inventory.map(item => 
      item.id === editingInventory.id ? editingInventory : item
    );
    
    setInventory(updatedInventory);
    setShowEditInventory(false);
    setEditingInventory(null);
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.sku || !newItem.category || !newItem.price) {
      alert('Please fill in all required fields');
      return;
    }

    const itemToAdd = {
      id: Date.now(),
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
      sku: newItem.sku,
      category: newItem.category,
      price: parseFloat(newItem.price)
    };

    const updatedInventory = inventory.map(item => {
      if (item.id === managingInventory.id) {
        const updatedItems = [...item.items, itemToAdd];
        const newUsedCapacity = calculateUsedCapacity(updatedItems);
        return {
          ...item,
          items: updatedItems,
          usedCapacity: newUsedCapacity
        };
      }
      return item;
    });

    setInventory(updatedInventory);
    setManagingInventory(updatedInventory.find(item => item.id === managingInventory.id));
    
    // Reset form
    setNewItem({
      name: '',
      quantity: '',
      sku: '',
      category: '',
      price: ''
    });
  };

  const handleDeleteItem = (itemId: number) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === managingInventory.id) {
        const updatedItems = item.items.filter(product => product.id !== itemId);
        const newUsedCapacity = calculateUsedCapacity(updatedItems);
        return {
          ...item,
          items: updatedItems,
          usedCapacity: newUsedCapacity
        };
      }
      return item;
    });

    setInventory(updatedInventory);
    setManagingInventory(updatedInventory.find(item => item.id === managingInventory.id));
  };

  const handleInputChange = (field: string, value: string) => {
    setNewInventory(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditInputChange = (field: string, value: string) => {
    if (!editingInventory) return;
    setEditingInventory((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemInputChange = (field: string, value: string) => {
    setNewItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const openEditDialog = (inventoryItem: any) => {
    setEditingInventory({ ...inventoryItem });
    setShowEditInventory(true);
  };

  const openManageItemsDialog = (inventoryItem: any) => {
    setManagingInventory({ ...inventoryItem });
    setShowManageItems(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage your warehouse and storage facilities</p>
        </div>
        <Dialog open={showAddInventory} onOpenChange={setShowAddInventory}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Inventory
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Inventory Location</DialogTitle>
              <DialogDescription>
                Add a new warehouse or storage facility to your inventory network.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={newInventory.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                  placeholder="Warehouse name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location *
                </Label>
                <Select value={newInventory.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={newInventory.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="col-span-3"
                  placeholder="Full address"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity *
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newInventory.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  className="col-span-3"
                  placeholder="Total capacity in units"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="manager" className="text-right">
                  Manager
                </Label>
                <Input
                  id="manager"
                  value={newInventory.manager}
                  onChange={(e) => handleInputChange('manager', e.target.value)}
                  className="col-span-3"
                  placeholder="Manager name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newInventory.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="col-span-3"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddInventory(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddInventory}>
                Add Inventory
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search inventory locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            {availableLocations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInventory.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Warehouse className="h-5 w-5 text-blue-500" />
                    <span>{item.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{item.location}</span>
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getCapacityColor(getCapacityPercentage(item.usedCapacity, item.capacity))}>
                    {getCapacityPercentage(item.usedCapacity, item.capacity)}% Full
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Capacity Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Capacity Usage</span>
                  <span>{item.usedCapacity} / {item.capacity} units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getCapacityPercentage(item.usedCapacity, item.capacity)}%` }}
                  />
                </div>
              </div>

              {/* Manager Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Manager:</span>
                  <span className="font-medium">{item.manager}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{item.phone}</span>
                </div>
              </div>

              {/* Items Count */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Items Stored:</span>
                <span className="font-medium">{item.items.length} different products</span>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Stored Items:</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {item.items.map((product) => (
                    <div key={product.id} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <Box className="h-3 w-3 text-gray-400" />
                        <span>{product.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">{product.category}</span>
                        <span className="text-green-600 font-medium">₹{product.price}</span>
                        <Badge variant="outline" className="text-xs">
                          {product.quantity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {item.items.length === 0 && (
                    <div className="text-xs text-gray-500 text-center py-2">
                      No items stored yet
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => openEditDialog(item)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => openManageItemsDialog(item)}
                >
                  <Package className="h-3 w-3 mr-1" />
                  Manage Items
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Inventory Dialog */}
      <Dialog open={showEditInventory} onOpenChange={setShowEditInventory}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Inventory Location</DialogTitle>
            <DialogDescription>
              Update warehouse information and settings.
            </DialogDescription>
          </DialogHeader>
          {editingInventory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name *
                </Label>
                <Input
                  id="edit-name"
                  value={editingInventory.name}
                  onChange={(e) => handleEditInputChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location *
                </Label>
                <Select value={editingInventory.location} onValueChange={(value) => handleEditInputChange('location', value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Address
                </Label>
                <Textarea
                  id="edit-address"
                  value={editingInventory.address}
                  onChange={(e) => handleEditInputChange('address', e.target.value)}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-capacity" className="text-right">
                  Capacity *
                </Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={editingInventory.capacity}
                  onChange={(e) => handleEditInputChange('capacity', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select value={editingInventory.status} onValueChange={(value) => handleEditInputChange('status', value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-manager" className="text-right">
                  Manager
                </Label>
                <Input
                  id="edit-manager"
                  value={editingInventory.manager}
                  onChange={(e) => handleEditInputChange('manager', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={editingInventory.phone}
                  onChange={(e) => handleEditInputChange('phone', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowEditInventory(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditInventory}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Items Dialog */}
      <Dialog open={showManageItems} onOpenChange={setShowManageItems}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Items - {managingInventory?.name}</DialogTitle>
            <DialogDescription>
              Add, edit, or remove items from this warehouse. Capacity will be automatically updated.
            </DialogDescription>
          </DialogHeader>
          {managingInventory && (
            <div className="space-y-6">
              {/* Add New Item Form */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Add New Item</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="item-name">Item Name *</Label>
                    <Input
                      id="item-name"
                      value={newItem.name}
                      onChange={(e) => handleItemInputChange('name', e.target.value)}
                      placeholder="Product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-sku">SKU *</Label>
                    <Input
                      id="item-sku"
                      value={newItem.sku}
                      onChange={(e) => handleItemInputChange('sku', e.target.value)}
                      placeholder="Stock keeping unit"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-category">Category *</Label>
                    <Input
                      id="item-category"
                      value={newItem.category}
                      onChange={(e) => handleItemInputChange('category', e.target.value)}
                      placeholder="Product category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-quantity">Quantity *</Label>
                    <Input
                      id="item-quantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => handleItemInputChange('quantity', e.target.value)}
                      placeholder="Number of units"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-price">Price (₹) *</Label>
                    <Input
                      id="item-price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => handleItemInputChange('price', e.target.value)}
                      placeholder="Price per unit"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddItem} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
              </div>

              {/* Current Items List */}
              <div>
                <h3 className="text-lg font-medium mb-4">Current Items</h3>
                <div className="space-y-2">
                  {managingInventory.items.map((product: any) => (
                    <div key={product.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Box className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.sku} • {product.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium text-green-600">₹{product.price}</div>
                          <div className="text-sm text-gray-500">{product.quantity} units</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteItem(product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {managingInventory.items.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No items in this warehouse yet
                    </div>
                  )}
                </div>
              </div>

              {/* Capacity Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Total Capacity</div>
                    <div className="font-medium">{managingInventory.capacity} units</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Used Capacity</div>
                    <div className="font-medium">{managingInventory.usedCapacity} units</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Available</div>
                    <div className="font-medium">{managingInventory.capacity - managingInventory.usedCapacity} units</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Usage</div>
                    <div className="font-medium">{getCapacityPercentage(managingInventory.usedCapacity, managingInventory.capacity)}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getCapacityPercentage(managingInventory.usedCapacity, managingInventory.capacity)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowManageItems(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 