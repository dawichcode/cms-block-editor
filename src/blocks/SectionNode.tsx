import { 
  ElementNode, 
  NodeKey, 
  EditorConfig, 
  SerializedElementNode,
  Spread,
  LexicalNode
} from "lexical";

export type SectionType = 
  | 'hero'
  | 'features'
  | 'cta'
  | 'testimonial'
  | 'pricing'
  | 'team'
  | 'stats'
  | 'faq'
  | 'contact'
  | 'newsletter';

export type LayoutType = 'block' | 'flex' | 'grid';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch';
export type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

export type SerializedSectionNode = Spread<
  {
    sectionType: SectionType;
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
    gradientOverlay?: string;
    opacity?: number;
    padding?: string;
    margin?: string;
    textAlign?: string;
    layoutType?: LayoutType;
    flexDirection?: FlexDirection;
    flexWrap?: string;
    alignItems?: AlignItems;
    justifyContent?: JustifyContent;
    gap?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
  },
  SerializedElementNode
>;

export class SectionNode extends ElementNode {
  __sectionType: SectionType;
  __backgroundColor?: string;
  __backgroundImage?: string;
  __backgroundSize?: string;
  __backgroundPosition?: string;
  __backgroundRepeat?: string;
  __gradientOverlay?: string;
  __opacity?: number;
  __padding?: string;
  __margin?: string;
  __textAlign?: string;
  __layoutType?: LayoutType;
  __flexDirection?: FlexDirection;
  __flexWrap?: string;
  __alignItems?: AlignItems;
  __justifyContent?: JustifyContent;
  __gap?: string;
  __gridTemplateColumns?: string;
  __gridTemplateRows?: string;

  static getType() { 
    return "section"; 
  }
  
  static clone(node: SectionNode): SectionNode { 
    const cloned = new SectionNode(
      node.__sectionType,
      node.__backgroundColor,
      node.__padding,
      node.__key
    );
    cloned.__backgroundImage = node.__backgroundImage;
    cloned.__backgroundSize = node.__backgroundSize;
    cloned.__backgroundPosition = node.__backgroundPosition;
    cloned.__backgroundRepeat = node.__backgroundRepeat;
    cloned.__gradientOverlay = node.__gradientOverlay;
    cloned.__opacity = node.__opacity;
    cloned.__margin = node.__margin;
    cloned.__textAlign = node.__textAlign;
    cloned.__layoutType = node.__layoutType;
    cloned.__flexDirection = node.__flexDirection;
    cloned.__flexWrap = node.__flexWrap;
    cloned.__alignItems = node.__alignItems;
    cloned.__justifyContent = node.__justifyContent;
    cloned.__gap = node.__gap;
    cloned.__gridTemplateColumns = node.__gridTemplateColumns;
    cloned.__gridTemplateRows = node.__gridTemplateRows;
    return cloned;
  }

  constructor(
    sectionType: SectionType = 'hero',
    backgroundColor?: string,
    padding?: string,
    key?: NodeKey
  ) {
    super(key);
    this.__sectionType = sectionType;
    this.__backgroundColor = backgroundColor;
    this.__padding = padding;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("section");
    dom.className = `cms-section cms-section-${this.__sectionType}`;
    
    // Background handling
    if (this.__backgroundImage) {
      dom.style.backgroundImage = this.__backgroundImage;
      dom.style.backgroundSize = this.__backgroundSize || 'cover';
      dom.style.backgroundPosition = this.__backgroundPosition || 'center';
      dom.style.backgroundRepeat = this.__backgroundRepeat || 'no-repeat';
      dom.style.position = 'relative';
      
      // Add gradient overlay if specified
      if (this.__gradientOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'cms-section-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.background = this.__gradientOverlay;
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '0';
        dom.appendChild(overlay);
      }
      
      // Ensure content is above background
      dom.style.isolation = 'isolate';
    } else if (this.__backgroundColor) {
      dom.style.backgroundColor = this.__backgroundColor;
    }
    
    if (this.__opacity !== undefined) {
      dom.style.opacity = this.__opacity.toString();
    }
    
    if (this.__padding) {
      dom.style.padding = this.__padding;
    }

    if (this.__margin) {
      dom.style.margin = this.__margin;
    }

    if (this.__textAlign) {
      dom.style.textAlign = this.__textAlign;
    }

    if (this.__layoutType) {
      dom.style.display = this.__layoutType;
    }

    if (this.__layoutType === 'flex') {
      if (this.__flexDirection) {
        dom.style.flexDirection = this.__flexDirection;
      }
      if (this.__flexWrap) {
        dom.style.flexWrap = this.__flexWrap;
      }
      if (this.__alignItems) {
        dom.style.alignItems = this.__alignItems;
      }
      if (this.__justifyContent) {
        dom.style.justifyContent = this.__justifyContent;
      }
    }

    if (this.__layoutType === 'grid') {
      if (this.__gridTemplateColumns) {
        dom.style.gridTemplateColumns = this.__gridTemplateColumns;
      }
      if (this.__gridTemplateRows) {
        dom.style.gridTemplateRows = this.__gridTemplateRows;
      }
    }

    if (this.__gap) {
      dom.style.gap = this.__gap;
    }
    
    return dom;
  }

