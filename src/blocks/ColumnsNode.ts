import { ElementNode, NodeKey, EditorConfig, SerializedElementNode, Spread } from "lexical";

export type LayoutType = '2-column' | '3-column' | '4-column' | 'grid-2x2' | 'grid-3x3';

export type SerializedColumnsNode = Spread<
  {
    layoutType: LayoutType;
  },
  SerializedElementNode
>;

export class ColumnsNode extends ElementNode {
  __layoutType: LayoutType;

  static getType() { return "columns"; }
  
  static clone(node: ColumnsNode): ColumnsNode { 
    return new ColumnsNode(node.__layoutType, node.__key); 
  }

  constructor(layoutType: LayoutType = '2-column', key?: NodeKey) {
    super(key);
    this.__layoutType = layoutType;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("div");
    dom.className = `columns-block columns-${this.__layoutType}`;
    return dom;
  }

  updateDOM(prevNode: ColumnsNode): boolean { 
    return prevNode.__layoutType !== this.__layoutType;
  }

  getLayoutType(): LayoutType {
    return this.__layoutType;
  }

  setLayoutType(layoutType: LayoutType): void {
    const writable = this.getWritable();
    writable.__layoutType = layoutType;
  }

  static importJSON(serializedNode: SerializedColumnsNode): ColumnsNode {
    return new ColumnsNode(serializedNode.layoutType);
  }

  exportJSON(): SerializedColumnsNode {
    return {
      ...super.exportJSON(),
      type: "columns",
      layoutType: this.__layoutType,
      version: 1,
    };
  }
}

export class ColumnNode extends ElementNode {
  static getType() { return "column"; }

  static clone(node: ColumnNode): ColumnNode {
    return new ColumnNode(node.__key);
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("div");
    dom.className = "column";
    return dom;
  }

  updateDOM(): boolean { return false; }

  static importJSON(serializedNode: any): ColumnNode {
    return new ColumnNode();
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "column",
      version: 1,
    };
  }
}

export function $createColumnsNode(layoutType: LayoutType = '2-column'): ColumnsNode {
  return new ColumnsNode(layoutType);
}

export function $createColumnNode(): ColumnNode {
  return new ColumnNode();
}

export function $isColumnsNode(node: any): node is ColumnsNode {
  return node instanceof ColumnsNode;
}

export function $isColumnNode(node: any): node is ColumnNode {
  return node instanceof ColumnNode;
}