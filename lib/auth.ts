import { User, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { config } from './config';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // PostgreSQL
  }),
  emailAndPassword: {
    enabled: true,
    // socialProviders: {
    //   github: {
    //     clientId: process.env.GITHUB_CLIENT_ID as string,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    //   },
    // },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    onUserCreated: async (user: User) => {
      console.log('New user created:', user.email);
    },
  },
  // Add public app URL configuration
});
