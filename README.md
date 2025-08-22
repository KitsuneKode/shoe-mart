# Footwear Website

A modern Next.js e-commerce website for footwear built with TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, and Zustand.

## Features

- 🛍️ **Product Catalog**: Display footwear products from Nike and Adidas
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- 🗄️ **Database**: PostgreSQL with Prisma ORM
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Fast Performance**: Built with Next.js 15 and Turbopack
- 🎯 **Type Safety**: Full TypeScript support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL
- **ORM**: Prisma
- **State Management**: Zustand
- **Package Manager**: Bun
- **Language**: TypeScript

## Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (local or remote)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd footwear-website
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/footwear_db"
BETTER_AUTH_SECRET="your-super-secret-key-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Important Notes:**
- Replace `username:password` with your actual PostgreSQL credentials
- Generate a secure random string for `BETTER_AUTH_SECRET` (you can use `openssl rand -base64 32`)
- Update URLs for production deployment

### 4. Set up the database

1. Make sure PostgreSQL is running locally
2. Create a database named `footwear_db`

### 5. Run database migrations

```bash
bunx prisma migrate dev --name init
```

### 6. Seed the database

```bash
bun run db:seed
```

### 7. Start the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Database Schema

The application uses a `Product` model with the following fields:

- `id`: Unique identifier
- `name`: Product name
- `brand`: Brand name (Nike, Adidas, etc.)
- `description`: Product description
- `price`: Product price
- `imageUrl`: Product image URL
- `category`: Product category (Running, Basketball, Lifestyle)
- `sizes`: Available sizes array
- `colors`: Available colors array
- `inStock`: Stock availability
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Project Structure

```
footwear-website/
├── app/
│   ├── api/
│   │   └── products/
│   │       └── route.ts          # API endpoint for products
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── ProductCard.tsx           # Product display component
├── lib/
│   ├── store.ts                  # Zustand store
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeder
└── public/                       # Static assets
```

## Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun run db:seed` - Seed the database with sample data

## API Endpoints

- `GET /api/products` - Fetch all products

## Customization

### Adding New Products

1. Edit `prisma/seed.ts` to add new products
2. Run `bun run db:seed` to update the database

### Styling

The project uses Tailwind CSS with shadcn/ui components. You can customize the design by:

1. Modifying `app/globals.css` for global styles
2. Updating component styles in `components/ui/`
3. Adding new shadcn/ui components with `bunx shadcn@latest add <component-name>`

## Deployment

The application can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

1. Build the application: `bun build`
2. Set up environment variables in your deployment platform
3. Deploy the built application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
