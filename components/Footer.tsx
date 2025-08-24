import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Twitter, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  location?: string;
}

export function Footer({ location = 'Croatia' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Featured',
      links: [
        { href: '/air-force-1', label: 'Air Force 1' },
        { href: '/huarache', label: 'Huarache' },
        { href: '/air-max-90', label: 'Air Max 90' },
        { href: '/air-max-95', label: 'Air Max 95' },
      ],
    },
    {
      title: 'Shoes',
      links: [
        { href: '/all-shoes', label: 'All Shoes' },
        { href: '/custom-shoes', label: 'Custom Shoes' },
        { href: '/jordan-shoes', label: 'Jordan Shoes' },
        { href: '/running-shoes', label: 'Running Shoes' },
      ],
    },
    {
      title: 'Clothing',
      links: [
        { href: '/all-clothing', label: 'All Clothing' },
        { href: '/modest-wear', label: 'Modest Wear' },
        { href: '/hoodies-pullovers', label: 'Hoodies & Pullovers' },
        { href: '/shirts-tops', label: 'Shirts & Tops' },
      ],
    },
    {
      title: "Kids'",
      links: [
        { href: '/infant-toddler-shoes', label: 'Infant & Toddler Shoes' },
        { href: '/kids-shoes', label: "Kids' Shoes" },
        { href: '/kids-jordan-shoes', label: "Kids' Jordan Shoes" },
        { href: '/kids-basketball-shoes', label: "Kids' Basketball Shoes" },
      ],
    },
  ];

  const policyLinks = [
    { href: '/guides', label: 'Guides' },
    { href: '/terms-of-sale', label: 'Terms of Sale' },
    { href: '/terms-of-use', label: 'Terms of Use' },
    { href: '/privacy-policy', label: 'Nike Privacy Policy' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Nike Logo */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              {/* Nike Swoosh Logo */}
              <svg
                className="h-12 w-12 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="Nike Logo"
              >
                <path d="M21.5 4.5c-1.5-1.5-3.5-2.5-5.5-2.5s-4 1-5.5 2.5L9 7l-2-2.5C5.5 3 3.5 2 1.5 2S-1 3.5-1 5.5s1 4 2.5 5.5L3 12l2.5 2.5c1.5 1.5 3.5 2.5 5.5 2.5s4-1 5.5-2.5L15 12l2.5-2.5c1.5-1.5 2.5-3.5 2.5-5.5s-1-4-2.5-5.5z" />
              </svg>
            </Link>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media Icons */}
          <div className="lg:col-span-1 flex flex-col items-start lg:items-end">
            <h3 className="text-lg font-semibold text-white mb-4 lg:hidden">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 p-0"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 p-0"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 p-0"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Location and Copyright */}
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <MapPin className="h-4 w-4" />
              <span>
                {location} © {currentYear} Nike, Inc. All Rights Reserved
              </span>
            </div>

            {/* Policy Links */}
            <div className="flex flex-wrap gap-6">
              {policyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
