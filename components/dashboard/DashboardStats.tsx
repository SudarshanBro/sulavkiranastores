import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign,
  AlertTriangle 
} from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: 'Rs. 1,24,560',
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
    description: 'From last month'
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    changeType: 'positive',
    icon: ShoppingCart,
    description: 'Orders this month'
  },
  {
    title: 'Products',
    value: '156',
    change: '+5',
    changeType: 'positive',
    icon: Package,
    description: 'Active products'
  },
  {
    title: 'Customers',
    value: '432',
    change: '+23',
    changeType: 'positive',
    icon: Users,
    description: 'Registered customers'
  },
  {
    title: 'Low Stock Items',
    value: '12',
    change: '-3',
    changeType: 'negative',
    icon: AlertTriangle,
    description: 'Need restocking'
  },
  {
    title: 'Growth Rate',
    value: '15.2%',
    change: '+2.1%',
    changeType: 'positive',
    icon: TrendingUp,
    description: 'Monthly growth'
  }
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <IconComponent className={`h-4 w-4 ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-orange-600'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-orange-600'
                }>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}