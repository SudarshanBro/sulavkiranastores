'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

// Mock analytics data
const analyticsData = {
  totalRevenue: 284750,
  totalOrders: 1247,
  totalCustomers: 892,
  averageOrderValue: 228.5,
  revenueGrowth: 12.5,
  orderGrowth: 8.3,
  customerGrowth: 15.2,
  monthlyRevenue: [
    { month: 'Jan', revenue: 18500 },
    { month: 'Feb', revenue: 22100 },
    { month: 'Mar', revenue: 19800 },
    { month: 'Apr', revenue: 24500 },
    { month: 'May', revenue: 26700 },
    { month: 'Jun', revenue: 28475 },
  ],
  topProducts: [
    { name: 'Organic Basmati Rice', sales: 156, revenue: 23400 },
    { name: 'Fresh Cow Milk', sales: 142, revenue: 21300 },
    { name: 'Whole Wheat Bread', sales: 128, revenue: 19200 },
    { name: 'Free Range Eggs', sales: 115, revenue: 17250 },
    { name: 'Organic Honey', sales: 98, revenue: 14700 },
  ],
  customerSegments: [
    { segment: 'New Customers', count: 234, percentage: 26.2 },
    { segment: 'Returning Customers', count: 458, percentage: 51.3 },
    { segment: 'VIP Customers', count: 200, percentage: 22.5 },
  ],
  recentOrders: [
    { id: '#ORD-001', customer: 'Ram Bahadur Thapa', amount: 1250, status: 'Delivered', date: '2024-06-15' },
    { id: '#ORD-002', customer: 'Sita Devi Karki', amount: 890, status: 'Processing', date: '2024-06-14' },
    { id: '#ORD-003', customer: 'Krishna Prasad', amount: 1560, status: 'Shipped', date: '2024-06-14' },
    { id: '#ORD-004', customer: 'Laxmi Devi', amount: 720, status: 'Delivered', date: '2024-06-13' },
    { id: '#ORD-005', customer: 'Hari Bahadur', amount: 1340, status: 'Processing', date: '2024-06-13' },
  ]
};

// Mock revenue data for charts
const mockRevenueByCategory = [
  { category: 'Grains', revenue: 85000, percentage: 30, color: '#3B82F6' },
  { category: 'Dairy', revenue: 72000, percentage: 25, color: '#10B981' },
  { category: 'Vegetables', revenue: 65000, percentage: 23, color: '#F59E0B' },
  { category: 'Fruits', revenue: 45000, percentage: 16, color: '#EF4444' },
  { category: 'Others', revenue: 17750, percentage: 6, color: '#8B5CF6' },
];

const mockRevenueByMonth = [
  { month: 'Jan', revenue: 18500 },
  { month: 'Feb', revenue: 22100 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 24500 },
  { month: 'May', revenue: 26700 },
  { month: 'Jun', revenue: 28475 },
];

