'use client';

import { useState, useEffect } from 'react';
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
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Truck, 
  Activity,
  DollarSign,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  PieChart
} from 'lucide-react';

// Mock data for admin dashboard
const mockStats = {
  totalOrders: 1247,
  totalProducts: 89,
  totalCustomers: 342,
  totalRevenue: 45678,
  pendingShipments: 23,
  lowStockItems: 8
};

// Mock revenue data by category
const mockRevenueByCategory = [
  { category: 'Grains', revenue: 12500, percentage: 27.4, color: '#3B82F6' },
  { category: 'Dairy', revenue: 9800, percentage: 21.5, color: '#10B981' },
  { category: 'Bakery', revenue: 7200, percentage: 15.8, color: '#F59E0B' },
  { category: 'Beverages', revenue: 6800, percentage: 14.9, color: '#EF4444' },
  { category: 'Sweeteners', revenue: 5200, percentage: 11.4, color: '#8B5CF6' },
  { category: 'Others', revenue: 4178, percentage: 9.1, color: '#6B7280' },
];

// Mock revenue data by month
const mockRevenueByMonth = [
  { month: 'Jan', revenue: 4200, orders: 89 },
  { month: 'Feb', revenue: 3800, orders: 76 },
  { month: 'Mar', revenue: 4500, orders: 94 },
  { month: 'Apr', revenue: 5200, orders: 108 },
  { month: 'May', revenue: 4800, orders: 102 },
  { month: 'Jun', revenue: 5500, orders: 115 },
  { month: 'Jul', revenue: 6100, orders: 128 },
  { month: 'Aug', revenue: 5800, orders: 122 },
  { month: 'Sep', revenue: 5200, orders: 110 },
  { month: 'Oct', revenue: 4900, orders: 104 },
  { month: 'Nov', revenue: 5600, orders: 118 },
  { month: 'Dec', revenue: 6200, orders: 130 },
];

const mockRecentOrders = [
  { id: '#ORD-001', customer: 'John Doe', amount: 125.50, status: 'Pending', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'Jane Smith', amount: 89.99, status: 'Shipped', date: '2024-01-14' },
  { id: '#ORD-003', customer: 'Mike Johnson', amount: 234.00, status: 'Delivered', date: '2024-01-13' },
  { id: '#ORD-004', customer: 'Sarah Wilson', amount: 67.25, status: 'Processing', date: '2024-01-12' },
];

const mockLowStockItems = [
  { name: 'Organic Rice', current: 5, min: 10 },
  { name: 'Fresh Milk', current: 3, min: 8 },
  { name: 'Whole Wheat Bread', current: 2, min: 6 },
  { name: 'Free Range Eggs', current: 4, min: 12 },
];

const mockRecentActivities = [
  { action: 'New order received', time: '2 minutes ago', type: 'order' },
  { action: 'Product stock updated', time: '15 minutes ago', type: 'stock' },
  { action: 'Customer registered', time: '1 hour ago', type: 'customer' },
  { action: 'Payment processed', time: '2 hours ago', type: 'payment' },
];

