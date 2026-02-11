# Link Feature Guide

The CMS Block Editor includes a comprehensive link insertion feature with custom labels and advanced options.

## Features

- Insert links with custom text labels
- Support for URLs with title attributes
- Option to open links in new tabs
- Automatic link detection (paste URLs and they become clickable)
- Visual link styling with hover effects
- External link indicators (↗ icon for new tab links)

## How to Insert Links

### Method 1: Using the Toolbar Button

1. Select text in the editor (optional)
2. Click the link icon (🔗) in the toolbar
3. Fill in the link details:
   - **Link Text**: Custom text to display (uses selected text if available)
   - **URL**: The destination URL (required)
   - **Title**: Optional tooltip text for accessibility
   - **Open in new tab**: Check to open link in a new window
4. Click "Insert Link"

### Method 2: Automatic Link Detection

Simply paste a URL into the editor, and it will automatically become a clickable link.

## Link Modal Fields

### Link Text
- The visible text that users will click
- If you have text selected, it will be pre-filled
- If left empty and text is selected, the selected text will be used
- If left empty and no text is selected, the URL will be used as the text

### URL (Required)
- The destination URL
- Must be a valid URL format (e.g., https://example.com)
- Can be absolute or relative

### Title (Optional)
- Provides additional context when users hover over the link
- Improves accessibility for screen readers
- Example: "Visit our documentation"

### Open in New Tab
- When checked, adds `target="_blank"` to the link
- Automatically adds `rel="noopener noreferrer"` for security
- External link indicator (↗) appears after the link text

## Link Styling

Links in the editor have the following styles:

- **Color**: Purple (#667eea)
- **Hover**: Darker purple (#5568d3)
- **Underline**: Always visible
- **External indicator**: ↗ symbol for new tab links
- **Cursor**: Pointer on hover

## Keyboard Shortcuts

While the link modal is open:
- **Escape**: Close the modal without inserting
- **Enter**: Submit the form (when URL is filled)

## Examples

### Basic Link
```
Text: "Visit our website"
URL: "https://example.com"
Result: Visit our website
```

### Link with Title
```
Text: "Documentation"
URL: "https://docs.example.com"
Title: "Read the full documentation"
Result: Documentation (with tooltip on hover)
```

### External Link
```
Text: "GitHub Repository"
URL: "https://github.com/example/repo"
Open in new tab: ✓
Result: GitHub Repository ↗
```

### Auto-detected Link
```
Paste: https://example.com
Result: https://example.com (automatically clickable)
```

## Technical Implementation

The link feature uses:
- **@lexical/link**: Lexical's built-in link nodes
- **AutoLinkNode**: Automatic URL detection
- **LinkNode**: Manual link insertion
- **TOGGLE_LINK_COMMAND**: Lexical command for link operations
- **Custom Modal**: React-based UI for link insertion

## Accessibility

The link feature includes several accessibility improvements:

- Semantic HTML with proper `<a>` tags
- Title attributes for additional context
- `rel="noopener noreferrer"` for security on external links
- Keyboard navigation support
- Screen reader friendly labels

## Customization

You can customize link styles by modifying the CSS classes in `src/styles/editor.css`:

```css
.cms-link,
.cms-editor-content a {
  color: #667eea;
  text-decoration: underline;
}

.cms-link:hover,
.cms-editor-content a:hover {
  color: #5568d3;
}
```

## Troubleshooting

### Links not appearing
- Make sure you've entered a valid URL
- Check that the LinkPlugin is included in EditorShell
- Verify that AutoLinkNode and LexicalLinkNode are in EditorConfig

### Modal not opening
- Ensure the link button in the toolbar is clickable
- Check browser console for JavaScript errors
- Verify that LinkPlugin is properly imported

### Styling issues
- Confirm that editor.css is being imported
- Check for CSS conflicts with your application styles
- Verify that the .cms-link class is being applied
