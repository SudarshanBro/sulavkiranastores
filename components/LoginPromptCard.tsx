'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ShoppingBag, UserPlus, LogIn } from 'lucide-react';

interface LoginPromptCardProps {
  onClose: () => void;
}

export default function LoginPromptCard({ onClose }: LoginPromptCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Delay the appearance to create a flash effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <Card className={`w-full max-w-md mx-4 transform transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Welcome to Sulav Kirana!</CardTitle>
              <CardDescription>
                Sign in or create an account to start shopping
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <ShoppingBag className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Why sign up?</p>
                <ul className="space-y-1 text-xs">
                  <li>• Browse and buy products</li>
                  <li>• Track your orders</li>
                  <li>• Get exclusive offers</li>
                  <li>• Save your preferences</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleSignIn}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button 
              onClick={handleSignUp}
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 