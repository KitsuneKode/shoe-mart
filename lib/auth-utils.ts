import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentUser, isAuthenticated } from './auth/actions';

// Cookie configuration constants
export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
} as const;

// Guest session cookie configuration
export const GUEST_COOKIE_CONFIG = {
  ...COOKIE_CONFIG,
  name: 'guest_session',
} as const;

// Auth session cookie configuration
export const AUTH_COOKIE_CONFIG = {
  ...COOKIE_CONFIG,
  name: 'auth_session',
} as const;

/**
 * Get the current user from the session
 * Returns null if not authenticated
 */
export async function getUser() {
  try {
    return await getCurrentUser();
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Check if the current user is authenticated
 */
export async function checkAuth() {
  try {
    return await isAuthenticated();
  } catch (error) {
    console.error('Error checking auth:', error);
    return false;
  }
}

/**
 * Require authentication for a route
 * Redirects to sign-in if not authenticated
 */
export async function requireAuth(redirectTo: string = '/sign-in') {
  const user = await getUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

/**
 * Get guest session token from cookies
 */
export function getGuestSessionToken(): string | null {
  return cookies().get('guest_session')?.value || null;
}

/**
 * Set guest session cookie
 */
export function setGuestSessionCookie(token: string) {
  const expiresAt = new Date(Date.now() + COOKIE_CONFIG.maxAge * 1000);

  cookies().set('guest_session', token, {
    ...COOKIE_CONFIG,
    expires: expiresAt,
  });
}

/**
 * Clear guest session cookie
 */
export function clearGuestSessionCookie() {
  cookies().delete('guest_session');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(): string {
  return crypto.randomUUID();
}

/**
 * Check if a route requires authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = ['/checkout', '/account', '/orders', '/profile'];
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Check if a route is public (no auth required)
 */
export function isPublicRoute(pathname: string): boolean {
  const publicRoutes = [
    '/',
    '/products',
    '/categories',
    '/cart',
    '/sign-in',
    '/sign-up',
  ];
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );
}

/**
 * Get redirect URL after authentication
 */
export function getRedirectUrl(searchParams: URLSearchParams): string {
  return searchParams.get('redirect') || '/';
}

/**
 * Format authentication error messages
 */
export function formatAuthError(error: string): string {
  const errorMap: Record<string, string> = {
    'Invalid credentials': 'Invalid email or password',
    'User not found': 'No account found with this email',
    'User already exists': 'An account with this email already exists',
    'Password too short': 'Password must be at least 8 characters',
    'Invalid email': 'Please enter a valid email address',
  };

  return errorMap[error] || error;
}
