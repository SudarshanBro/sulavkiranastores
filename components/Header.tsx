'use client';

import { useState, useRef } from 'react';
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
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import LogoutDialog from '@/components/LogoutDialog';
import { Store, ShoppingCart, User, Menu, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { mockProducts } from '@/lib/mock-data';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { items } = useCart();
  const { user, isAuthenticated, isAdmin, isCustomer } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  // Get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Groceries', href: '/groceries' },
    { name: 'Discounts', href: '/discounts' },
    ...(isAdmin ? [{ name: 'Analytics', href: '/analytics' }] : []),
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      setSuggestions(
        mockProducts.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSelect = (product) => {
    setShowSearch(false);
    setSearchTerm('');
    setSuggestions([]);
    router.push(`/groceries#product-${product.id}`);
  };

  const handleSearchSubmit = () => {
    if (suggestions.length > 0) {
      handleSearchSelect(suggestions[0]);
    } else {
      setShowSearch(false);
      setSearchTerm('');
      setSuggestions([]);
      router.push('/groceries');
    }
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
                <span className="text-xs text-gray-500 -mt-1">Stores</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    `text-sm font-medium transition-colors ` +
                    (pathname === item.href
                      ? 'text-green-600 font-bold'
                      : 'text-gray-700 hover:text-green-600')
                  }
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => { setShowSearch((v) => !v); setTimeout(() => searchInputRef.current?.focus(), 100); }}>
                  <Search className="h-4 w-4" />
                </Button>
                {showSearch && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50 p-4">
                    <div className="flex items-center border rounded px-2">
                      <input
                        ref={searchInputRef}
                        type="text"
                        className="flex-1 outline-none py-2 px-2 text-sm"
                        placeholder="Search groceries..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={e => { if (e.key === 'Enter') handleSearchSubmit(); }}
                      />
                      <Button variant="ghost" size="icon" onClick={handleSearchSubmit}>
                        <Search className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                    {suggestions.length > 0 && (
                      <ul className="mt-2 max-h-40 overflow-y-auto">
                        {suggestions.map((product) => (
                          <li
                            key={product.id}
                            className="px-2 py-1 cursor-pointer hover:bg-green-50 rounded"
                            onClick={() => handleSearchSelect(product)}
                          >
                            {product.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemsCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-medium">
                        {getUserInitials(user?.name || 'User')}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => router.push(isAdmin ? '/dashboard' : '/customer-dashboard')}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                    </DropdownMenuItem>
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
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={
                          `text-lg font-medium transition-colors ` +
                          (pathname === item.href
                            ? 'text-green-600 font-bold'
                            : 'text-gray-700 hover:text-green-600')
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="pt-4 border-t">
                      {isAuthenticated ? (
                        <>
                          <Link
                            href={isAdmin ? '/dashboard' : '/customer-dashboard'}
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-gray-700 hover:text-green-600 transition-colors mb-2"
                          >
                            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                          </Link>
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