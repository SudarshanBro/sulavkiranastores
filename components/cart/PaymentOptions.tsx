'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentOptionsProps {
  selectedPayment: string;
  onPaymentSelect: (payment: string) => void;
}

const paymentMethods = [
  {
    id: 'esewa',
    name: 'eSewa',
    description: 'Pay with eSewa digital wallet',
    icon: 'eS',
    color: 'bg-green-600',
  },
  {
    id: 'khalti',
    name: 'Khalti',
    description: 'Pay with Khalti digital wallet',
    icon: 'K',
    color: 'bg-purple-600',
  },
  {
    id: 'fonepay',
    name: 'Fonepay',
    description: 'Pay with Fonepay',
    icon: 'FP',
    color: 'bg-blue-600',
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: 'COD',
    color: 'bg-orange-600',
  },
];

export default function PaymentOptions({ selectedPayment, onPaymentSelect }: PaymentOptionsProps) {
  return (
    <RadioGroup value={selectedPayment} onValueChange={onPaymentSelect}>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedPayment === method.id 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200'
            }`}
            onClick={() => onPaymentSelect(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={method.id} id={method.id} />
                
                <div className={`w-10 h-8 ${method.color} rounded flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white">
                    {method.icon}
                  </span>
                </div>
                
                <div className="flex-1">
                  <Label 
                    htmlFor={method.id} 
                    className="font-medium cursor-pointer"
                  >
                    {method.name}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {method.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </RadioGroup>
  );
}