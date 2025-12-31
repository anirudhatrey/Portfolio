/**
 * Profile types for personalized experience
 */
export type ProfileType = 'recruiter' | 'business' | 'collaborator' | 'explorer';

export interface ProfileConfig {
  type: ProfileType;
  color: string; // Hex color for profile-specific theming
  tagline: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
}

/**
 * Project/Case Study types
 */
export type ProjectTier = 'featured' | 'notable' | 'additional';
export type ProjectIndustry = 'entertainment' | 'education' | 'government' | 'nonprofit' | 'productivity';

export interface ProjectTech {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'devops' | 'other';
}

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tier: ProjectTier;
  industry: ProjectIndustry;
  role: string;
  duration: string;
  year: number;
  techStack: ProjectTech[];
  features: string[];
  metrics: ProjectMetric[];
  challenges?: string[];
  learnings?: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
}

/**
 * Testimonial types
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  date: string;
  quote: string;
  highlightQuote: string;
  linkedinUrl?: string;
  avatarUrl?: string;
}

/**
 * Navigation types
 */
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

/**
 * Section types for scroll tracking
 */
export type SectionId = 'hero' | 'about' | 'work' | 'skills' | 'testimonials' | 'contact';

export interface Section {
  id: SectionId;
  label: string;
}