// Mock customer data
const mockCustomers = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+91 98765 43210', joinDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+91 87654 32109', joinDate: '2024-01-10' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@email.com', phone: '+91 76543 21098', joinDate: '2024-01-08' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@email.com', phone: '+91 65432 10987', joinDate: '2024-01-05' },
  { id: 5, name: 'David Brown', email: 'david.brown@email.com', phone: '+91 54321 09876', joinDate: '2024-01-03' },
  { id: 6, name: 'Emily Davis', email: 'emily.davis@email.com', phone: '+91 43210 98765', joinDate: '2024-01-01' },
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [pieChartAnimated, setPieChartAnimated] = useState(false);
  const [barChartAnimated, setBarChartAnimated] = useState(false);
  const [showRevenueSection, setShowRevenueSection] = useState(false);

  // Debug logging
  console.log('AdminDashboard component rendered');

  // Trigger animations when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setPieChartAnimated(true);
      setBarChartAnimated(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4" />;
      case 'stock': return <Package className="h-4 w-4" />;
      case 'customer': return <Users className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'products':
        window.location.href = '/products';
        break;
      case 'analytics':
        window.location.href = '/analytics';
        break;
      case 'customers':
        setSelectedTab('customers');
        break;
      case 'orders':
        setSelectedTab('orders');
        break;
    }
  };

  // Calculate total revenue for percentage calculations
  const totalRevenue = mockRevenueByCategory.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store operations and monitor performance</p>
        </div>
      </div>

      {/* Revenue Section - Dropdown */}
      {showRevenueSection && (
        <Card className="mb-6 animate-in slide-in-from-top-2 duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Revenue Analytics</span>
            </CardTitle>
            <CardDescription>Detailed revenue analysis and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue by Category - Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    <span>Revenue by Category</span>
                  </CardTitle>
                  <CardDescription>Revenue distribution across product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Animated Pie Chart Visualization */}
                    <div className="flex items-center justify-center h-64">
                      <div className="relative w-48 h-48">
                        {/* Background circle */}
                        <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                        
                        {/* Animated pie segments */}
                        {mockRevenueByCategory.map((item, index) => {
                          const previousPercentage = mockRevenueByCategory
                            .slice(0, index)
                            .reduce((sum, cat) => sum + cat.percentage, 0);
                          const rotation = (previousPercentage / 100) * 360;
                          const angle = (item.percentage / 100) * 360;
                          
                          return (
                            <div
                              key={item.category}
                              className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                background: `conic-gradient(from ${rotation}deg, ${item.color} 0deg, ${item.color} ${angle}deg, transparent ${angle}deg)`,
                                transform: pieChartAnimated ? 'scale(1)' : 'scale(0)',
                                opacity: pieChartAnimated ? 1 : 0,
                                transitionDelay: `${index * 150}ms`
                              }}
                            />
                          );
                        })}
                        
                        {/* Center text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-700">₹{mockStats.totalRevenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Total Revenue</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2">
                      {mockRevenueByCategory.map((item) => (
                        <div key={item.category} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.category}</span>
                          <span className="text-sm font-medium ml-auto">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Revenue Trend - Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    <span>Monthly Revenue Trend</span>
                  </CardTitle>
                  <CardDescription>Revenue growth over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Animated Bar Chart */}
                    <div className="flex items-end justify-between h-64 space-x-2">
                      {mockRevenueByMonth.map((month, index) => (
                        <div key={month.month} className="flex-1 flex flex-col items-center">
                          <div className="relative w-full h-full flex items-end">
                            <div
                              className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t transition-all duration-1000 ease-out"
                              style={{
                                height: barChartAnimated ? `${(month.revenue / Math.max(...mockRevenueByMonth.map(m => m.revenue))) * 100}%` : '0%',
                                transitionDelay: `${index * 100}ms`
                              }}
                            />
                          </div>
                          <div className="mt-2 text-xs text-gray-600 text-center">
                            {month.month}
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            ₹{month.revenue.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
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
              +3 new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Low Stock Alerts</span>
              <Badge variant="destructive">{mockStats.lowStockItems}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockLowStockItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">Current: {item.current} | Min: {item.min}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3 mr-1" />
                  Restock
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Shipments */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-500" />
              <span>Pending Shipments</span>
              <Badge variant="secondary">{mockStats.pendingShipments}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentOrders.filter(order => order.status === 'Pending').map((order, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-gray-600">{order.customer}</p>
                  </div>
                  <Button size="sm">
                    <Truck className="h-3 w-3 mr-1" />
                    Ship
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="p-1 bg-gray-100 rounded">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Overview content without duplicate revenue charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickAction('products')}>
                    <Package className="h-6 w-6 mb-2" />
                    Manage Products
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickAction('orders')}>
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    View Orders
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickAction('customers')}>
                    <Users className="h-6 w-6 mb-2" />
                    Customer List
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickAction('analytics')}>
                    <TrendingUp className="h-6 w-6 mb-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system health and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Server Status</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Database</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Backup</span>
                    <span className="text-sm text-gray-600">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Users</span>
                    <span className="text-sm text-gray-600">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium">₹{order.amount}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View and manage customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                        <p className="text-xs text-gray-500">{customer.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Joined: {customer.joinDate}</p>
                      <div className="flex space-x-2 mt-2">
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
    </div>
  );
} 