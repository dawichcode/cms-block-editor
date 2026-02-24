// SEO Types and Interfaces

export interface SEOMetadata {
  // Basic Meta Tags
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  robots?: string;
  
  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'blog' | 'product';
  ogSiteName?: string;
  ogLocale?: string;
  
  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  
  // Article Specific
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
  
  // Schema.org Structured Data
  schema?: SchemaType[];
}

export type SchemaType = 
  | ArticleSchema 
  | BreadcrumbSchema 
  | OrganizationSchema 
  | PersonSchema
  | ProductSchema
  | FAQSchema
  | HowToSchema;

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle';
  headline: string;
  description?: string;
  image?: string | string[];
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage?: string;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  contactPoint?: Array<{
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
  }>;
  sameAs?: string[];
}

export interface PersonSchema {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: {
    '@type': 'Organization';
    name: string;
  };
  sameAs?: string[];
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  image?: string | string[];
  description?: string;
  brand?: {
    '@type': 'Brand';
    name: string;
  };
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description?: string;
  image?: string | string[];
  totalTime?: string;
  step: Array<{
    '@type': 'HowToStep';
    name: string;
    text: string;
    image?: string;
  }>;
}

export interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
  metrics: SEOMetrics;
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'structure' | 'performance' | 'accessibility';
  message: string;
  impact: 'high' | 'medium' | 'low';
}

export interface SEOSuggestion {
  category: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SEOMetrics {
  titleLength: number;
  descriptionLength: number;
  headingCount: { h1: number; h2: number; h3: number; h4: number; h5: number; h6: number };
  imageCount: number;
  imagesWithAlt: number;
  linkCount: number;
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
  readingTime: number;
  keywordDensity: Record<string, number>;
}
