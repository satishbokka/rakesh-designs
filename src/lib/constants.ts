export interface PortfolioItem {
  id: string;
  title: string;
  category: 'print' | 'frames' | 'social' | 'retouching';
  categoryLabel: string;
  image: string;
  aspectRatio: string;
  description: string;
  year: string;
  client: string;
  deliverables: string[];
  featured?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  deliverables: string[];
  idealFor: string;
  highlightTag: string;
}

export const STUDIO_INFO = {
  name: 'Rakesh Designs',
  tagline: 'Graphic Design That Makes Your Photos & Brand Look Premium',
  subTagline: 'Custom photo frames, flex banners, posters, and social media designs — crafted with precision and delivered print-ready, every time.',
  instagramHandle: '@rakesh_designs_03',
  instagramUrl: 'https://instagram.com/rakesh_designs_03',
  behanceUrl: 'https://www.behance.net/rakeshmangam',
  phone: '89780 15826',
  whatsappNumber: '918978015826',
  whatsappUrl: 'https://wa.me/918978015826?text=Hi%20Rakesh%20Designs,%20I%20would%20like%20to%20inquire%20about%20a%20new%20project.',
  location: 'Amalapuram, Andhra Pradesh',
  email: 'hello@rakeshdesigns.in',
  yearsExperience: '5+',
  projectsCompleted: '500+',
  satisfactionRate: '99.4%',
};

export const SERVICES: ServiceCategory[] = [
  {
    id: 'flex-banner',
    title: 'Flex & Outdoor Banner Design',
    subtitle: 'Flex Banners, Hoardings & Print Collateral',
    description: 'High-visibility flex banners, hoardings, event backdrops, and shop front signs designed for maximum contrast and sharp print output.',
    iconName: 'Printer',
    deliverables: ['Flex & Vinyl Banners', 'Event Backdrops & Hoardings', 'Standees & Shop Boards', 'Print-Ready Files'],
    idealFor: 'Businesses, shops, event hosts, and local campaigns.',
    highlightTag: 'Print Ready HD',
  },
  {
    id: 'custom-frames',
    title: 'Custom Photo Frames',
    subtitle: 'Canvas Prints, Gift Frames & Wall Displays',
    description: 'Beautiful custom photo framing and canvas print layouts for family photos, birthday gifts, anniversary keepsakes, and wall decor.',
    iconName: 'Frame',
    deliverables: ['Canvas Photo Frames', 'Gift Collage Frames', 'Digital Portrait Edits', 'High-Res Print Files'],
    idealFor: 'Birthdays, weddings, anniversaries, and home decor.',
    highlightTag: 'Premium Wall Art',
  },
  {
    id: 'social-posters',
    title: 'Social Media Posters & CDPs',
    subtitle: 'Custom Display Pictures & Event Sheets',
    description: 'Eye-catching Custom Display Pictures (CDPs), festival posters, birthday wish banners, and social graphics ready for WhatsApp and Instagram.',
    iconName: 'Sparkles',
    deliverables: ['Custom Display Pictures (CDPs)', 'Birthday & Tribute Sheets', 'Social Media Posters', 'HD WhatsApp Banners'],
    idealFor: 'Events, birthday wishes, social media posts, and campaigns.',
    highlightTag: 'Viral Designs',
  },
  {
    id: 'photo-retouching',
    title: 'Photo Retouching & Color Correction',
    subtitle: 'Photo Enhancement & Damage Restoration',
    description: 'Professional color grading, skin tone retouching, background removal, and old photo restoration to bring out the best in your pictures.',
    iconName: 'Wand2',
    deliverables: ['Color Correction & Grading', 'Skin & Portrait Retouching', 'Old Photo Restoration', 'Background Removal'],
    idealFor: 'Photographers, portrait edits, and old memory restoration.',
    highlightTag: 'High-Key Retouch',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'item-1',
    title: 'Royal Celebration CDP & Digital Poster',
    category: 'social',
    categoryLabel: 'Social Poster & CDP',
    image: '/assets/Photo1.jpeg',
    aspectRatio: 'aspect-[3/4]',
    description: 'Custom birthday tribute poster design featuring bold typography and clean photo integration.',
    year: '2024',
    client: 'Client Showcase',
    deliverables: ['Custom Display Picture', 'HD Print Sheet', 'Instagram Story Format'],
    featured: true,
  },
  {
    id: 'item-2',
    title: 'Custom Photo Frame Art & Restoration',
    category: 'frames',
    categoryLabel: 'Custom Photo Frame',
    image: '/assets/photo2.jpeg',
    aspectRatio: 'aspect-[4/5]',
    description: 'Bespoke photo enhancement and frame layout crafted for family keepsake display.',
    year: '2024',
    client: 'Private Client',
    deliverables: ['High-Res Image Master', 'Wood Frame Layout', 'Color Correction'],
    featured: true,
  },
  {
    id: 'item-3',
    title: 'Portrait Color Correction & Retouch',
    category: 'retouching',
    categoryLabel: 'Photo Retouching',
    image: '/assets/photo3.jpeg',
    aspectRatio: 'aspect-[1/1]',
    description: 'Professional skin retouching, ambient lighting enhancement, and color grading.',
    year: '2024',
    client: 'Studio Retouching',
    deliverables: ['High-Key Color Grade', 'Skin Enhancement', 'Background Composite'],
    featured: true,
  },
  {
    id: 'item-4',
    title: 'Outdoor Flex Banner & Event Backdrop',
    category: 'print',
    categoryLabel: 'Flex & Banner Design',
    image: '/assets/photo4.jpeg',
    aspectRatio: 'aspect-[16/9]',
    description: 'Large format outdoor flex banner layout engineered with sharp contrast and clear readable text.',
    year: '2024',
    client: 'Regional Event Organizer',
    deliverables: ['Outdoor Flex Graphic (12x8 ft)', 'HD Vector Print File', 'Social Banner'],
    featured: true,
  },
  {
    id: 'item-5',
    title: 'Festival Greeting & Campaign Poster',
    category: 'social',
    categoryLabel: 'Social Poster',
    image: '/assets/photo5.jpeg',
    aspectRatio: 'aspect-[4/5]',
    description: 'Custom festive greeting poster with clear typography and vibrant colors.',
    year: '2024',
    client: 'Public Campaign',
    deliverables: ['WhatsApp Poster', 'Print Ready Graphic', 'Social Media Asset'],
    featured: true,
  },
  {
    id: 'item-6',
    title: 'Rakesh Designs Studio Emblem & Identity',
    category: 'print',
    categoryLabel: 'Studio Identity',
    image: '/assets/logo.png',
    aspectRatio: 'aspect-[1/1]',
    description: 'Official studio emblem representing precision graphics and quality design.',
    year: '2024',
    client: 'Internal Brand',
    deliverables: ['Brand Emblem', 'Vector Assets', 'Watermark Pack'],
    featured: false,
  },
];
