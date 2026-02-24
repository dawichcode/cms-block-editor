import React, { useState, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { SEOMetadata, SEOAnalysis, ArticleSchema } from '../seo/types';
import { analyzeSEO, generateSlug, extractKeywords } from '../seo/seoAnalyzer';
import { 
  generateMetaTags, 
  generateStructuredData, 
  createDefaultMetadata,
  validateMetadata,
  copyMetadataToClipboard,
  downloadMetadata 
} from '../seo/seoUtils';

interface SEOPluginProps {
  metadata?: SEOMetadata;
  onMetadataChange?: (metadata: SEOMetadata) => void;
  showAnalysis?: boolean;
}

export function SEOPlugin({ metadata: initialMetadata, onMetadataChange, showAnalysis = true }: SEOPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [showPanel, setShowPanel] = useState(false);
  const [metadata, setMetadata] = useState<SEOMetadata>(
    initialMetadata || createDefaultMetadata('', '')
  );
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'advanced' | 'analysis'>('basic');

  useEffect(() => {
    if (initialMetadata) {
      setMetadata(initialMetadata);
    }
  }, [initialMetadata]);

  const handleAnalyze = () => {
    editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor);
      const result = analyzeSEO(html, metadata);
      setAnalysis(result);
    });
  };

  const handleMetadataUpdate = (updates: Partial<SEOMetadata>) => {
    const updated = { ...metadata, ...updates };
    setMetadata(updated);
    onMetadataChange?.(updated);
  };

  const handleGenerateSlug = () => {
    if (metadata.title) {
      const slug = generateSlug(metadata.title);
      handleMetadataUpdate({ canonical: `https://example.com/${slug}` });
    }
  };

  const handleExtractKeywords = () => {
    editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor);
      const keywords = extractKeywords(html, 10);
      handleMetadataUpdate({ keywords });
    });
  };

  const handleCopy = async () => {
    await copyMetadataToClipboard(metadata);
    alert('Metadata copied to clipboard!');
  };

  const handleDownload = () => {
    downloadMetadata(metadata);
  };

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        className="cms-seo-trigger"
        title="SEO Settings"
      >
        🔍 SEO
      </button>
    );
  }

  return (
    <div className="cms-seo-panel">
      <div className="cms-seo-overlay" onClick={() => setShowPanel(false)} />
      <div className="cms-seo-content">
        <div className="cms-seo-header">
          <h2>🔍 SEO Manager</h2>
          <button onClick={() => setShowPanel(false)} className="cms-seo-close">×</button>
        </div>

        <div className="cms-seo-tabs">
          <button
            className={activeTab === 'basic' ? 'active' : ''}
            onClick={() => setActiveTab('basic')}
          >
            Basic
          </button>
          <button
            className={activeTab === 'social' ? 'active' : ''}
            onClick={() => setActiveTab('social')}
          >
            Social
          </button>
          <button
            className={activeTab === 'advanced' ? 'active' : ''}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced
          </button>
          {showAnalysis && (
            <button
              className={activeTab === 'analysis' ? 'active' : ''}
              onClick={() => setActiveTab('analysis')}
            >
              Analysis
            </button>
          )}
        </div>

        <div className="cms-seo-body">
          {activeTab === 'basic' && (
            <BasicTab metadata={metadata} onUpdate={handleMetadataUpdate} onGenerateSlug={handleGenerateSlug} onExtractKeywords={handleExtractKeywords} />
          )}
          {activeTab === 'social' && (
            <SocialTab metadata={metadata} onUpdate={handleMetadataUpdate} />
          )}
          {activeTab === 'advanced' && (
            <AdvancedTab metadata={metadata} onUpdate={handleMetadataUpdate} />
          )}
          {activeTab === 'analysis' && showAnalysis && (
            <AnalysisTab analysis={analysis} onAnalyze={handleAnalyze} />
          )}
        </div>

        <div className="cms-seo-footer">
          <button onClick={handleCopy} className="cms-btn-secondary">
            📋 Copy Tags
          </button>
          <button onClick={handleDownload} className="cms-btn-secondary">
            ⬇ Download
          </button>
          <button onClick={() => setShowPanel(false)} className="cms-btn-primary">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function BasicTab({ metadata, onUpdate, onGenerateSlug, onExtractKeywords }: {
  metadata: SEOMetadata;
  onUpdate: (updates: Partial<SEOMetadata>) => void;
  onGenerateSlug: () => void;
  onExtractKeywords: () => void;
}) {
  const validation = validateMetadata(metadata);

  return (
    <div className="cms-seo-tab">
      <div className="cms-seo-field">
        <label>
          Title <span className="cms-char-count">{metadata.title?.length || 0}/60</span>
        </label>
        <input
          type="text"
          value={metadata.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Page title"
          maxLength={60}
        />
      </div>

      <div className="cms-seo-field">
        <label>
          Description <span className="cms-char-count">{metadata.description?.length || 0}/160</span>
        </label>
        <textarea
          value={metadata.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Meta description"
          maxLength={160}
          rows={3}
        />
      </div>

      <div className="cms-seo-field">
        <label>Keywords</label>
        <div className="cms-seo-field-with-action">
          <input
            type="text"
            value={metadata.keywords?.join(', ') || ''}
            onChange={(e) => onUpdate({ keywords: e.target.value.split(',').map(k => k.trim()) })}
            placeholder="keyword1, keyword2, keyword3"
          />
          <button onClick={onExtractKeywords} className="cms-btn-icon" title="Extract from content">
            ✨
          </button>
        </div>
      </div>

      <div className="cms-seo-field">
        <label>Canonical URL</label>
        <div className="cms-seo-field-with-action">
          <input
            type="url"
            value={metadata.canonical || ''}
            onChange={(e) => onUpdate({ canonical: e.target.value })}
            placeholder="https://example.com/page"
          />
          <button onClick={onGenerateSlug} className="cms-btn-icon" title="Generate from title">
            🔗
          </button>
        </div>
      </div>

      <div className="cms-seo-field">
        <label>Author</label>
        <input
          type="text"
          value={metadata.author || ''}
          onChange={(e) => onUpdate({ author: e.target.value })}
          placeholder="Author name"
        />
      </div>

      <div className="cms-seo-field">
        <label>Robots</label>
        <select
          value={metadata.robots || 'index, follow'}
          onChange={(e) => onUpdate({ robots: e.target.value })}
        >
          <option value="index, follow">Index, Follow</option>
          <option value="noindex, follow">No Index, Follow</option>
          <option value="index, nofollow">Index, No Follow</option>
          <option value="noindex, nofollow">No Index, No Follow</option>
        </select>
      </div>

      {!validation.valid && (
        <div className="cms-seo-validation-errors">
          <strong>⚠️ Validation Errors:</strong>
          <ul>
            {validation.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SocialTab({ metadata, onUpdate }: {
  metadata: SEOMetadata;
  onUpdate: (updates: Partial<SEOMetadata>) => void;
}) {
  return (
    <div className="cms-seo-tab">
      <h3>Open Graph</h3>
      <div className="cms-seo-field">
        <label>OG Title</label>
        <input
          type="text"
          value={metadata.ogTitle || ''}
          onChange={(e) => onUpdate({ ogTitle: e.target.value })}
          placeholder="Title for social media"
        />
      </div>

      <div className="cms-seo-field">
        <label>OG Description</label>
        <textarea
          value={metadata.ogDescription || ''}
          onChange={(e) => onUpdate({ ogDescription: e.target.value })}
          placeholder="Description for social media"
          rows={2}
        />
      </div>

      <div className="cms-seo-field">
        <label>OG Image URL</label>
        <input
          type="url"
          value={metadata.ogImage || ''}
          onChange={(e) => onUpdate({ ogImage: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="cms-seo-field">
        <label>OG Type</label>
        <select
          value={metadata.ogType || 'website'}
          onChange={(e) => onUpdate({ ogType: e.target.value as any })}
        >
          <option value="website">Website</option>
          <option value="article">Article</option>
          <option value="blog">Blog</option>
          <option value="product">Product</option>
        </select>
      </div>

      <h3>Twitter Card</h3>
      <div className="cms-seo-field">
        <label>Card Type</label>
        <select
          value={metadata.twitterCard || 'summary_large_image'}
          onChange={(e) => onUpdate({ twitterCard: e.target.value as any })}
        >
          <option value="summary">Summary</option>
          <option value="summary_large_image">Summary Large Image</option>
          <option value="app">App</option>
          <option value="player">Player</option>
        </select>
      </div>

      <div className="cms-seo-field">
        <label>Twitter Site</label>
        <input
          type="text"
          value={metadata.twitterSite || ''}
          onChange={(e) => onUpdate({ twitterSite: e.target.value })}
          placeholder="@username"
        />
      </div>

      <div className="cms-seo-field">
        <label>Twitter Creator</label>
        <input
          type="text"
          value={metadata.twitterCreator || ''}
          onChange={(e) => onUpdate({ twitterCreator: e.target.value })}
          placeholder="@username"
        />
      </div>
    </div>
  );
}

function AdvancedTab({ metadata, onUpdate }: {
  metadata: SEOMetadata;
  onUpdate: (updates: Partial<SEOMetadata>) => void;
}) {
  return (
    <div className="cms-seo-tab">
      <h3>Article Metadata</h3>
      <div className="cms-seo-field">
        <label>Published Time</label>
        <input
          type="datetime-local"
          value={metadata.articlePublishedTime || ''}
          onChange={(e) => onUpdate({ articlePublishedTime: e.target.value })}
        />
      </div>

      <div className="cms-seo-field">
        <label>Modified Time</label>
        <input
          type="datetime-local"
          value={metadata.articleModifiedTime || ''}
          onChange={(e) => onUpdate({ articleModifiedTime: e.target.value })}
        />
      </div>

      <div className="cms-seo-field">
        <label>Article Author</label>
        <input
          type="text"
          value={metadata.articleAuthor || ''}
          onChange={(e) => onUpdate({ articleAuthor: e.target.value })}
          placeholder="Author name"
        />
      </div>

      <div className="cms-seo-field">
        <label>Section</label>
        <input
          type="text"
          value={metadata.articleSection || ''}
          onChange={(e) => onUpdate({ articleSection: e.target.value })}
          placeholder="Technology, Business, etc."
        />
      </div>

      <div className="cms-seo-field">
        <label>Article Tags</label>
        <input
          type="text"
          value={metadata.articleTags?.join(', ') || ''}
          onChange={(e) => onUpdate({ articleTags: e.target.value.split(',').map(t => t.trim()) })}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div className="cms-seo-info">
        <p>💡 Structured data (Schema.org) can be added programmatically via the API</p>
      </div>
    </div>
  );
}

function AnalysisTab({ analysis, onAnalyze }: {
  analysis: SEOAnalysis | null;
  onAnalyze: () => void;
}) {
  if (!analysis) {
    return (
      <div className="cms-seo-tab cms-seo-analysis-empty">
        <p>Click the button below to analyze your content for SEO optimization.</p>
        <button onClick={onAnalyze} className="cms-btn-primary">
          🔍 Analyze Content
        </button>
      </div>
    );
  }

  const scoreColor = analysis.score >= 80 ? '#10b981' : analysis.score >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="cms-seo-tab">
      <div className="cms-seo-score" style={{ borderColor: scoreColor }}>
        <div className="cms-seo-score-circle" style={{ background: scoreColor }}>
          {analysis.score}
        </div>
        <div className="cms-seo-score-label">
          {analysis.score >= 80 ? 'Excellent' : analysis.score >= 60 ? 'Good' : 'Needs Improvement'}
        </div>
      </div>

      <button onClick={onAnalyze} className="cms-btn-secondary" style={{ marginBottom: '1rem' }}>
        🔄 Re-analyze
      </button>

      {analysis.issues.length > 0 && (
        <div className="cms-seo-issues">
          <h3>Issues</h3>
          {analysis.issues.map((issue, i) => (
            <div key={i} className={`cms-seo-issue cms-seo-issue-${issue.type}`}>
              <span className="cms-seo-issue-icon">
                {issue.type === 'error' ? '❌' : '⚠️'}
              </span>
              <div>
                <div className="cms-seo-issue-message">{issue.message}</div>
                <div className="cms-seo-issue-meta">
                  {issue.category} • {issue.impact} impact
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {analysis.suggestions.length > 0 && (
        <div className="cms-seo-suggestions">
          <h3>Suggestions</h3>
          {analysis.suggestions.map((suggestion, i) => (
            <div key={i} className="cms-seo-suggestion">
              <span className="cms-seo-suggestion-icon">💡</span>
              <div>
                <div className="cms-seo-suggestion-message">{suggestion.message}</div>
                <div className="cms-seo-suggestion-meta">
                  {suggestion.category} • {suggestion.priority} priority
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cms-seo-metrics">
        <h3>Metrics</h3>
        <div className="cms-seo-metrics-grid">
          <div className="cms-seo-metric">
            <div className="cms-seo-metric-value">{analysis.metrics.wordCount}</div>
            <div className="cms-seo-metric-label">Words</div>
          </div>
          <div className="cms-seo-metric">
            <div className="cms-seo-metric-value">{analysis.metrics.readingTime} min</div>
            <div className="cms-seo-metric-label">Reading Time</div>
          </div>
          <div className="cms-seo-metric">
            <div className="cms-seo-metric-value">{analysis.metrics.headingCount.h1}</div>
            <div className="cms-seo-metric-label">H1 Tags</div>
          </div>
          <div className="cms-seo-metric">
            <div className="cms-seo-metric-value">{analysis.metrics.imageCount}</div>
            <div className="cms-seo-metric-label">Images</div>
          </div>
          <div className="cms-seo-metric">
            <div className="cms-seo-metric-value">{analysis.metrics.linkCount}</div>
            <div className="cms-seo-metric-label">Links</div>
          </div>
          <div className="cms-seo-metric">
            <div className="cms-seo-metric-value">{analysis.metrics.imagesWithAlt}/{analysis.metrics.imageCount}</div>
            <div className="cms-seo-metric-label">Alt Text</div>
          </div>
        </div>
      </div>
    </div>
  );
}
