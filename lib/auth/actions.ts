'use server';

import { z } from 'zod';
import { auth } from '../auth';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Password } from 'better-auth';

const prisma = new PrismaClient();

// Validation schemas
const emailSchema = z.email();
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be within 128 characters');
const nameSchema = z.string().min(2).max(100);

const signUpSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Guest session management
export async function createGuestSession() {
  try {
    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const guest = await prisma.guest.create({
      data: {
        sessionToken,
        expiresAt,
      },
    });

    // Set guest session cookie
    cookies().set('guest_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: expiresAt,
    });

    return { success: true, guest };
  } catch (error) {
    console.error('Error creating guest session:', error);
    return { success: false, error: 'Failed to create guest session' };
  }
}

export async function getGuestSession() {
  try {
    const guestSessionToken = cookies().get('guest_session')?.value;

    if (!guestSessionToken) {
      return null;
    }

    const guest = await prisma.guest.findUnique({
      where: { sessionToken: guestSessionToken },
    });

    if (!guest || guest.expiresAt < new Date()) {
      // Remove expired cookie
      cookies().delete('guest_session');
      return null;
    }

    return guest;
  } catch (error) {
    console.error('Error getting guest session:', error);
    return null;
  }
}

export async function clearGuestSession() {
  try {
    const guestSessionToken = cookies().get('guest_session')?.value;

    if (guestSessionToken) {
      // Remove from database
      await prisma.guest.deleteMany({
        where: { sessionToken: guestSessionToken },
      });

      // Remove cookie
      cookies().delete('guest_session');
    }

    return { success: true };
  } catch (error) {
    console.error('Error clearing guest session:', error);
    return { success: false, error: 'Failed to clear guest session' };
  }
}

// Authentication actions
export async function signUp(formData: FormData) {
  try {
    const validatedFields = signUpSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
    });

    if (!validatedFields.success) {
      return { success: false, error: validatedFields.error };
    }

    const { email, password, name } = validatedFields.data;

    // Check if user already exists
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    await mergeGuestCartWithUserCart(result.user.id);

    // Clear guest session
    await clearGuestSession();

    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error during sign up:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function signIn(formData: FormData) {
  try {
    const validatedFields = signInSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return { success: false, error: 'Invalid input data' };
    }

    const { email, password } = validatedFields.data;

    // Sign in with Better Auth
    const result = await auth.api.signInEmail({
      body: { email, password },
    });

    // Merge guest cart if exists
    await mergeGuestCartWithUserCart(result.user.id);

    // Clear guest session
    await clearGuestSession();

    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error during sign in:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function signOut() {
  try {
    // Sign out with Better Auth
    await auth.signOut();

    // Also clear guest session if exists
    await clearGuestSession();

    return { success: true };
  } catch (error) {
    console.error('Error during sign out:', error);
    return { success: false, error: 'Failed to sign out' };
  }
}

// Cart merging functionality
export async function mergeGuestCartWithUserCart(userId: string) {
  try {
    const guestSessionToken = cookies().get('guest_session')?.value;

    if (!guestSessionToken) {
      return { success: true, message: 'No guest cart to merge' };
    }

    // Here you would implement the logic to merge guest cart items with user cart
    // This is a placeholder for the actual cart merging logic
    // You'll need to implement this based on your cart system

    // Example structure:
    // 1. Get guest cart items from guest session
    // 2. Get or create user cart
    // 3. Merge items, handling duplicates
    // 4. Clear guest cart data

    console.log(`Merging guest cart for user ${userId}`);

    return { success: true, message: 'Guest cart merged successfully' };
  } catch (error) {
    console.error('Error merging guest cart:', error);
    return { success: false, error: 'Failed to merge guest cart' };
  }
}

// Utility function to get current user
export async function getCurrentUser() {
  try {
    const session = await auth.getSession();
    return session?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Utility function to check if user is authenticated
export async function isAuthenticated() {
  try {
    const session = await auth.getSession();
    return !!session?.user;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

// Redirect to sign in if not authenticated (for checkout flow)
export async function requireAuth(redirectTo: string = '/sign-in') {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect(redirectTo);
  }

  return true;
}
