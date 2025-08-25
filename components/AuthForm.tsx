'use client';

import { useState } from 'react';
import { signUp, signIn } from '@/lib/auth/actions';
import { Button } from '@/components/ui/button';
import { SocialProviders } from '@/components/SocialProviders';
import { Loader2, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      if (mode === 'signup' && name) {
        formData.append('name', name);
      }

      let result;
      if (mode === 'signup') {
        result = await signUp(formData);
      } else {
        result = await signIn(formData);
      }

      if (result.success) {
        // Redirect to the intended page or home
        const redirectTo = searchParams.get('redirect') || '/';
        router.push(redirectTo);
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in
    console.log('Google sign-in clicked');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple sign-in
    console.log('Apple sign-in clicked');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {mode === 'signin' ? 'Welcome back!' : 'Join Nike Today!'}
        </h1>
        <p className="text-gray-600">
          {mode === 'signin'
            ? 'Please enter your details to sign in your account'
            : 'Create your account to start your fitness journey'}
        </p>
      </div>

      {/* Social Providers */}
      <SocialProviders
        onGoogleSignIn={handleGoogleSignIn}
        onAppleSignIn={handleAppleSignIn}
        loading={loading}
      />

      {/* Separator */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or {mode === 'signin' ? 'sign in' : 'sign up'} with
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="johndoe@gmail.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="minimum 8 characters"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
            </>
          ) : (
            `${mode === 'signin' ? 'Sign In' : 'Sign Up'}`
          )}
        </Button>
      </form>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        {mode === 'signin' ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="/sign-up"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </a>
            </p>
            <a
              href="/forgot-password"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Forgot password?
            </a>
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/sign-in"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </a>
          </p>
        )}
      </div>

      {/* Terms */}
      {mode === 'signup' && (
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="/terms" className="text-gray-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-gray-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
