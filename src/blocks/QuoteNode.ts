import { ElementNode, NodeKey, LexicalNode, EditorConfig, DOMConversionMap, DOMExportOutput } from "lexical";

export class QuoteNode extends ElementNode {
  static getType() { return "quote"; }
  
  static clone(node: QuoteNode): QuoteNode { 
    return new QuoteNode(node.__key); 
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("blockquote");
    dom.className = "quote-block";
    return dom;
  }

  updateDOM(): boolean { return false; }

  static importJSON(serializedNode: any): QuoteNode {
    return new QuoteNode();
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "quote",
      version: 1,
    };
  }
}