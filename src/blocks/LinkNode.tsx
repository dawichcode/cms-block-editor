import { 
  $applyNodeReplacement,
  $isElementNode,
  DOMConversionMap,
  DOMConversionOutput,
  EditorConfig,
  ElementNode,
  LexicalNode,
  NodeKey,
  RangeSelection,
  SerializedElementNode,
  Spread
} from 'lexical';

export type SerializedLinkNode = Spread<
  {
    url: string;
    target?: string;
    rel?: string;
    title?: string;
  },
  SerializedElementNode
>;

export class LinkNode extends ElementNode {
  __url: string;
  __target: string | null;
  __rel: string | null;
  __title: string | null;

  static getType(): string {
    return 'link';
  }

  static clone(node: LinkNode): LinkNode {
    return new LinkNode(
      node.__url,
      { target: node.__target, rel: node.__rel, title: node.__title },
      node.__key
    );
  }

  constructor(
    url: string,
    attributes: { target?: string | null; rel?: string | null; title?: string | null } = {},
    key?: NodeKey
  ) {
    super(key);
    const { target = null, rel = null, title = null } = attributes;
    this.__url = url;
    this.__target = target;
    this.__rel = rel;
    this.__title = title;
  }

  createDOM(config: EditorConfig): HTMLAnchorElement {
    const element = document.createElement('a');
    element.href = this.__url;
    if (this.__target !== null) {
      element.target = this.__target;
    }
    if (this.__rel !== null) {
      element.rel = this.__rel;
    }
    if (this.__title !== null) {
      element.title = this.__title;
    }
    element.className = 'cms-link';
    return element;
  }

  updateDOM(
    prevNode: LinkNode,
    anchor: HTMLAnchorElement,
    config: EditorConfig
  ): boolean {
    const url = this.__url;
    const target = this.__target;
    const rel = this.__rel;
    const title = this.__title;

    if (url !== prevNode.__url) {
      anchor.href = url;
    }

    if (target !== prevNode.__target) {
      if (target) {
        anchor.target = target;
      } else {
        anchor.removeAttribute('target');
      }
    }

    if (rel !== prevNode.__rel) {
      if (rel) {
        anchor.rel = rel;
      } else {
        anchor.removeAttribute('rel');
      }
    }

    if (title !== prevNode.__title) {
      if (title) {
        anchor.title = title;
      } else {
        anchor.removeAttribute('title');
      }
    }

    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      a: (node: Node) => ({
        conversion: convertAnchorElement,
        priority: 1,
      }),
    };
  }

  static importJSON(serializedNode: SerializedLinkNode): LinkNode {
    const node = $createLinkNode(serializedNode.url, {
      target: serializedNode.target,
      rel: serializedNode.rel,
      title: serializedNode.title,
    });
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON(): SerializedLinkNode {
    return {
      ...super.exportJSON(),
      type: 'link',
      url: this.getURL(),
      target: this.getTarget() as any,
      rel: this.getRel() as any,
      title: this.getTitle() as any,
      version: 1,
    };
  }

  getURL(): string {
    return this.getLatest().__url;
  }

  setURL(url: string): void {
    const writable = this.getWritable();
    writable.__url = url;
  }

  getTarget(): string | null {
    return this.getLatest().__target;
  }

  setTarget(target: string | null): void {
    const writable = this.getWritable();
    writable.__target = target;
  }

  getRel(): string | null {
    return this.getLatest().__rel;
  }

  setRel(rel: string | null): void {
    const writable = this.getWritable();
    writable.__rel = rel;
  }

  getTitle(): string | null {
    return this.getLatest().__title;
  }

  setTitle(title: string | null): void {
    const writable = this.getWritable();
    writable.__title = title;
  }

  insertNewAfter(selection: RangeSelection): null | ElementNode {
    const element = this.getParentOrThrow().insertNewAfter(selection);
    if ($isElementNode(element)) {
      const linkNode = $createLinkNode(this.__url, {
        target: this.__target,
        rel: this.__rel,
        title: this.__title,
      });
      element.append(linkNode);
      return linkNode;
    }
    return null;
  }

  canInsertTextBefore(): false {
    return false;
  }

  canInsertTextAfter(): false {
    return false;
  }

  canBeEmpty(): false {
    return false;
  }

  isInline(): true {
    return true;
  }
}

function convertAnchorElement(domNode: Node): DOMConversionOutput {
  let node = null;
  if (domNode instanceof HTMLAnchorElement) {
    const content = domNode.textContent;
    if (content !== null && content !== '') {
      node = $createLinkNode(domNode.getAttribute('href') || '', {
        target: domNode.getAttribute('target'),
        rel: domNode.getAttribute('rel'),
        title: domNode.getAttribute('title'),
      });
    }
  }
  return { node };
}

export function $createLinkNode(
  url: string,
  attributes?: { target?: string | null; rel?: string | null; title?: string | null }
): LinkNode {
  return $applyNodeReplacement(new LinkNode(url, attributes));
}

export function $isLinkNode(
  node: LexicalNode | null | undefined
): node is LinkNode {
  return node instanceof LinkNode;
}
