'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Store, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const [currentFacebookLink, setCurrentFacebookLink] = useState(0);
  
  const facebookLinks = [
    'https://www.facebook.com/taradevi.acharya.94',
    'https://www.facebook.com/shiva.acharya.1420354'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFacebookLink((prev) => (prev + 1) % facebookLinks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFacebookClick = () => {
    window.open(facebookLinks[currentFacebookLink], '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Store className="h-8 w-8 text-green-400" />
              <div>
                <div className="font-bold text-lg">Sulav Kirana</div>
                <div className="text-sm text-gray-400">Stores</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted neighborhood store in Dhairing, serving quality products with care.
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                onClick={handleFacebookClick}
                title={`Facebook - ${facebookLinks[currentFacebookLink]}`}
                aria-label="Open Facebook"
              >
                <Facebook className="h-5 w-5 cursor-pointer" />
              </button>
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/groceries" className="text-gray-400 hover:text-white transition-colors">
                  Groceries
                </Link>
              </li>
              <li>
                <Link href="/discounts" className="text-gray-400 hover:text-white transition-colors">
                  Discounts
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-green-400 mt-1" />
                <span className="text-gray-400 text-sm">
                  8J33+J8J, Banau Trail<br />
                  Dhairing 33400, Nepal
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <div className="text-gray-400 text-sm">
                  <div>+977-985-763-0003</div>
                  <div>+977-984-762-0003</div>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-400 text-sm">
                  shivaacharya2027@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Payment Methods</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">eS</span>
                </div>
                <span className="text-gray-400 text-sm">eSewa</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-6 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">K</span>
                </div>
                <span className="text-gray-400 text-sm">Khalti</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">FP</span>
                </div>
                <span className="text-gray-400 text-sm">Fonepay</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-6 bg-orange-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">COD</span>
                </div>
                <span className="text-gray-400 text-sm">Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
          Owned by Shiva Acharya & Tara Devi Acharya.</p>

        
              
      
          
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
          ©2025 | ThinkNew.tech | All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
}