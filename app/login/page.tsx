'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Store } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      // Check for stored role from signup, otherwise determine from email
      const storedRole = localStorage.getItem('userRole');
      let isAdmin = false;
      let userRole: 'admin' | 'customer' = 'customer';
      
      // Specific admin credentials
      const isSpecificAdmin = data.email === 'avilashisudarshan@gmail.com' && data.password === 'TaraDevi@#123';
      
      if (storedRole) {
        // Use the role chosen during signup
        userRole = storedRole as 'admin' | 'customer';
        isAdmin = userRole === 'admin';
        
        // Check if user is trying to access admin role without proper credentials
        if (isAdmin && !isSpecificAdmin) {
          setIsLoading(false);
          toast.error('Unauthorized role. Please choose your role as a customer.');
          return;
        }
        
        // Clear the stored role after using it
        localStorage.removeItem('userRole');
      } else {
        // For existing users, only allow admin access with specific credentials
        if (data.email.includes('admin') || data.email.includes('manager')) {
          if (!isSpecificAdmin) {
            setIsLoading(false);
            toast.error('Unauthorized role. Please choose your role as a customer.');
            return;
          }
          isAdmin = true;
          userRole = 'admin';
        } else {
          isAdmin = false;
          userRole = 'customer';
        }
      }
      
      // Create mock user data based on email
      const userData = {
        id: '1',
        name: data.email.split('@')[0].replace(/[0-9]/g, '').replace(/[^a-zA-Z]/g, ' ') || 'User',
        email: data.email,
        role: userRole,
      };
      
      login(userData);
      setIsLoading(false);
      const roleText = isAdmin ? 'Admin' : 'Customer';
      const userName = userData.name;
      toast.success(`Welcome back, ${roleText} ${userName}!`);
      
      // Role-based routing: customers go to home page, admins go to admin dashboard
      if (isAdmin) {
        router.push('/'); // Admin goes to admin home page
      } else {
        router.push('/'); // Customer goes to home page
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <Store className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your Sulav Kirana Stores account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className={errors.password ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-green-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
          <Link href="/" className="text-sm text-gray-500 hover:underline">
            ← Back to store
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}