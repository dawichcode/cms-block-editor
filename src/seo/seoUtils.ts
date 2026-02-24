import { SEOMetadata, SchemaType } from './types';

/**
 * Generate HTML meta tags from SEO metadata
 */
export function generateMetaTags(metadata: SEOMetadata): string {
  const tags: string[] = [];

  // Basic meta tags
  if (metadata.title) {
    tags.push(`<title>${escapeHtml(metadata.title)}</title>`);
  }
  if (metadata.description) {
    tags.push(`<meta name="description" content="${escapeHtml(metadata.description)}">`);
  }
  if (metadata.keywords && metadata.keywords.length > 0) {
    tags.push(`<meta name="keywords" content="${escapeHtml(metadata.keywords.join(', '))}">`);
  }
  if (metadata.author) {
    tags.push(`<meta name="author" content="${escapeHtml(metadata.author)}">`);
  }
  if (metadata.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(metadata.canonical)}">`);
  }
  if (metadata.robots) {
    tags.push(`<meta name="robots" content="${escapeHtml(metadata.robots)}">`);
  }

  // Open Graph tags
  if (metadata.ogTitle) {
    tags.push(`<meta property="og:title" content="${escapeHtml(metadata.ogTitle)}">`);
  }
  if (metadata.ogDescription) {
    tags.push(`<meta property="og:description" content="${escapeHtml(metadata.ogDescription)}">`);
  }
  if (metadata.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(metadata.ogImage)}">`);
  }
  if (metadata.ogImageAlt) {
    tags.push(`<meta property="og:image:alt" content="${escapeHtml(metadata.ogImageAlt)}">`);
  }
  if (metadata.ogUrl) {
    tags.push(`<meta property="og:url" content="${escapeHtml(metadata.ogUrl)}">`);
  }
  if (metadata.ogType) {
    tags.push(`<meta property="og:type" content="${metadata.ogType}">`);
  }
  if (metadata.ogSiteName) {
    tags.push(`<meta property="og:site_name" content="${escapeHtml(metadata.ogSiteName)}">`);
  }
  if (metadata.ogLocale) {
    tags.push(`<meta property="og:locale" content="${metadata.ogLocale}">`);
  }

  // Twitter Card tags
  if (metadata.twitterCard) {
    tags.push(`<meta name="twitter:card" content="${metadata.twitterCard}">`);
  }
  if (metadata.twitterSite) {
    tags.push(`<meta name="twitter:site" content="${escapeHtml(metadata.twitterSite)}">`);
  }
  if (metadata.twitterCreator) {
    tags.push(`<meta name="twitter:creator" content="${escapeHtml(metadata.twitterCreator)}">`);
  }
  if (metadata.twitterTitle) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(metadata.twitterTitle)}">`);
  }
  if (metadata.twitterDescription) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(metadata.twitterDescription)}">`);
  }
  if (metadata.twitterImage) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(metadata.twitterImage)}">`);
  }
  if (metadata.twitterImageAlt) {
    tags.push(`<meta name="twitter:image:alt" content="${escapeHtml(metadata.twitterImageAlt)}">`);
  }

  // Article tags
  if (metadata.articlePublishedTime) {
    tags.push(`<meta property="article:published_time" content="${metadata.articlePublishedTime}">`);
  }
  if (metadata.articleModifiedTime) {
    tags.push(`<meta property="article:modified_time" content="${metadata.articleModifiedTime}">`);
  }
  if (metadata.articleAuthor) {
    tags.push(`<meta property="article:author" content="${escapeHtml(metadata.articleAuthor)}">`);
  }
  if (metadata.articleSection) {
    tags.push(`<meta property="article:section" content="${escapeHtml(metadata.articleSection)}">`);
  }
  if (metadata.articleTags && metadata.articleTags.length > 0) {
    metadata.articleTags.forEach(tag => {
      tags.push(`<meta property="article:tag" content="${escapeHtml(tag)}">`);
    });
  }

  return tags.join('\n');
}

/**
 * Generate structured data JSON-LD script tags
 */
export function generateStructuredData(schemas: SchemaType[]): string {
  if (!schemas || schemas.length === 0) return '';

  const scripts = schemas.map(schema => {
    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  });

  return scripts.join('\n');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Create default SEO metadata
 */
export function createDefaultMetadata(title: string, description: string): SEOMetadata {
  return {
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  };
}

/**
 * Merge SEO metadata with defaults
 */
export function mergeMetadata(base: SEOMetadata, override: Partial<SEOMetadata>): SEOMetadata {
  return {
    ...base,
    ...override,
    keywords: override.keywords || base.keywords,
    schema: override.schema || base.schema,
    articleTags: override.articleTags || base.articleTags,
  };
}

/**
 * Validate SEO metadata
 */
export function validateMetadata(metadata: SEOMetadata): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!metadata.title) {
    errors.push('Title is required');
  } else if (metadata.title.length > 60) {
    errors.push('Title should be 60 characters or less');
  }

  if (!metadata.description) {
    errors.push('Description is required');
  } else if (metadata.description.length > 160) {
    errors.push('Description should be 160 characters or less');
  }

  if (metadata.ogImage && !isValidUrl(metadata.ogImage)) {
    errors.push('Open Graph image must be a valid URL');
  }

  if (metadata.canonical && !isValidUrl(metadata.canonical)) {
    errors.push('Canonical URL must be a valid URL');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if string is a valid URL
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Copy metadata to clipboard
 */
export async function copyMetadataToClipboard(metadata: SEOMetadata): Promise<void> {
  const metaTags = generateMetaTags(metadata);
  const structuredData = metadata.schema ? generateStructuredData(metadata.schema) : '';
  const fullContent = `${metaTags}\n\n${structuredData}`;
  
  await navigator.clipboard.writeText(fullContent);
}

/**
 * Download metadata as HTML file
 */
export function downloadMetadata(metadata: SEOMetadata, filename: string = 'seo-metadata.html'): void {
  const metaTags = generateMetaTags(metadata);
  const structuredData = metadata.schema ? generateStructuredData(metadata.schema) : '';
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${metaTags}
  ${structuredData}
</head>
<body>
  <!-- Your content here -->
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
