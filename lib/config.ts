export const config = {
  app: {
    name: 'Footwear Store',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  auth: {
    secret: process.env.BETTER_AUTH_SECRET!,
    url: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
} as const;
