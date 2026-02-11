import { 
  $getRoot, 
  $isTextNode, 
  $isElementNode,
  LexicalEditor,
  LexicalNode,
  ElementNode
} from "lexical";
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { $isListNode, $isListItemNode } from "@lexical/list";
import { $isLinkNode } from "@lexical/link";
import { $isCodeNode } from "@lexical/code";

/**
 * Export editor content as Markdown string
 */
export function exportToMarkdown(editor: LexicalEditor): string {
  let markdown = '';
  
  editor.getEditorState().read(() => {
    const root = $getRoot();
    markdown = convertNodeToMarkdown(root);
  });
  
  return markdown.trim();
}

function convertNodeToMarkdown(node: LexicalNode, listDepth: number = 0): string {
  let markdown = '';
  
  // Handle text nodes
  if ($isTextNode(node)) {
    let text = node.getTextContent();
    
    // Apply text formatting
    if (node.hasFormat('bold')) {
      text = `**${text}**`;
    }
    if (node.hasFormat('italic')) {
      text = `*${text}*`;
    }
    if (node.hasFormat('code')) {
      text = `\`${text}\``;
    }
    if (node.hasFormat('strikethrough')) {
      text = `~~${text}~~`;
    }
    
    return text;
  }
  
  // Handle element nodes
  if ($isElementNode(node)) {
    // Heading nodes
    if ($isHeadingNode(node)) {
      const level = node.getTag();
      const prefix = '#'.repeat(parseInt(level.replace('h', '')));
      const text = getTextContent(node);
      return `${prefix} ${text}\n\n`;
    }
    
    // Quote nodes
    if ($isQuoteNode(node)) {
      const text = getTextContent(node);
      return `> ${text}\n\n`;
    }
    
    // Code nodes
    if ($isCodeNode(node)) {
      const code = getTextContent(node);
      return `\`\`\`\n${code}\n\`\`\`\n\n`;
    }
    
    // List nodes
    if ($isListNode(node)) {
      const listType = node.getListType();
      const children = node.getChildren();
      
      children.forEach((child, index) => {
        if ($isListItemNode(child)) {
          const text = getTextContent(child);
          const indent = '  '.repeat(listDepth);
          
          if (listType === 'bullet') {
            markdown += `${indent}- ${text}\n`;
          } else {
            markdown += `${indent}${index + 1}. ${text}\n`;
          }
        }
      });
      
      markdown += '\n';
      return markdown;
    }
    
    // List item nodes (handled by parent list)
    if ($isListItemNode(node)) {
      return '';
    }
    
    // Link nodes
    if ($isLinkNode(node)) {
      const text = getTextContent(node);
      const url = node.getURL();
      return `[${text}](${url})`;
    }
    
    // Paragraph nodes
    const children = node.getChildren();
    if (children.length === 0) {
      return '\n';
    }
    
    children.forEach((child) => {
      markdown += convertNodeToMarkdown(child, listDepth);
    });
    
    // Add paragraph break if this is a paragraph-like node
    if (node.getType() === 'paragraph' && markdown.trim()) {
      markdown += '\n\n';
    }
  }
  
  return markdown;
}

function getTextContent(node: ElementNode): string {
  let text = '';
  const children = node.getChildren();
  
  children.forEach((child) => {
    if ($isTextNode(child)) {
      text += child.getTextContent();
    } else if ($isElementNode(child)) {
      text += getTextContent(child);
    }
  });
  
  return text;
}

/**
 * Download Markdown content as file
 */
export function downloadMarkdown(
  editor: LexicalEditor,
  filename: string = 'content.md'
): void {
  const markdown = exportToMarkdown(editor);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy Markdown to clipboard
 */
export async function copyMarkdownToClipboard(editor: LexicalEditor): Promise<boolean> {
  try {
    const markdown = exportToMarkdown(editor);
    await navigator.clipboard.writeText(markdown);
    return true;
  } catch (error) {
    console.error('Failed to copy markdown:', error);
    return false;
  }
}