  updateDOM(prevNode: SectionNode): boolean { 
    return (
      prevNode.__sectionType !== this.__sectionType ||
      prevNode.__backgroundColor !== this.__backgroundColor ||
      prevNode.__backgroundImage !== this.__backgroundImage ||
      prevNode.__backgroundSize !== this.__backgroundSize ||
      prevNode.__backgroundPosition !== this.__backgroundPosition ||
      prevNode.__backgroundRepeat !== this.__backgroundRepeat ||
      prevNode.__gradientOverlay !== this.__gradientOverlay ||
      prevNode.__opacity !== this.__opacity ||
      prevNode.__padding !== this.__padding ||
      prevNode.__margin !== this.__margin ||
      prevNode.__textAlign !== this.__textAlign ||
      prevNode.__layoutType !== this.__layoutType ||
      prevNode.__flexDirection !== this.__flexDirection ||
      prevNode.__flexWrap !== this.__flexWrap ||
      prevNode.__alignItems !== this.__alignItems ||
      prevNode.__justifyContent !== this.__justifyContent ||
      prevNode.__gap !== this.__gap ||
      prevNode.__gridTemplateColumns !== this.__gridTemplateColumns ||
      prevNode.__gridTemplateRows !== this.__gridTemplateRows
    );
  }

  getSectionType(): SectionType {
    return this.__sectionType;
  }

  setSectionType(sectionType: SectionType): void {
    const writable = this.getWritable();
    writable.__sectionType = sectionType;
  }

  getBackgroundColor(): string | undefined {
    return this.__backgroundColor;
  }

  setBackgroundColor(color: string | undefined): void {
    const writable = this.getWritable();
    writable.__backgroundColor = color;
  }

  getBackgroundImage(): string | undefined {
    return this.__backgroundImage;
  }

  setBackgroundImage(image: string | undefined): void {
    const writable = this.getWritable();
    writable.__backgroundImage = image;
  }

  getBackgroundSize(): string | undefined {
    return this.__backgroundSize;
  }

  setBackgroundSize(size: string | undefined): void {
    const writable = this.getWritable();
    writable.__backgroundSize = size;
  }

  getBackgroundPosition(): string | undefined {
    return this.__backgroundPosition;
  }

  setBackgroundPosition(position: string | undefined): void {
    const writable = this.getWritable();
    writable.__backgroundPosition = position;
  }

  getBackgroundRepeat(): string | undefined {
    return this.__backgroundRepeat;
  }

  setBackgroundRepeat(repeat: string | undefined): void {
    const writable = this.getWritable();
    writable.__backgroundRepeat = repeat;
  }

  getGradientOverlay(): string | undefined {
    return this.__gradientOverlay;
  }

  setGradientOverlay(gradient: string | undefined): void {
    const writable = this.getWritable();
    writable.__gradientOverlay = gradient;
  }

  getOpacity(): number | undefined {
    return this.__opacity;
  }

  setOpacity(opacity: number | undefined): void {
    const writable = this.getWritable();
    writable.__opacity = opacity;
  }

  getPadding(): string | undefined {
    return this.__padding;
  }

  setPadding(padding: string | undefined): void {
    const writable = this.getWritable();
    writable.__padding = padding;
  }

  getMargin(): string | undefined {
    return this.__margin;
  }

  setMargin(margin: string | undefined): void {
    const writable = this.getWritable();
    writable.__margin = margin;
  }

  getTextAlign(): string | undefined {
    return this.__textAlign;
  }

  setTextAlign(align: string | undefined): void {
    const writable = this.getWritable();
    writable.__textAlign = align;
  }

