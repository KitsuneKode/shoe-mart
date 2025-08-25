'use client';

import { Button } from '@/components/ui/button';
import { Chrome, Apple } from 'lucide-react';

interface SocialProvidersProps {
  onGoogleSignIn?: () => void;
  onAppleSignIn?: () => void;
  loading?: boolean;
}

export function SocialProviders({
  onGoogleSignIn,
  onAppleSignIn,
  loading = false,
}: SocialProvidersProps) {
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full h-12 text-base font-medium border-gray-300 hover:bg-gray-50 transition-colors"
        onClick={onGoogleSignIn}
        disabled={loading}
      >
        <Chrome className="w-5 h-5 mr-3 text-red-500" />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 text-base font-medium border-gray-300 hover:bg-gray-50 transition-colors"
        onClick={onAppleSignIn}
        disabled={loading}
      >
        <Apple className="w-5 h-5 mr-3 text-black" />
        Continue with Apple
      </Button>
    </div>
  );
}
