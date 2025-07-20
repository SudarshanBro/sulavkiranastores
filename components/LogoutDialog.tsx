'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth-context';
import { AlertTriangle } from 'lucide-react';

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Simulate logout process
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
      onOpenChange(false);
      router.push('/');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <DialogTitle>Logout Confirmation</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to logout? You'll need to sign in again to access your account and dashboard.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">After logging out:</p>
              <ul className="space-y-1 text-xs">
                <li>• You'll be redirected to the home page</li>
                <li>• You'll need to sign in again to access your dashboard</li>
                <li>• If you don't have an account, you can sign up for free</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoggingOut}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 