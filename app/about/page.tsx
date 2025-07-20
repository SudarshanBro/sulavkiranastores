import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Store, Users, MapPin, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Store className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Sulav Kirana Stores</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted neighborhood store in Dhairing, serving the community with quality products and excellent service since our establishment.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Sulav Kirana Stores has been a cornerstone of the Dhairing community, providing essential goods and groceries to local families. Founded with a vision to serve our neighbors with quality products at fair prices, we have grown to become a trusted name in the area.
              </p>
              <p>
                Under the dedicated leadership of Shiva Acharya and Tara Devi Acharya, our store has evolved from a small local shop to a comprehensive grocery destination, now bringing our services online to better serve our community.
              </p>
              <p>
                We believe in building lasting relationships with our customers, understanding their needs, and providing personalized service that you can't find in larger retail chains.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">Our Location</h3>
                </div>
                <p className="text-gray-600">
                  8J33+J8J, Dhairing Banau Trail<br />
                   33400, Jaljala<br />
                  Parbat, Nepal
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">Our Owners</h3>
                </div>
                <p className="text-gray-600">
                  Shiva Acharya<br />
                  Tara Devi Acharya
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
                <p className="text-gray-600">
                  We carefully select and source high-quality products to ensure our customers get the best value for their money.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community Focus</h3>
                <p className="text-gray-600">
                  We are deeply rooted in our community and committed to supporting local families and businesses.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Store className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Personal Service</h3>
                <p className="text-gray-600">
                  Every customer is important to us. We provide personalized service and build lasting relationships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide our community with easy access to quality groceries and daily essentials, while maintaining the personal touch and trust that comes with local business ownership.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the most trusted and convenient shopping destination in Dhairing, bridging traditional store values with modern convenience through our online platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}