import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.product.deleteMany();

  // Seed Nike products
  const nikeProducts = [
    {
      name: 'Air Max 270',
      brand: 'Nike',
      description:
        "The Nike Air Max 270 delivers unrivaled, all-day comfort. The shoe's design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colors.",
      price: 150.0,
      imageUrl:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      category: 'Running',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Black', 'White', 'Red'],
      inStock: true,
    },
    {
      name: 'Air Jordan 1 Retro High',
      brand: 'Nike',
      description:
        'The Air Jordan 1 Retro High features a classic design with premium leather construction and the iconic Air-Sole unit for lightweight cushioning.',
      price: 170.0,
      imageUrl:
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
      category: 'Basketball',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Black/Red', 'White/Black', 'Blue'],
      inStock: true,
    },
    {
      name: 'Zoom Fly 5',
      brand: 'Nike',
      description:
        'The Nike Zoom Fly 5 is designed for speed and comfort during your daily runs. Features a responsive foam midsole and breathable mesh upper.',
      price: 160.0,
      imageUrl:
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
      category: 'Running',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Gray', 'Blue', 'Green'],
      inStock: true,
    },
  ];

  // Seed Adidas products
  const adidasProducts = [
    {
      name: 'Ultraboost 22',
      brand: 'Adidas',
      description:
        'The adidas Ultraboost 22 features responsive Boost midsole technology and a Primeknit+ upper for a sock-like fit that adapts to your foot.',
      price: 190.0,
      imageUrl:
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
      category: 'Running',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Black', 'White', 'Blue'],
      inStock: true,
    },
    {
      name: 'Stan Smith',
      brand: 'Adidas',
      description:
        'The iconic adidas Stan Smith tennis shoe features a clean, minimalist design with premium leather upper and signature perforated 3-Stripes.',
      price: 100.0,
      imageUrl:
        'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400',
      category: 'Lifestyle',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['White/Green', 'White/Blue', 'Black'],
      inStock: true,
    },
    {
      name: 'NMD R1',
      brand: 'Adidas',
      description:
        'The adidas NMD R1 combines retro running style with modern Boost cushioning technology for ultimate comfort and style.',
      price: 130.0,
      imageUrl:
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
      category: 'Lifestyle',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Black/Red', 'Gray', 'Blue'],
      inStock: true,
    },
  ];

  // Insert all products
  for (const product of [...nikeProducts, ...adidasProducts]) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Database seeded with footwear products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
