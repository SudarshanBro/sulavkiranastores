'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { useAuth } from '@/lib/auth-context';
import LogoutDialog from '@/components/LogoutDialog';
import { 
  Store, 
  Tag, 
  Package, 
  ShoppingCart, 
  User, 
  Menu, 
  LogOut, 
  LayoutDashboard,
  TrendingUp,
  Settings,
  Bell
} from 'lucide-react';

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const adminNavigation = [
    { name: 'Business', href: '/', icon: Store },
    { name: 'Offers', href: '/offers', icon: Tag },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Inventory', href: '/inventory', icon: ShoppingCart },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'System', href: '/dashboard', icon: LayoutDashboard },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-green-600" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">Sulav Kirana</span>
                <span className="text-xs text-gray-500 -mt-1">Admin Panel</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {adminNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={
                      `flex items-center space-x-2 text-sm font-medium transition-colors ` +
                      (pathname === item.href
                        ? 'text-green-600 font-bold'
                        : 'text-gray-700 hover:text-green-600')
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-medium">
                        {getUserInitials(user?.name || 'Admin')}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push('/login')}>
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/signup')}>
                      Sign Up
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-8">
                    {adminNavigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={
                            `flex items-center space-x-2 text-lg font-medium transition-colors ` +
                            (pathname === item.href
                              ? 'text-green-600 font-bold'
                              : 'text-gray-700 hover:text-green-600')
                          }
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                    <div className="pt-4 border-t">
                      {isAuthenticated ? (
                        <>
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              setShowLogoutDialog(true);
                            }}
                            className="block text-lg font-medium text-gray-700 hover:text-green-600 transition-colors"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-gray-700 hover:text-green-600 transition-colors mb-2"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/signup"
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-gray-700 hover:text-green-600 transition-colors"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Dialog */}
      <LogoutDialog 
        open={showLogoutDialog} 
        onOpenChange={setShowLogoutDialog} 
      />
    </>
  );
} 