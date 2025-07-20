import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Package, Truck, CheckCircle } from 'lucide-react';

const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Ram Sharma',
    date: '2024-01-15',
    total: 1250,
    status: 'pending',
    items: 5
  },
  {
    id: 'ORD-002',
    customer: 'Sita Devi',
    date: '2024-01-15',
    total: 890,
    status: 'processing',
    items: 3
  },
  {
    id: 'ORD-003',
    customer: 'Hari Bahadur',
    date: '2024-01-14',
    total: 2100,
    status: 'completed',
    items: 8
  },
  {
    id: 'ORD-004',
    customer: 'Maya Gurung',
    date: '2024-01-14',
    total: 650,
    status: 'cancelled',
    items: 2
  },
  {
    id: 'ORD-005',
    customer: 'Krishna Thapa',
    date: '2024-01-13',
    total: 1800,
    status: 'completed',
    items: 6
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Package className="h-4 w-4" />;
    case 'processing':
      return <Truck className="h-4 w-4" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'secondary';
    case 'processing':
      return 'default';
    case 'completed':
      return 'default';
    case 'cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function OrderManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          Manage and track customer orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Items</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.items} items</td>
                  <td className="p-3 font-semibold">Rs. {order.total.toLocaleString()}</td>
                  <td className="p-3">
                    <Badge 
                      variant={getStatusColor(order.status)}
                      className="flex items-center space-x-1 w-fit"
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}