export interface Service {
  id: string;
  name: string;
  price: number;
  priceMax?: number;
  category: 'acrylic' | 'gel' | 'pedicure' | 'maintenance' | 'decor' | 'extras';
  style?: 'plain' | 'french' | 'ombre' | 'marble' | 'hand-painted' | '3d-art';
  length?: 'overlay' | 'short' | 'medium' | 'long';
  description: string;
  image?: string;
}

export const services: Service[] = [
  // Acrylic Nails
  {
    id: 'acrylic-plain-overlay',
    name: 'Plain Acrylic Overlay (No Tips)',
    price: 230,
    category: 'acrylic',
    style: 'plain',
    length: 'overlay',
    description: 'Classic acrylic overlay for natural nail reinforcement without tips.',
  },
  {
    id: 'acrylic-plain-short',
    name: 'Plain Short Acrylic',
    price: 250,
    category: 'acrylic',
    style: 'plain',
    length: 'short',
    description: 'Elegant short acrylic nails with a clean, polished finish.',
  },
  {
    id: 'acrylic-plain-medium',
    name: 'Plain Medium Acrylic',
    price: 280,
    category: 'acrylic',
    style: 'plain',
    length: 'medium',
    description: 'Versatile medium-length acrylic nails perfect for any occasion.',
  },
  {
    id: 'acrylic-plain-long',
    name: 'Plain Long Acrylic',
    price: 300,
    category: 'acrylic',
    style: 'plain',
    length: 'long',
    description: 'Glamorous long acrylic nails for a bold statement.',
  },
  {
    id: 'acrylic-french-overlay',
    name: 'French Acrylic Overlay (No Tips)',
    price: 270,
    category: 'acrylic',
    style: 'french',
    length: 'overlay',
    description: 'Timeless French tip style on natural nails.',
  },
  {
    id: 'acrylic-french-short',
    name: 'French Short Acrylic',
    price: 280,
    category: 'acrylic',
    style: 'french',
    length: 'short',
    description: 'Classic French manicure on short acrylic extensions.',
  },
  {
    id: 'acrylic-french-medium',
    name: 'French Medium Acrylic',
    price: 300,
    category: 'acrylic',
    style: 'french',
    length: 'medium',
    description: 'Sophisticated French tips on medium-length acrylics.',
  },
  {
    id: 'acrylic-french-long',
    name: 'French Long Acrylic',
    price: 330,
    category: 'acrylic',
    style: 'french',
    length: 'long',
    description: 'Stunning long French acrylic nails for maximum elegance.',
  },
  {
    id: 'acrylic-minimal-art',
    name: 'Acrylic with Minimal Art',
    price: 300,
    priceMax: 400,
    category: 'acrylic',
    style: 'hand-painted',
    description: 'Acrylic nails featuring subtle, tasteful nail art designs.',
  },
  {
    id: 'acrylic-complex-art',
    name: 'Acrylic with Complex Art',
    price: 400,
    priceMax: 500,
    category: 'acrylic',
    style: '3d-art',
    description: 'Intricate and detailed nail art on acrylic extensions.',
  },

  // Gel Nails
  {
    id: 'gel-plain-overlay',
    name: 'Plain Gel Overlay (No Tips)',
    price: 200,
    category: 'gel',
    style: 'plain',
    length: 'overlay',
    description: 'Glossy gel overlay for natural nail protection and shine.',
  },
  {
    id: 'gel-french-overlay',
    name: 'French Gel Overlay (No Tips)',
    price: 250,
    category: 'gel',
    style: 'french',
    length: 'overlay',
    description: 'Elegant French style gel overlay on natural nails.',
  },

  // Pedicure
  {
    id: 'pedi-plain-gel',
    name: 'Plain Gel Pedicure',
    price: 280,
    category: 'pedicure',
    style: 'plain',
    description: 'Luxurious gel pedicure for pampered, beautiful feet.',
  },
  {
    id: 'pedi-acrylic-no-tips',
    name: 'Acrylic Pedicure (No Tips)',
    price: 220,
    category: 'pedicure',
    style: 'plain',
    length: 'overlay',
    description: 'Durable acrylic pedicure overlay without extensions.',
  },
  {
    id: 'pedi-plain-acrylic',
    name: 'Plain Acrylic Pedicure',
    price: 250,
    category: 'pedicure',
    style: 'plain',
    description: 'Classic acrylic pedicure for long-lasting results.',
  },
  {
    id: 'pedi-french-gel',
    name: 'French Gel Pedicure',
    price: 250,
    category: 'pedicure',
    style: 'french',
    description: 'Sophisticated French tip gel pedicure.',
  },
  {
    id: 'pedi-french-acrylic',
    name: 'French Acrylic Pedicure',
    price: 280,
    category: 'pedicure',
    style: 'french',
    description: 'Elegant French acrylic pedicure for beautiful toes.',
  },

  // Maintenance
  {
    id: 'maint-acrylic-refill',
    name: 'Acrylic Refill',
    price: 150,
    priceMax: 200,
    category: 'maintenance',
    style: 'plain',
    description: 'Regular maintenance refill to keep your acrylics flawless.',
  },
  {
    id: 'maint-french-refill',
    name: 'French Refill',
    price: 200,
    category: 'maintenance',
    style: 'french',
    description: 'Maintenance refill for French tip acrylic nails.',
  },
  {
    id: 'maint-plain-acrylic-refill',
    name: 'Plain Acrylic Refill',
    price: 250,
    category: 'maintenance',
    style: 'plain',
    description: 'Full acrylic refill service with plain finish.',
  },
  {
    id: 'maint-french-acrylic-refill',
    name: 'French Acrylic Refill',
    price: 250,
    category: 'maintenance',
    style: 'french',
    description: 'Complete French acrylic refill service.',
  },
  {
    id: 'maint-refill-design',
    name: 'Refill with Design',
    price: 300,
    priceMax: 350,
    category: 'maintenance',
    style: 'hand-painted',
    description: 'Refill service including beautiful nail art designs.',
  },
  {
    id: 'maint-buff-shine',
    name: 'Buff & Shine',
    price: 120,
    category: 'maintenance',
    description: 'Quick buff and shine to refresh your existing nails.',
  },
  {
    id: 'maint-nail-repair',
    name: 'Nail Repair',
    price: 80,
    category: 'maintenance',
    description: 'Professional repair for broken or damaged nails.',
  },
  {
    id: 'maint-soak-gel',
    name: 'Soak Off (Gel Removal)',
    price: 50,
    category: 'maintenance',
    description: 'Gentle gel nail removal process.',
  },
  {
    id: 'maint-soak-acrylic',
    name: 'Soak Off (Acrylic Removal)',
    price: 60,
    category: 'maintenance',
    description: 'Safe acrylic nail removal service.',
  },

  // Decor / Add-Ons
  {
    id: 'decor-3d-flower',
    name: '3D Flower',
    price: 30,
    category: 'decor',
    style: '3d-art',
    description: 'Beautiful 3D flower accent for your nails.',
  },
  {
    id: 'decor-hand-painted',
    name: 'Hand Painted Art',
    price: 20,
    category: 'decor',
    style: 'hand-painted',
    description: 'Custom hand-painted nail art design.',
  },
  {
    id: 'decor-basic-art',
    name: 'Basic Art',
    price: 15,
    category: 'decor',
    description: 'Simple nail art accents and details.',
  },
  {
    id: 'decor-ombre-french-marble',
    name: 'Ombre / French / Marble',
    price: 15,
    category: 'decor',
    style: 'ombre',
    description: 'Trendy ombre, French fade, or marble effect.',
  },

  // Extras
  {
    id: 'extra-nail-clean',
    name: 'Nail Clean',
    price: 50,
    category: 'extras',
    description: 'Professional nail cleaning and preparation.',
  },
  {
    id: 'extra-soft-glam',
    name: 'Soft Glam',
    price: 500,
    category: 'extras',
    description: 'Complete soft glam nail transformation.',
  },
  {
    id: 'extra-full-glam',
    name: 'Full Glam',
    price: 550,
    category: 'extras',
    description: 'Ultimate full glam nail experience with all the extras.',
  },
];

export const categories = [
  { value: 'acrylic', label: 'Acrylic Nails' },
  { value: 'gel', label: 'Gel Nails' },
  { value: 'pedicure', label: 'Pedicure' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'decor', label: 'Decor / Add-Ons' },
  { value: 'extras', label: 'Extras' },
];

export const styles = [
  { value: 'plain', label: 'Plain' },
  { value: 'french', label: 'French' },
  { value: 'ombre', label: 'Ombre' },
  { value: 'marble', label: 'Marble' },
  { value: 'hand-painted', label: 'Hand Painted' },
  { value: '3d-art', label: '3D Art' },
];

export const lengths = [
  { value: 'overlay', label: 'Overlay / No Tips' },
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
];

export const priceRanges = [
  { value: '0-150', label: 'R0 – R150', min: 0, max: 150 },
  { value: '150-250', label: 'R150 – R250', min: 150, max: 250 },
  { value: '250-350', label: 'R250 – R350', min: 250, max: 350 },
  { value: '350-plus', label: 'R350+', min: 350, max: Infinity },
];

export const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
];
