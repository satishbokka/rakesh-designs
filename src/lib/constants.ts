export interface PortfolioItem {
  id: string;
  title: string;
  category: 'branding' | 'posters' | 'flex' | 'social' | 'editing' | 'frames';
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
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface TrustPoint {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const STUDIO_INFO = {
  name: 'Rakesh Designs',
  tagline: 'Creative ideas. Crafted to stand out.',
  subTagline: 'Graphic design, photo editing and visual experiences created with precision and creativity.',
  instagramHandle: '@rakesh_designs_03',
  instagramUrl: 'https://instagram.com/rakesh_designs_03',
  behanceUrl: 'https://www.behance.net/rakeshmangam',
  phone: '89780 15826',
  whatsappNumber: '918978015826',
  whatsappUrl: 'https://wa.me/918978015826?text=Hi%20Rakesh%20Designs,%20I%27m%20interested%20in%20getting%20a%20design.%20I%27d%20like%20to%20discuss%20my%20requirements.',
  location: 'Amalapuram, Andhra Pradesh',
  email: 'hello@rakeshdesigns.in',
};

export const SERVICES: ServiceCategory[] = [
  {
    id: 'graphic-design',
    number: '01',
    title: 'Graphic Design',
    subtitle: 'Posters, Flex Designs & Promotional Visuals',
    description: 'Posters, flex designs, banners, promotional materials and creative visuals created with precision and impact.',
    iconName: 'Printer',
    deliverables: ['Event Posters', 'Flex & Vinyl Banners', 'Promotional Collateral', 'Print-Ready Vector Files'],
  },
  {
    id: 'photo-editing',
    number: '02',
    title: 'Photo Editing',
    subtitle: 'Retouching, Color Enhancement & Restoration',
    description: 'Professional retouching, enhancement, restoration and creative editing to bring out the finest detail in any photograph.',
    iconName: 'Wand2',
    deliverables: ['Skin & Portrait Retouching', 'Color Grading & Enhancement', 'Background Composite', 'Vintage Restoration'],
  },
  {
    id: 'custom-frames',
    number: '03',
    title: 'Custom Frames',
    subtitle: 'Personalized Photo Frames & Wall Art',
    description: 'Personalized photo frames for weddings, birthdays, family moments and special occasions crafted to preserve memories.',
    iconName: 'Frame',
    deliverables: ['Canvas Photo Frames', 'Gift Collage Frames', 'Digital Portrait Prints', 'High-Res Print Masters'],
  },
  {
    id: 'branding-social',
    number: '04',
    title: 'Branding & Social Media',
    subtitle: 'Logos, CDPs & Social Creatives',
    description: 'Logos, promotional graphics, social media creatives and visual identity materials designed to command digital feeds.',
    iconName: 'Sparkles',
    deliverables: ['Logo & Brand Identity', 'Custom Display Pictures (CDPs)', 'Social Media Creatives', 'Campaign Identity Sets'],
  },
];

export const WHY_US_POINTS: TrustPoint[] = [
  {
    id: 'creative-thinking',
    number: '01',
    title: 'Creative Thinking',
    description: 'Every project starts with an idea and becomes a unique visual tailored to your goals.',
  },
  {
    id: 'custom-design',
    number: '02',
    title: 'Custom Design',
    description: 'Designs are created around the client\'s needs rather than relying on generic templates.',
  },
  {
    id: 'attention-detail',
    number: '03',
    title: 'Attention to Detail',
    description: 'Every element is carefully refined before delivery to ensure print and digital perfection.',
  },
  {
    id: 'direct-collaboration',
    number: '04',
    title: 'Direct Collaboration',
    description: 'Simple communication from concept to final design with fast, direct feedback.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discuss',
    description: 'Understand the client\'s requirements and project goals.',
  },
  {
    step: '02',
    title: 'Create',
    description: 'Develop the visual concept and design direction.',
  },
  {
    step: '03',
    title: 'Refine',
    description: 'Review and improve the design until it exceeds expectations.',
  },
  {
    step: '04',
    title: 'Deliver',
    description: 'Provide the final design ready to use for print or digital.',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'item-1',
    title: 'Royal Celebration CDP & Digital Poster',
    category: 'social',
    categoryLabel: 'Social Media',
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
    categoryLabel: 'Custom Frames',
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
    category: 'editing',
    categoryLabel: 'Photo Editing',
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
    category: 'flex',
    categoryLabel: 'Flex & Banners',
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
    category: 'posters',
    categoryLabel: 'Posters',
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
    category: 'branding',
    categoryLabel: 'Branding',
    image: '/assets/logo.png',
    aspectRatio: 'aspect-[1/1]',
    description: 'Official studio emblem representing precision graphics and quality design.',
    year: '2024',
    client: 'Internal Brand',
    deliverables: ['Brand Emblem', 'Vector Assets', 'Watermark Pack'],
    featured: false,
  },
];
