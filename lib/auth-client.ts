import { createAuthClient } from 'better-auth/react';
import { config } from './config';

export const authClient = createAuthClient({
  baseURL: config.app.url,
});

// Export specific methods for easier use
export const { signIn, signUp, signOut, useSession } = authClient;
