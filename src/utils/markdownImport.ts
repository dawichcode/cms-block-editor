import { 
  $getRoot, 
  $createParagraphNode, 
  $createTextNode,
  LexicalEditor
} from "lexical";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createListNode, $createListItemNode } from "@lexical/list";
import { $createLinkNode } from "@lexical/link";
import { $createCodeNode } from "@lexical/code";

/**
 * Import Markdown content into the editor
 */
export function importFromMarkdown(editor: LexicalEditor, markdown: string): void {
  editor.update(() => {
    const root = $getRoot();
    root.clear();
    
    const lines = markdown.split('\n');
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Skip empty lines
      if (!line.trim()) {
        i++;
        continue;
      }
      
      // Headings
      if (line.startsWith('#')) {
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          const heading = $createHeadingNode(`h${level}` as any);
          heading.append($createTextNode(text));
          root.append(heading);
          i++;
          continue;
        }
      }
      
      // Code blocks
      if (line.startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        const code = $createCodeNode();
        code.append($createTextNode(codeLines.join('\n')));
        root.append(code);
        i++;
        continue;
      }
      
      // Blockquotes
      if (line.startsWith('>')) {
        const text = line.replace(/^>\s*/, '');
        const quote = $createQuoteNode();
        quote.append($createTextNode(text));
        root.append(quote);
        i++;
        continue;
      }
      
      // Unordered lists
      if (line.match(/^[\s]*[-*+]\s+/)) {
        const list = $createListNode('bullet');
        
        while (i < lines.length && lines[i].match(/^[\s]*[-*+]\s+/)) {
          const text = lines[i].replace(/^[\s]*[-*+]\s+/, '');
          const listItem = $createListItemNode();
          listItem.append(parseInlineMarkdown(text));
          list.append(listItem);
          i++;
        }
        
        root.append(list);
        continue;
      }
      
      // Ordered lists
      if (line.match(/^[\s]*\d+\.\s+/)) {
        const list = $createListNode('number');
        
        while (i < lines.length && lines[i].match(/^[\s]*\d+\.\s+/)) {
          const text = lines[i].replace(/^[\s]*\d+\.\s+/, '');
          const listItem = $createListItemNode();
          listItem.append(parseInlineMarkdown(text));
          list.append(listItem);
          i++;
        }
        
        root.append(list);
        continue;
      }
      
      // Regular paragraphs
      const paragraph = $createParagraphNode();
      paragraph.append(parseInlineMarkdown(line));
      root.append(paragraph);
      i++;
    }
  });
}

/**
 * Parse inline markdown formatting (bold, italic, links, etc.)
 */
function parseInlineMarkdown(text: string): any {
  const nodes: any[] = [];
  let currentText = '';
  let i = 0;
  
  while (i < text.length) {
    // Bold (**text** or __text__)
    if ((text[i] === '*' && text[i + 1] === '*') || (text[i] === '_' && text[i + 1] === '_')) {
      if (currentText) {
        nodes.push($createTextNode(currentText));
        currentText = '';
      }
      
      const delimiter = text.slice(i, i + 2);
      i += 2;
      let boldText = '';
      
      while (i < text.length - 1 && text.slice(i, i + 2) !== delimiter) {
        boldText += text[i];
        i++;
      }
      
      if (text.slice(i, i + 2) === delimiter) {
        const node = $createTextNode(boldText);
        node.toggleFormat('bold');
        nodes.push(node);
        i += 2;
      } else {
        currentText += delimiter + boldText;
      }
      continue;
    }
    
    // Italic (*text* or _text_)
    if (text[i] === '*' || text[i] === '_') {
      if (currentText) {
        nodes.push($createTextNode(currentText));
        currentText = '';
      }
      
      const delimiter = text[i];
      i++;
      let italicText = '';
      
      while (i < text.length && text[i] !== delimiter) {
        italicText += text[i];
        i++;
      }
      
      if (text[i] === delimiter) {
        const node = $createTextNode(italicText);
        node.toggleFormat('italic');
        nodes.push(node);
        i++;
      } else {
        currentText += delimiter + italicText;
      }
      continue;
    }
    
    // Inline code (`code`)
    if (text[i] === '`') {
      if (currentText) {
        nodes.push($createTextNode(currentText));
        currentText = '';
      }
      
      i++;
      let codeText = '';
      
      while (i < text.length && text[i] !== '`') {
        codeText += text[i];
        i++;
      }
      
      if (text[i] === '`') {
        const node = $createTextNode(codeText);
        node.toggleFormat('code');
        nodes.push(node);
        i++;
      } else {
        currentText += '`' + codeText;
      }
      continue;
    }
    
    // Links [text](url)
    if (text[i] === '[') {
      const linkMatch = text.slice(i).match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        if (currentText) {
          nodes.push($createTextNode(currentText));
          currentText = '';
        }
        
        const linkText = linkMatch[1];
        const url = linkMatch[2];
        const link = $createLinkNode(url);
        link.append($createTextNode(linkText));
        nodes.push(link);
        i += linkMatch[0].length;
        continue;
      }
    }
    
    // Strikethrough (~~text~~)
    if (text[i] === '~' && text[i + 1] === '~') {
      if (currentText) {
        nodes.push($createTextNode(currentText));
        currentText = '';
      }
      
      i += 2;
      let strikeText = '';
      
      while (i < text.length - 1 && text.slice(i, i + 2) !== '~~') {
        strikeText += text[i];
        i++;
      }
      
      if (text.slice(i, i + 2) === '~~') {
        const node = $createTextNode(strikeText);
        node.toggleFormat('strikethrough');
        nodes.push(node);
        i += 2;
      } else {
        currentText += '~~' + strikeText;
      }
      continue;
    }
    
    currentText += text[i];
    i++;
  }
  
  if (currentText) {
    nodes.push($createTextNode(currentText));
  }
  
  return nodes.length > 0 ? nodes : $createTextNode(text);
}

/**
 * Load Markdown from file
 */
export function loadMarkdownFromFile(
  editor: LexicalEditor,
  file: File,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): void {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const markdown = event.target?.result as string;
      importFromMarkdown(editor, markdown);
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

/**
 * Paste Markdown from clipboard
 */
export async function pasteMarkdownFromClipboard(editor: LexicalEditor): Promise<boolean> {
  try {
    const markdown = await navigator.clipboard.readText();
    importFromMarkdown(editor, markdown);
    return true;
  } catch (error) {
    console.error('Failed to paste markdown:', error);
    return false;
  }
}
