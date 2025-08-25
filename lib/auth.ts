import { User, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';
import { nextCookies } from 'better-auth/next-js';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.NODE_ENV === 'production',
  },
  socialProviders: {
    //   google: {
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // },
  },
  session: {
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      expiresIn: 60 * 60 * 24 * 7, // 7 days
    },
  },

  cookies: {
    session: {
      name: 'auth_session',
      options: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      },
    },
  },

  advanced: {
    database: {
      generateId: () => uuidv7(),
    },
  },
  callbacks: {
    onUserCreated: async (user: User) => {
      console.log('New user created:', user.email);
    },
  },
  plugins: [nextCookies()],
});
