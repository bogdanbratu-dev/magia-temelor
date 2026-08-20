export interface SeoContent {
  title: string;
  description: string;
  keywords: string;
  ogImageUrl: string;
}

export interface BrandContent {
  name: string;
  tagline: string;
  logoUrl: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  highlightWord: string;
  subheadline: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  imageUrl: string;
  stats: { value: string; label: string }[];
}

export interface AboutHighlight {
  id: string;
  icon: string;
  title: string;
  text: string;
}

export interface AboutContent {
  title: string;
  text: string;
  imageUrl: string;
  highlights: AboutHighlight[];
}

export interface ProgramContent {
  title: string;
  description: string;
  ageGroups: string;
  days: string;
  pickupTime: string;
  endTime: string;
  extraNote: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  highlighted: boolean;
  features: string[];
}

export interface PricingContent {
  title: string;
  description: string;
  note: string;
  tiers: PricingTier[];
}

export interface Activity {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ActivitiesContent {
  title: string;
  description: string;
  items: Activity[];
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface GalleryContent {
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface TestimonialsContent {
  title: string;
  description: string;
  items: Testimonial[];
}

export interface ContactContent {
  title: string;
  description: string;
  address: string;
  addressNote: string;
  phone: string;
  email: string;
  contactPerson: string;
  facebookUrl: string;
  instagramUrl: string;
  mapEmbedUrl: string;
}

export interface FooterContent {
  text: string;
}

export interface SiteContent {
  seo: SeoContent;
  brand: BrandContent;
  hero: HeroContent;
  about: AboutContent;
  program: ProgramContent;
  pricing: PricingContent;
  activities: ActivitiesContent;
  gallery: GalleryContent;
  testimonials: TestimonialsContent;
  contact: ContactContent;
  footer: FooterContent;
}
