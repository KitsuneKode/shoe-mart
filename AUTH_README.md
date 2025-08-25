# Authentication System Documentation

## Overview

This document describes the robust authentication system built for the Nike-style e-commerce application using Better Auth, Next.js App Router, and PostgreSQL with Prisma ORM.

## Architecture

### Technology Stack
- **Backend**: Next.js 15 with App Router
- **Authentication**: Better Auth v1.3.7
- **Database**: PostgreSQL with Prisma ORM
- **Session Management**: Cookie-based sessions (both authenticated and guest)
- **Validation**: Zod for input validation
- **Type Safety**: TypeScript throughout

### Core Components

#### 1. Database Schema (`prisma/schema.prisma`)

**User Table**
```sql
model User {
  id            String   @id @default(uuid())
  name          String?
  email         String   @unique
  emailVerified Boolean  @default(false)
  image         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  accounts Account[]
  sessions Session[]

  @@map("users")
}
```

**Session Table**
```sql
model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Custom fields
  expiresAt DateTime
  token     String @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt()
  ipAddress String?
  userAgent String?

  @@map("sessions")
}
```

**Account Table**
```sql
model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Custom fields
  accountId             String
  providerId            String
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  password              String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt()

  @@unique([provider, providerAccountId])
  @@map("accounts")
}
```

**Guest Table**
```sql
model Guest {
  id            String   @id @default(uuid())
  sessionToken  String   @unique
  createdAt     DateTime @default(now())
  expiresAt     DateTime

  @@map("guests")
}
```

#### 2. Authentication Actions (`lib/auth/actions.ts`)

**Core Functions:**
- `signUp(formData: FormData)` - User registration
- `signIn(formData: FormData)` - User login
- `signOut()` - User logout
- `createGuestSession()` - Create guest session
- `getGuestSession()` - Retrieve guest session
- `clearGuestSession()` - Remove guest session
- `mergeGuestCartWithUserCart(userId: string)` - Merge guest cart with user cart

**Utility Functions:**
- `getCurrentUser()` - Get authenticated user
- `isAuthenticated()` - Check authentication status
- `requireAuth(redirectTo?)` - Require auth with redirect

#### 3. Better Auth Configuration (`lib/auth.ts`)

```typescript
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    strategy: 'database',
  },
  callbacks: {
    onUserCreated: async (user) => {
      // Create account record for credentials
    },
    onSessionCreated: async (session) => {
      // Update session with custom fields
    },
  },
});
```

#### 4. Middleware (`middleware.ts`)

- Automatically creates guest sessions for new visitors
- Protects checkout routes requiring authentication
- Handles redirects for unauthenticated users

#### 5. Utility Functions (`lib/auth-utils.ts`)

- Cookie configuration constants
- Input validation and sanitization
- Route protection helpers
- Error formatting

## Session Management

### Cookie Configuration

**Guest Session Cookie (`guest_session`)**
- `HttpOnly`: true
- `Secure`: true (production only)
- `SameSite`: strict
- `Path`: /
- `Expires`: 7 days

**Auth Session Cookie (`auth_session`)**
- Managed by Better Auth
- Same security settings as guest session

### Guest-to-User Migration

1. User browses as guest (creates `guest_session`)
2. User adds items to cart (stored with guest session)
3. User signs up/logs in
4. System merges guest cart with user cart
5. Guest session is cleared
6. User continues with authenticated session

## Security Features

### Input Validation
- **Zod schemas** for all form inputs
- **Email validation** with regex patterns
- **Password strength** requirements (8+ chars, uppercase, lowercase, number)
- **Input sanitization** to prevent XSS

### Session Security
- **UUID-based** session tokens
- **HttpOnly cookies** prevent XSS attacks
- **Secure cookies** in production
- **SameSite=strict** prevents CSRF attacks
- **Automatic expiration** after 7 days

### Database Security
- **UUID primary keys** for all tables
- **Foreign key constraints** with cascade deletes
- **Unique constraints** on critical fields
- **Timestamps** for audit trails

## Usage Examples

### Protected Routes

```typescript
// In a page component
import { requireAuth } from '@/lib/auth-utils';

export default async function CheckoutPage() {
  const user = await requireAuth('/sign-in');
  
  return (
    <div>
      <h1>Checkout for {user.name}</h1>
      {/* Checkout form */}
    </div>
  );
}
```

### Authentication Forms

```typescript
// In a sign-up form
import { signUp } from '@/lib/auth/actions';

export default function SignUpForm() {
  async function handleSubmit(formData: FormData) {
    const result = await signUp(formData);
    
    if (result.success) {
      // Redirect to dashboard or checkout
      redirect('/dashboard');
    } else {
      // Handle error
      setError(result.error);
    }
  }

  return (
    <form action={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Guest Session Management

```typescript
import { createGuestSession, getGuestSession } from '@/lib/auth/actions';

// Create guest session
const { success, guest } = await createGuestSession();

// Get current guest session
const guestSession = await getGuestSession();
```

## Environment Variables

```bash
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/footwear_db"
BETTER_AUTH_SECRET="your-super-secret-key-here"

# Optional
NEXT_PUBLIC_APP_URL="http://localhost:3000"
BETTER_AUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

## Database Migrations

The system includes several migrations to set up the authentication schema:

1. **Initial setup** - Basic tables
2. **Auth tables** - User, session, account tables
3. **Schema fixes** - Corrections and improvements
4. **Guest support** - Guest session management
5. **Final schema** - Complete Better Auth compliance

## Future Enhancements

### OAuth Providers
```typescript
socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
}
```

### Two-Factor Authentication
- Add `twoFactorEnabled` field to User table
- Implement TOTP or SMS verification
- Add backup codes support

### Role-Based Access Control
- Add `role` field to User table
- Implement permission system
- Admin panel access control

### Email Verification
- Enable `emailVerified` workflow
- Send verification emails
- Handle verification tokens

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check `DATABASE_URL` in `.env`
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Authentication Failures**
   - Check `BETTER_AUTH_SECRET` is set
   - Verify cookie settings
   - Check browser console for errors

3. **Migration Issues**
   - Reset database: `bunx prisma migrate reset`
   - Check schema compatibility
   - Verify Prisma client generation

### Debug Mode

Enable debug logging in development:

```typescript
// In lib/auth.ts
export const auth = betterAuth({
  // ... other config
  debug: process.env.NODE_ENV === 'development',
});
```

## Testing

### Unit Tests
```bash
# Test authentication actions
bun test lib/auth/actions.test.ts

# Test utility functions
bun test lib/auth-utils.test.ts
```

### Integration Tests
```bash
# Test database operations
bun test prisma/schema.test.ts

# Test API endpoints
bun test app/api/auth/route.test.ts
```

## Performance Considerations

- **Database indexes** on frequently queried fields
- **Session cleanup** for expired sessions
- **Guest session pruning** for old records
- **Connection pooling** for database connections

## Monitoring

### Logging
- User registration events
- Authentication failures
- Session creation/destruction
- Guest session management

### Metrics
- Active user sessions
- Guest session count
- Authentication success rate
- Cart merge success rate

## Conclusion

This authentication system provides a robust, secure, and scalable foundation for the e-commerce application. It follows industry best practices and is designed to handle both authenticated users and guest visitors seamlessly.

The modular architecture makes it easy to extend with additional features like OAuth providers, two-factor authentication, and role-based access control in the future.
