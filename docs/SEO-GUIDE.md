# SEO Optimization Guide

Complete guide to SEO optimization tools in CMS Block Editor.

## Table of Contents

1. [Overview](#overview)
2. [SEO Plugin](#seo-plugin)
3. [SEO Metadata](#seo-metadata)
4. [SEO Analysis](#seo-analysis)
5. [Structured Data](#structured-data)
6. [API Reference](#api-reference)
7. [Best Practices](#best-practices)

---

## Overview

The CMS Block Editor includes comprehensive SEO optimization tools to help you create search-engine-friendly content:

- **SEO Manager UI** - Visual interface for managing meta tags
- **SEO Analysis** - Real-time content analysis with scoring
- **Meta Tag Generation** - Automatic HTML meta tag generation
- **Structured Data** - Schema.org JSON-LD support
- **Social Media Tags** - Open Graph and Twitter Card support
- **Keyword Tools** - Automatic keyword extraction
- **Slug Generation** - SEO-friendly URL generation

---

## SEO Plugin

### Basic Usage

```tsx
import { CMSBlockEditor } from 'cms-block-editor';
import { useState } from 'react';

function MyEditor() {
  const [content, setContent] = useState('');
  const [seoMetadata, setSeoMetadata] = useState({
    title: 'My Page Title',
    description: 'My page description',
  });

  return (
    <CMSBlockEditor
      value={content}
      onChange={setContent}
      seoMetadata={seoMetadata}
      onSEOMetadataChange={setSeoMetadata}
      showSEO={true}
    />
  );
}
```

### Props

- `seoMetadata?: SEOMetadata` - Initial SEO metadata
- `onSEOMetadataChange?: (metadata: SEOMetadata) => void` - Callback when metadata changes
- `showSEO?: boolean` - Show/hide SEO button (default: true)

---

## SEO Metadata

### Complete Metadata Interface

```typescript
interface SEOMetadata {
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
```

### Creating Metadata

```typescript
import { createDefaultMetadata } from 'cms-block-editor';

const metadata = createDefaultMetadata(
  'My Page Title',
  'My page description'
);
```

### Validating Metadata

```typescript
import { validateMetadata } from 'cms-block-editor';

const validation = validateMetadata(metadata);

if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}
```

---

## SEO Analysis

### Analyzing Content

```typescript
import { analyzeSEO } from 'cms-block-editor';

const htmlContent = '<h1>My Article</h1><p>Content...</p>';
const metadata = {
  title: 'My Article',
  description: 'Article description',
};

const analysis = analyzeSEO(htmlContent, metadata);

console.log('SEO Score:', analysis.score); // 0-100
console.log('Issues:', analysis.issues);
console.log('Suggestions:', analysis.suggestions);
console.log('Metrics:', analysis.metrics);
```

### Analysis Results

```typescript
interface SEOAnalysis {
  score: number; // 0-100
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
  metrics: SEOMetrics;
}

interface SEOMetrics {
  titleLength: number;
  descriptionLength: number;
  headingCount: { h1: number; h2: number; h3: number; h4: number; h5: number; h6: number };
  imageCount: number;
  imagesWithAlt: number;
  linkCount: number;
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
  readingTime: number; // minutes
  keywordDensity: Record<string, number>;
}
```

### Score Interpretation

- **80-100**: Excellent - Well optimized
- **60-79**: Good - Minor improvements needed
- **0-59**: Needs Improvement - Significant issues

---

## Structured Data

### Article Schema

```typescript
import { ArticleSchema } from 'cms-block-editor';

const articleSchema: ArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'My Article Title',
  description: 'Article description',
  image: 'https://example.com/image.jpg',
  datePublished: '2024-02-21T10:00:00Z',
  dateModified: '2024-02-21T12:00:00Z',
  author: {
    '@type': 'Person',
    name: 'John Doe',
    url: 'https://example.com/author/john-doe',
  },
  publisher: {
    '@type': 'Organization',
    name: 'My Company',
    logo: {
      '@type': 'ImageObject',
      url: 'https://example.com/logo.png',
    },
  },
};

const metadata = {
  title: 'My Article',
  description: 'Article description',
  schema: [articleSchema],
};
```

### Breadcrumb Schema

```typescript
import { BreadcrumbSchema } from 'cms-block-editor';

const breadcrumbSchema: BreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://example.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://example.com/blog',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Article',
    },
  ],
};
```

### FAQ Schema

```typescript
import { FAQSchema } from 'cms-block-editor';

const faqSchema: FAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SEO stands for Search Engine Optimization...',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is SEO important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SEO is important because...',
      },
    },
  ],
};
```

---

## API Reference

### Generate Meta Tags

```typescript
import { generateMetaTags } from 'cms-block-editor';

const metadata = {
  title: 'My Page',
  description: 'Page description',
  ogImage: 'https://example.com/image.jpg',
};

const metaTags = generateMetaTags(metadata);
// Returns HTML string with all meta tags
```

### Generate Structured Data

```typescript
import { generateStructuredData } from 'cms-block-editor';

const schemas = [articleSchema, breadcrumbSchema];
const jsonLd = generateStructuredData(schemas);
// Returns JSON-LD script tags
```

### Generate Slug

```typescript
import { generateSlug } from 'cms-block-editor';

const slug = generateSlug('My Article Title!');
// Returns: "my-article-title"
```

### Extract Keywords

```typescript
import { extractKeywords } from 'cms-block-editor';

const html = '<h1>Article</h1><p>Content about technology...</p>';
const keywords = extractKeywords(html, 10);
// Returns: ['technology', 'article', 'content', ...]
```

### Copy to Clipboard

```typescript
import { copyMetadataToClipboard } from 'cms-block-editor';

await copyMetadataToClipboard(metadata);
// Copies all meta tags and structured data to clipboard
```

### Download Metadata

```typescript
import { downloadMetadata } from 'cms-block-editor';

downloadMetadata(metadata, 'seo-metadata.html');
// Downloads HTML file with meta tags
```

---

## Best Practices

### Title Optimization

- **Length**: 50-60 characters
- **Include primary keyword** near the beginning
- **Make it compelling** to increase click-through rate
- **Unique** for each page

```typescript
// Good
title: 'Complete SEO Guide for Beginners | My Blog'

// Too long
title: 'The Complete and Comprehensive Guide to Search Engine Optimization for Absolute Beginners'

// Too short
title: 'SEO Guide'
```

### Description Optimization

- **Length**: 150-160 characters
- **Include primary and secondary keywords**
- **Call to action** when appropriate
- **Accurate summary** of page content

```typescript
// Good
description: 'Learn SEO basics with our comprehensive guide. Discover keyword research, on-page optimization, and link building strategies. Start ranking higher today!'

// Too short
description: 'SEO guide for beginners.'

// Too long
description: 'This is an extremely detailed and comprehensive guide that covers absolutely everything you need to know about search engine optimization including all the latest techniques and strategies...'
```

### Keywords

- **3-10 keywords** per page
- **Mix of short and long-tail keywords**
- **Natural keyword density** (1-2%)
- **Avoid keyword stuffing**

```typescript
keywords: [
  'seo optimization',
  'search engine optimization',
  'seo guide',
  'seo best practices',
  'on-page seo',
]
```

### Open Graph

- **Always include** for social media sharing
- **Use high-quality images** (1200x630px recommended)
- **Match or enhance** page title and description

```typescript
ogTitle: 'Complete SEO Guide for Beginners',
ogDescription: 'Master SEO with our step-by-step guide',
ogImage: 'https://example.com/images/seo-guide-og.jpg',
ogType: 'article',
```

### Structured Data

- **Use appropriate schema types** for your content
- **Include all required properties**
- **Test with Google's Rich Results Test**
- **Keep data accurate and up-to-date**

### Content Optimization

- **One H1 per page**
- **Hierarchical heading structure** (H1 → H2 → H3)
- **Alt text for all images**
- **Internal and external links**
- **300+ words** minimum
- **Natural keyword usage**

### Technical SEO

- **Canonical URLs** to prevent duplicate content
- **Robots meta tag** for indexing control
- **Mobile-friendly** content
- **Fast loading times**
- **HTTPS** for security

---

## Complete Example

```tsx
import { CMSBlockEditor, SEOMetadata, ArticleSchema } from 'cms-block-editor';
import { useState } from 'react';

function BlogEditor() {
  const [content, setContent] = useState('');
  const [seoMetadata, setSeoMetadata] = useState<SEOMetadata>({
    // Basic
    title: 'Complete SEO Guide for Beginners',
    description: 'Learn SEO basics with our comprehensive guide. Discover keyword research, on-page optimization, and more.',
    keywords: ['seo', 'search engine optimization', 'seo guide', 'seo tutorial'],
    author: 'John Doe',
    canonical: 'https://example.com/blog/seo-guide',
    robots: 'index, follow',
    
    // Open Graph
    ogTitle: 'Complete SEO Guide for Beginners',
    ogDescription: 'Master SEO with our step-by-step guide',
    ogImage: 'https://example.com/images/seo-guide.jpg',
    ogType: 'article',
    ogUrl: 'https://example.com/blog/seo-guide',
    ogSiteName: 'My Blog',
    
    // Twitter
    twitterCard: 'summary_large_image',
    twitterSite: '@myblog',
    twitterCreator: '@johndoe',
    
    // Article
    articlePublishedTime: '2024-02-21T10:00:00Z',
    articleModifiedTime: '2024-02-21T12:00:00Z',
    articleAuthor: 'John Doe',
    articleSection: 'SEO',
    articleTags: ['seo', 'marketing', 'tutorial'],
    
    // Structured Data
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Complete SEO Guide for Beginners',
        description: 'Learn SEO basics with our comprehensive guide',
        image: 'https://example.com/images/seo-guide.jpg',
        datePublished: '2024-02-21T10:00:00Z',
        dateModified: '2024-02-21T12:00:00Z',
        author: {
          '@type': 'Person',
          name: 'John Doe',
        },
        publisher: {
          '@type': 'Organization',
          name: 'My Blog',
          logo: {
            '@type': 'ImageObject',
            url: 'https://example.com/logo.png',
          },
        },
      } as ArticleSchema,
    ],
  });

  const handleSave = async () => {
    // Save content and metadata to your backend
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        content,
        seo: seoMetadata,
      }),
    });
  };

  return (
    <div>
      <CMSBlockEditor
        value={content}
        onChange={setContent}
        seoMetadata={seoMetadata}
        onSEOMetadataChange={setSeoMetadata}
        showSEO={true}
      />
      <button onClick={handleSave}>Save Post</button>
    </div>
  );
}
```

---

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
