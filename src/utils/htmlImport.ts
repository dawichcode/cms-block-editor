import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes, LexicalEditor } from "lexical";

/**
 * Import HTML content into the editor
 */
export function importFromHTML(editor: LexicalEditor, html: string): void {
  editor.update(() => {
    // Parse HTML
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    
    // Generate Lexical nodes from DOM
    const nodes = $generateNodesFromDOM(editor, dom);
    
    // Clear existing content and insert new nodes
    const root = $getRoot();
    root.clear();
    root.select();
    $insertNodes(nodes);
  });
}

/**
 * Append HTML content to the editor
 */
export function appendHTML(editor: LexicalEditor, html: string): void {
  editor.update(() => {
    // Parse HTML
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    
    // Generate Lexical nodes from DOM
    const nodes = $generateNodesFromDOM(editor, dom);
    
    // Insert nodes at the end
    const root = $getRoot();
    root.selectEnd();
    $insertNodes(nodes);
  });
}

/**
 * Load HTML from file
 */
export function loadHTMLFromFile(
  editor: LexicalEditor,
  file: File,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): void {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const html = event.target?.result as string;
      importFromHTML(editor, html);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };
  
  reader.onerror = () => {
    onError?.(new Error('Failed to read file'));
  };
  
  reader.readAsText(file);
}