  getLayoutType(): LayoutType | undefined {
    return this.__layoutType;
  }

  setLayoutType(layoutType: LayoutType | undefined): void {
    const writable = this.getWritable();
    writable.__layoutType = layoutType;
  }

  getFlexDirection(): FlexDirection | undefined {
    return this.__flexDirection;
  }

  setFlexDirection(direction: FlexDirection | undefined): void {
    const writable = this.getWritable();
    writable.__flexDirection = direction;
  }

  getFlexWrap(): string | undefined {
    return this.__flexWrap;
  }

  setFlexWrap(wrap: string | undefined): void {
    const writable = this.getWritable();
    writable.__flexWrap = wrap;
  }

  getAlignItems(): AlignItems | undefined {
    return this.__alignItems;
  }

  setAlignItems(align: AlignItems | undefined): void {
    const writable = this.getWritable();
    writable.__alignItems = align;
  }

  getJustifyContent(): JustifyContent | undefined {
    return this.__justifyContent;
  }

  setJustifyContent(justify: JustifyContent | undefined): void {
    const writable = this.getWritable();
    writable.__justifyContent = justify;
  }

  getGap(): string | undefined {
    return this.__gap;
  }

  setGap(gap: string | undefined): void {
    const writable = this.getWritable();
    writable.__gap = gap;
  }

  getGridTemplateColumns(): string | undefined {
    return this.__gridTemplateColumns;
  }

  setGridTemplateColumns(columns: string | undefined): void {
    const writable = this.getWritable();
    writable.__gridTemplateColumns = columns;
  }

  getGridTemplateRows(): string | undefined {
    return this.__gridTemplateRows;
  }

  setGridTemplateRows(rows: string | undefined): void {
    const writable = this.getWritable();
    writable.__gridTemplateRows = rows;
  }

  static importJSON(serializedNode: SerializedSectionNode): SectionNode {
    const node = new SectionNode(
      serializedNode.sectionType,
      serializedNode.backgroundColor,
      serializedNode.padding
    );
    node.__backgroundImage = serializedNode.backgroundImage;
    node.__backgroundSize = serializedNode.backgroundSize;
    node.__backgroundPosition = serializedNode.backgroundPosition;
    node.__backgroundRepeat = serializedNode.backgroundRepeat;
    node.__gradientOverlay = serializedNode.gradientOverlay;
    node.__opacity = serializedNode.opacity;
    node.__margin = serializedNode.margin;
    node.__textAlign = serializedNode.textAlign;
    node.__layoutType = serializedNode.layoutType;
    node.__flexDirection = serializedNode.flexDirection;
    node.__flexWrap = serializedNode.flexWrap;
    node.__alignItems = serializedNode.alignItems;
    node.__justifyContent = serializedNode.justifyContent;
    node.__gap = serializedNode.gap;
    node.__gridTemplateColumns = serializedNode.gridTemplateColumns;
    node.__gridTemplateRows = serializedNode.gridTemplateRows;
    return node;
  }

  exportJSON(): SerializedSectionNode {
    return {
      ...super.exportJSON(),
      type: "section",
      sectionType: this.__sectionType,
      backgroundColor: this.__backgroundColor,
      backgroundImage: this.__backgroundImage,
      backgroundSize: this.__backgroundSize,
      backgroundPosition: this.__backgroundPosition,
      backgroundRepeat: this.__backgroundRepeat,
      gradientOverlay: this.__gradientOverlay,
      opacity: this.__opacity,
      padding: this.__padding,
      margin: this.__margin,
      textAlign: this.__textAlign,
      layoutType: this.__layoutType,
      flexDirection: this.__flexDirection,
      flexWrap: this.__flexWrap,
      alignItems: this.__alignItems,
      justifyContent: this.__justifyContent,
      gap: this.__gap,
      gridTemplateColumns: this.__gridTemplateColumns,
      gridTemplateRows: this.__gridTemplateRows,
      version: 1,
    };
  }

  canBeEmpty(): boolean {
    return false;
  }

  isShadowRoot(): boolean {
    return false;
  }
}

export function $createSectionNode(
  sectionType: SectionType = 'hero',
  backgroundColor?: string,
  padding?: string
): SectionNode {
  return new SectionNode(sectionType, backgroundColor, padding);
}

export function $isSectionNode(
  node: LexicalNode | null | undefined
): node is SectionNode {
  return node instanceof SectionNode;
}
