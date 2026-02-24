export { default as CMSBlockEditor } from "./core/CMSBlockEditor";
export { default as CMSRenderer } from "./core/CMSRenderer";

// Export utilities
export { exportToHTML, exportToHTMLWithWrapper, downloadHTML } from "./utils/htmlExport";
export { exportToMarkdown, downloadMarkdown, copyMarkdownToClipboard } from "./utils/markdownExport";
export { importFromHTML, appendHTML, loadHTMLFromFile } from "./utils/htmlImport";
export { importFromMarkdown, loadMarkdownFromFile, pasteMarkdownFromClipboard } from "./utils/markdownImport";

// Export image editor command
export { OPEN_IMAGE_EDITOR_COMMAND } from "./plugins/ImageEditorPlugin";

// Export nodes for advanced usage
export { VideoNode } from "./blocks/VideoNode";
export { ImageNode } from "./blocks/ImageNode";

// Export theme system
export {
  ThemeProvider,
  useTheme,
  ThemeSwitcher,
  ThemeCustomizer,
  lightTheme,
  darkTheme,
  presetThemes,
  oceanTheme,
  forestTheme,
  sunsetTheme,
  roseTheme,
  midnightTheme,
  draculaTheme,
  monokaiTheme,
  minimalTheme,
  createTheme,
  generateColorVariations,
  createGradient,
  generatePalette,
  validateTheme,
  exportTheme,
  importTheme,
  themeToCSSVariables,
  generateThemeFromBrand,
} from "./themes";
export type { 
  Theme, 
  ThemeColors, 
  ThemeMode, 
  PresetThemeName,
  ThemeOverride,
  ThemeConfig,
  ThemeTypography,
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeShadows,
  ThemeTransitions,
  ThemeBreakpoints,
  ThemeZIndex,
  ThemeAnimations,
  ThemeGradients,
} from "./themes";

// Export SEO tools
export { SEOPlugin } from "./plugins/SEOPlugin";
export {
  analyzeSEO,
  generateSlug,
  extractKeywords,
  generateMetaTags,
  generateStructuredData,
  createDefaultMetadata,
  mergeMetadata,
  validateMetadata,
  copyMetadataToClipboard,
  downloadMetadata,
} from "./seo";
export type {
  SEOMetadata,
  SEOAnalysis,
  SEOIssue,
  SEOSuggestion,
  SEOMetrics,
  SchemaType,
  ArticleSchema,
  BreadcrumbSchema,
  OrganizationSchema,
  PersonSchema,
  ProductSchema,
  FAQSchema,
  HowToSchema,
} from "./seo";

import "./styles/editor.css";
import "./styles/renderer.css";
import "./styles/themes.css";
import "./styles/themeCustomizer.css";
import "./styles/seo.css";