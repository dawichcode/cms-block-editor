import { HeadingNode, QuoteNode as LexicalQuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { AutoLinkNode, LinkNode as LexicalLinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { ImageNode } from "../blocks/ImageNode";
import { QuoteNode } from "../blocks/QuoteNode";
import { ColumnsNode, ColumnNode } from "../blocks/ColumnsNode";
import { YouTubeNode } from "../blocks/YouTubeNode";
import { SectionNode } from "../blocks/SectionNode";
import { EmbedNode } from "../blocks/EmbedNode";

export function createEditorConfig(value?: string) {
  return {
    namespace: "CMSBlockEditor",
    editorState: value || undefined,
    theme: {
      text: {
        bold: 'cms-text-bold',
        italic: 'cms-text-italic',
        underline: 'cms-text-underline',
        strikethrough: 'cms-text-strikethrough',
        code: 'cms-text-code',
      },
      link: 'cms-link',
      code: 'cms-code-block',
      quote: 'cms-quote-block',
    },
    onError(error: Error) {
      console.error('Lexical error:', error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      AutoLinkNode,
      LexicalLinkNode,
      CodeNode,
      ImageNode,
      QuoteNode,
      ColumnsNode,
      ColumnNode,
      YouTubeNode,
      LexicalQuoteNode,
      SectionNode,
      EmbedNode,
    ],
  };
}