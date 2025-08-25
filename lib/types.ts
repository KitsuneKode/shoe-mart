import { User as BetterAuthUser } from 'better-auth';

// Extended user type with our custom fields
export interface User extends BetterAuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Account type for OAuth and credentials
export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;

  // Custom fields
  accountId: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Session type
export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;

  // Custom fields
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Guest session type
export interface Guest {
  id: string;
  sessionToken: string;
  createdAt: Date;
  expiresAt: Date;
}

// Verification token type
export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

// Authentication action results
export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  message?: string;
}

// Guest session result
export interface GuestSessionResult {
  success: boolean;
  guest?: Guest;
  error?: string;
}

// Form data types
export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Cart merging result
export interface CartMergeResult {
  success: boolean;
  message?: string;
  error?: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
