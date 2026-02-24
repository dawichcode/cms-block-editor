import { SEOMetadata, SEOAnalysis, SEOIssue, SEOSuggestion, SEOMetrics } from './types';

/**
 * Analyze content for SEO optimization
 */
export function analyzeSEO(content: string, metadata: SEOMetadata): SEOAnalysis {
  const issues: SEOIssue[] = [];
  const suggestions: SEOSuggestion[] = [];
  const metrics = calculateMetrics(content, metadata);

  // Analyze title
  if (!metadata.title) {
    issues.push({
      type: 'error',
      category: 'meta',
      message: 'Missing page title',
      impact: 'high',
    });
  } else {
    if (metrics.titleLength < 30) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Title is too short (recommended: 50-60 characters)',
        impact: 'medium',
      });
    } else if (metrics.titleLength > 60) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Title is too long (recommended: 50-60 characters)',
        impact: 'medium',
      });
    }
  }

  // Analyze description
  if (!metadata.description) {
    issues.push({
      type: 'error',
      category: 'meta',
      message: 'Missing meta description',
      impact: 'high',
    });
  } else {
    if (metrics.descriptionLength < 120) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Description is too short (recommended: 150-160 characters)',
        impact: 'medium',
      });
    } else if (metrics.descriptionLength > 160) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Description is too long (recommended: 150-160 characters)',
        impact: 'medium',
      });
    }
  }

  // Analyze headings
  if (metrics.headingCount.h1 === 0) {
    issues.push({
      type: 'error',
      category: 'structure',
      message: 'Missing H1 heading',
      impact: 'high',
    });
  } else if (metrics.headingCount.h1 > 1) {
    issues.push({
      type: 'warning',
      category: 'structure',
      message: 'Multiple H1 headings found (recommended: 1)',
      impact: 'medium',
    });
  }

  // Analyze images
  if (metrics.imageCount > 0) {
    const altPercentage = (metrics.imagesWithAlt / metrics.imageCount) * 100;
    if (altPercentage < 100) {
      issues.push({
        type: 'warning',
        category: 'accessibility',
        message: `${metrics.imageCount - metrics.imagesWithAlt} images missing alt text`,
        impact: 'medium',
      });
    }
  }

  // Analyze content length
  if (metrics.wordCount < 300) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: 'Content is too short (recommended: 300+ words)',
      impact: 'medium',
    });
  }

  // Analyze Open Graph
  if (!metadata.ogTitle && !metadata.ogDescription) {
    suggestions.push({
      category: 'Social Media',
      message: 'Add Open Graph tags for better social media sharing',
      priority: 'medium',
    });
  }

  // Analyze Twitter Card
  if (!metadata.twitterCard) {
    suggestions.push({
      category: 'Social Media',
      message: 'Add Twitter Card tags for better Twitter sharing',
      priority: 'low',
    });
  }

  // Analyze structured data
  if (!metadata.schema || metadata.schema.length === 0) {
    suggestions.push({
      category: 'Structured Data',
      message: 'Add Schema.org structured data for rich snippets',
      priority: 'medium',
    });
  }

  // Analyze canonical URL
  if (!metadata.canonical) {
    suggestions.push({
      category: 'Technical SEO',
      message: 'Add canonical URL to prevent duplicate content issues',
      priority: 'medium',
    });
  }

  // Calculate overall score
  const score = calculateSEOScore(issues, metrics);

  return {
    score,
    issues,
    suggestions,
    metrics,
  };
}

/**
 * Calculate SEO metrics from content
 */
function calculateMetrics(content: string, metadata: SEOMetadata): SEOMetrics {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');

  // Count headings
  const headingCount = {
    h1: doc.querySelectorAll('h1').length,
    h2: doc.querySelectorAll('h2').length,
    h3: doc.querySelectorAll('h3').length,
    h4: doc.querySelectorAll('h4').length,
    h5: doc.querySelectorAll('h5').length,
    h6: doc.querySelectorAll('h6').length,
  };

  // Count images
  const images = doc.querySelectorAll('img');
  const imageCount = images.length;
  const imagesWithAlt = Array.from(images).filter(img => img.hasAttribute('alt')).length;

  // Count links
  const links = doc.querySelectorAll('a');
  const linkCount = links.length;
  const internalLinks = Array.from(links).filter(a => {
    const href = a.getAttribute('href') || '';
    return href.startsWith('/') || href.startsWith('#');
  }).length;
  const externalLinks = linkCount - internalLinks;

  // Calculate word count
  const text = doc.body.textContent || '';
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);

  // Calculate keyword density
  const keywordDensity = calculateKeywordDensity(words, metadata.keywords || []);

  return {
    titleLength: metadata.title?.length || 0,
    descriptionLength: metadata.description?.length || 0,
    headingCount,
    imageCount,
    imagesWithAlt,
    linkCount,
    internalLinks,
    externalLinks,
    wordCount,
    readingTime,
    keywordDensity,
  };
}

/**
 * Calculate keyword density
 */
function calculateKeywordDensity(words: string[], keywords: string[]): Record<string, number> {
  const density: Record<string, number> = {};
  const totalWords = words.length;

  keywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    const count = words.filter(word => word.toLowerCase() === keywordLower).length;
    density[keyword] = totalWords > 0 ? (count / totalWords) * 100 : 0;
  });

  return density;
}

/**
 * Calculate overall SEO score (0-100)
 */
function calculateSEOScore(issues: SEOIssue[], metrics: SEOMetrics): number {
  let score = 100;

  // Deduct points for issues
  issues.forEach(issue => {
    if (issue.type === 'error') {
      score -= issue.impact === 'high' ? 15 : issue.impact === 'medium' ? 10 : 5;
    } else if (issue.type === 'warning') {
      score -= issue.impact === 'high' ? 10 : issue.impact === 'medium' ? 5 : 2;
    }
  });

  // Bonus points for good metrics
  if (metrics.wordCount >= 300) score += 5;
  if (metrics.headingCount.h1 === 1) score += 5;
  if (metrics.imageCount > 0 && metrics.imagesWithAlt === metrics.imageCount) score += 5;

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate SEO-friendly slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract keywords from content
 */
export function extractKeywords(content: string, limit: number = 10): string[] {
  const text = content.toLowerCase().replace(/<[^>]*>/g, ' ');
  const words = text.split(/\s+/).filter(word => word.length > 3);
  
  // Count word frequency
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}