// Mock yearly growth data
const mockYearlyGrowth = [
  { year: '2019', revenue: 125000, orders: 450, customers: 280 },
  { year: '2020', revenue: 145000, orders: 520, customers: 320 },
  { year: '2021', revenue: 168000, orders: 610, customers: 380 },
  { year: '2022', revenue: 195000, orders: 720, customers: 450 },
  { year: '2023', revenue: 225000, orders: 850, customers: 520 },
  { year: '2024', revenue: 284750, orders: 1247, customers: 892 },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return 'bg-green-100 text-green-800';
    case 'Shipped': return 'bg-blue-100 text-blue-800';
    case 'Processing': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

function AdminAnalytics() {
  const [pieChartAnimated, setPieChartAnimated] = useState(false);
  const [barChartAnimated, setBarChartAnimated] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer1 = setTimeout(() => setPieChartAnimated(true), 100);
    const timer2 = setTimeout(() => setBarChartAnimated(true), 300);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive overview of your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analyticsData.totalRevenue)}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{analyticsData.revenueGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.totalOrders)}</div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{analyticsData.orderGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.totalCustomers)}</div>
            <div className="flex items-center text-xs text-purple-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{analyticsData.customerGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analyticsData.averageOrderValue)}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <Activity className="h-3 w-3 mr-1" />
              Per order average
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts */}
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
                      <div className="text-2xl font-bold text-gray-700">{formatCurrency(analyticsData.totalRevenue)}</div>
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
                {mockRevenueByMonth.map((month, index) => {
                  // Use a fixed range of 2000 for better visibility and taller bars
                  const minRevenue = Math.min(...mockRevenueByMonth.map(m => m.revenue));
                  const barHeight = ((month.revenue - minRevenue) / 2000) * 90 + 10; // 10% minimum, 90% range
                  
                  return (
                    <div key={month.month} className="flex-1 flex flex-col items-center group">
                      <div className="relative w-full h-full flex items-end">
                        <div
                          className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t transition-all duration-1000 ease-out hover:from-purple-600 hover:to-purple-400 cursor-pointer"
                          style={{
                            height: barChartAnimated ? `${barHeight}%` : '0%',
                            transitionDelay: `${index * 100}ms`,
                            minHeight: '8px'
                          }}
                          title={`${month.month}: ${formatCurrency(month.revenue)}`}
                        />
                        {/* Hover tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                          {formatCurrency(month.revenue)}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600 text-center">
                        {month.month}
                      </div>
                      <div className="text-xs font-medium text-gray-700">
                        {formatCurrency(month.revenue)}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Chart summary */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Total:</span> {formatCurrency(mockRevenueByMonth.reduce((sum, month) => sum + month.revenue, 0))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Average:</span> {formatCurrency(Math.round(mockRevenueByMonth.reduce((sum, month) => sum + month.revenue, 0) / mockRevenueByMonth.length))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Yearly Growth Line Graph */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Yearly Growth Trends</span>
          </CardTitle>
          <CardDescription>Business growth over the past 6 years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Line Graph Container */}
            <div className="relative h-80 w-full">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border-r border-gray-100"></div>
                ))}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border-b border-gray-100"></div>
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                <span>₹300K</span>
                <span>₹225K</span>
                <span>₹150K</span>
                <span>₹75K</span>
                <span>₹0</span>
              </div>

              {/* Revenue Line */}
              <svg className="absolute inset-0 w-full h-full" style={{ paddingLeft: '40px' }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                {/* Revenue area fill */}
                <path
                  d={mockYearlyGrowth.map((point, index) => {
                    const x = (index / (mockYearlyGrowth.length - 1)) * 100;
                    const y = 100 - (point.revenue / 300000) * 100;
                    return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                  }).join(' ') + ' L 100% 100% L 0% 100% Z'}
                  fill="url(#revenueGradient)"
                  className="transition-all duration-1000 ease-out"
                  style={{
                    opacity: barChartAnimated ? 1 : 0,
                    transform: barChartAnimated ? 'scaleY(1)' : 'scaleY(0)',
                  }}
                />
                
                {/* Individual line segments with different colors based on growth */}
                {mockYearlyGrowth.slice(0, -1).map((point, index) => {
                  const nextPoint = mockYearlyGrowth[index + 1];
                  const currentRevenue = point.revenue;
                  const nextRevenue = nextPoint.revenue;
                  const growth = nextRevenue - currentRevenue;
                  
                  // Determine line color based on growth
                  let lineColor = '#10B981'; // green for growth (default)
                  if (growth === 0) {
                    lineColor = '#374151'; // black for no change
                  } else if (growth < 0) {
                    lineColor = '#EF4444'; // red for decline
                  }
                  
                  const x1 = (index / (mockYearlyGrowth.length - 1)) * 100;
                  const y1 = 100 - (currentRevenue / 300000) * 100;
                  const x2 = ((index + 1) / (mockYearlyGrowth.length - 1)) * 100;
                  const y2 = 100 - (nextRevenue / 300000) * 100;
                  
                  return (
                    <line
                      key={index}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke={lineColor}
                      strokeWidth="3"
                      className="transition-all duration-1000 ease-out"
                      style={{
                        opacity: barChartAnimated ? 1 : 0,
                        strokeDasharray: barChartAnimated ? 'none' : '1000',
                        strokeDashoffset: barChartAnimated ? 0 : 1000,
                        transitionDelay: `${index * 200}ms`
                      }}
                    />
                  );
                })}
                
                {/* Data points */}
                {mockYearlyGrowth.map((point, index) => {
                  const x = (index / (mockYearlyGrowth.length - 1)) * 100;
                  const y = 100 - (point.revenue / 300000) * 100;
                  
                  // Determine point color based on growth from previous year
                  let pointColor = '#10B981'; // green for growth (default)
                  if (index > 0) {
                    const previousRevenue = mockYearlyGrowth[index - 1].revenue;
                    const growth = point.revenue - previousRevenue;
                    if (growth === 0) {
                      pointColor = '#374151'; // black for no change
                    } else if (growth < 0) {
                      pointColor = '#EF4444'; // red for decline
                    }
                  }
                  
                  return (
                    <g key={index}>
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="6"
                        fill={pointColor}
                        className="transition-all duration-200 cursor-pointer hover:r-8"
                        style={{
                          opacity: barChartAnimated ? 1 : 0,
                          transform: barChartAnimated ? 'scale(1)' : 'scale(0)',
                          transitionDelay: `${index * 200}ms`
                        }}
                        onMouseEnter={() => setHoveredPoint(index)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      {/* Tooltip */}
                      {hoveredPoint === index && (
                        <g>
                          {/* Year text */}
                          <text
                            x={`${x}%`}
                            y={`${y - 10}%`}
                            fill="#000000"
                            fontSize="12"
                            fontWeight="bold"
                            textAnchor="middle"
                            className="transition-all duration-200"
                            style={{
                              transform: 'translateX(-60px) translateY(-70px)',
                            }}
                          >
                            {point.year}
                          </text>
                          {/* Revenue text */}
                          <text
                            x={`${x}%`}
                            y={`${y + 5}%`}
                            fill="#000000"
                            fontSize="11"
                            textAnchor="middle"
                            className="transition-all duration-200"
                            style={{
                              transform: 'translateX(-60px) translateY(-70px)',
                            }}
                          >
                            Revenue: {formatCurrency(point.revenue)}
                          </text>
                          {/* Growth indicator */}
                          {index > 0 && (
                            <text
                              x={`${x}%`}
                              y={`${y + 20}%`}
                              fill="#000000"
                              fontSize="10"
                              textAnchor="middle"
                              className="transition-all duration-200"
                              style={{
                                transform: 'translateX(-60px) translateY(-70px)',
                              }}
                            >
                              {(() => {
                                const previousRevenue = mockYearlyGrowth[index - 1].revenue;
                                const growth = point.revenue - previousRevenue;
                                const growthPercent = ((growth / previousRevenue) * 100).toFixed(1);
                                if (growth > 0) return `+${growthPercent}%`;
                                if (growth < 0) return `${growthPercent}%`;
                                return '0%';
                              })()}
                            </text>
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500" style={{ paddingLeft: '40px' }}>
                {mockYearlyGrowth.map((point) => (
                  <span key={point.year}>{point.year}</span>
                ))}
              </div>
            </div>

            {/* Metrics below the graph */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(mockYearlyGrowth[mockYearlyGrowth.length - 1].revenue)}
                </div>
                <div className="text-sm text-gray-600">Total Revenue (2024)</div>
                <div className="text-xs text-green-600 mt-1">
                  +{Math.round(((mockYearlyGrowth[mockYearlyGrowth.length - 1].revenue - mockYearlyGrowth[mockYearlyGrowth.length - 2].revenue) / mockYearlyGrowth[mockYearlyGrowth.length - 2].revenue) * 100)}% from 2023
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {mockYearlyGrowth[mockYearlyGrowth.length - 1].orders}
                </div>
                <div className="text-sm text-gray-600">Total Orders (2024)</div>
                <div className="text-xs text-blue-600 mt-1">
                  +{Math.round(((mockYearlyGrowth[mockYearlyGrowth.length - 1].orders - mockYearlyGrowth[mockYearlyGrowth.length - 2].orders) / mockYearlyGrowth[mockYearlyGrowth.length - 2].orders) * 100)}% from 2023
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {mockYearlyGrowth[mockYearlyGrowth.length - 1].customers}
                </div>
                <div className="text-sm text-gray-600">Total Customers (2024)</div>
                <div className="text-xs text-purple-600 mt-1">
                  +{Math.round(((mockYearlyGrowth[mockYearlyGrowth.length - 1].customers - mockYearlyGrowth[mockYearlyGrowth.length - 2].customers) / mockYearlyGrowth[mockYearlyGrowth.length - 2].customers) * 100)}% from 2023
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Segments and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Customer Segments</span>
            </CardTitle>
            <CardDescription>Distribution of customer types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.customerSegments.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-3 h-3 rounded-full ${
                        segment.segment === 'New Customers' ? 'bg-blue-500' :
                        segment.segment === 'Returning Customers' ? 'bg-green-500' : 'bg-purple-500'
                      }`} />
                    <span className="text-sm font-medium">{segment.segment}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {segment.count} ({segment.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best selling products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.sales} units sold</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {formatCurrency(product.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{order.id}</div>
                      <div className="text-xs text-gray-500">{order.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatCurrency(order.amount)}</div>
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue per Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Lasti Warehouse</span>
                  <span className="text-sm font-medium">{formatCurrency(85000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Dhairing Center</span>
                  <span className="text-sm font-medium">{formatCurrency(72000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ghahakhet Facility</span>
                  <span className="text-sm font-medium">{formatCurrency(65000)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Delivered</span>
                  <span className="text-sm font-medium">892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Processing</span>
                  <span className="text-sm font-medium">245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipped</span>
                  <span className="text-sm font-medium">110</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { isAuthenticated, isAdmin, isCustomer } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Redirect customers to customer dashboard
  useEffect(() => {
    if (isAuthenticated && isCustomer) {
      router.push('/customer-dashboard');
    }
  }, [isAuthenticated, isCustomer, router]);

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Show admin analytics for admin users
  if (isAdmin) {
    return (
      <div className="min-h-screen">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <AdminAnalytics />
        </main>
        <Footer />
      </div>
    );
  }

  return null; // Will redirect customers to customer dashboard
}