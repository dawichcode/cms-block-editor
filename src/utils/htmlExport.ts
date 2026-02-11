import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalEditor } from "lexical";

/**
 * Export editor content as HTML string
 */
export function exportToHTML(editor: LexicalEditor): string {
  let html = '';
  
  editor.getEditorState().read(() => {
    html = $generateHtmlFromNodes(editor, null);
  });
  
  return html;
}

/**
 * Export editor content as HTML with custom wrapper
 */
export function exportToHTMLWithWrapper(
  editor: LexicalEditor,
  options?: {
    className?: string;
    includeStyles?: boolean;
  }
): string {
  const html = exportToHTML(editor);
  const className = options?.className || 'cms-content';
  
  let output = `<div class="${className}">\n${html}\n</div>`;
  
  if (options?.includeStyles) {
    output = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Content</title>
  <style>
    .cms-content {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.8;
      color: #2c3e50;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .cms-content h1 { font-size: 2em; font-weight: 700; margin: 0.67em 0; }
    .cms-content h2 { font-size: 1.5em; font-weight: 600; margin: 0.75em 0; }
    .cms-content h3 { font-size: 1.17em; font-weight: 600; margin: 0.83em 0; }
    .cms-content p { margin: 1em 0; }
    .cms-content ul, .cms-content ol { margin: 1em 0; padding-left: 2em; }
    .cms-content li { margin: 0.5em 0; }
    .cms-content a { color: #667eea; text-decoration: underline; }
    .cms-content img { max-width: 100%; height: auto; border-radius: 8px; }
    .cms-content pre { background: #282c34; color: #abb2bf; padding: 16px; border-radius: 8px; overflow-x: auto; }
    .cms-content code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
    .cms-content blockquote { border-left: 4px solid #667eea; padding: 16px 20px; margin: 20px 0; font-style: italic; background: rgba(102, 126, 234, 0.05); }
  </style>
</head>
<body>
  ${output}
</body>
</html>`;
  }
  
  return output;
}

/**
 * Download HTML content as file
 */
export function downloadHTML(
  editor: LexicalEditor,
  filename: string = 'content.html',
  options?: { includeStyles?: boolean }
): void {
  const html = exportToHTMLWithWrapper(editor, options);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
