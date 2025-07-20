import { Card, CardContent } from '@/components/ui/card';
import { 
  Truck, 
  Shield, 
  Clock, 
  Heart, 
  Award, 
  Users 
} from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick delivery to your doorstep within Dhairing area'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Fresh products with guaranteed quality and authenticity'
  },
  {
    icon: Clock,
    title: 'Convenient Hours',
    description: 'Open 6 AM to 9 PM daily for your convenience'
  },
  {
    icon: Heart,
    title: 'Family Owned',
    description: 'Personal care and attention from the Acharya family'
  },
  {
    icon: Award,
    title: 'Trusted Since Years',
    description: 'Building trust in the community with reliable service'
  },
  {
    icon: Users,
    title: 'Local Community',
    description: 'Supporting and serving our neighbors in Dhairing'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sulav Kirana?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're more than just a store - we're your trusted neighborhood partner
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <IconComponent className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}