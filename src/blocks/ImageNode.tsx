import { DecoratorNode, NodeKey, SerializedLexicalNode, Spread, LexicalEditor } from "lexical";
import React, { JSX, useCallback, useEffect, useRef, useState } from "react";
import { OPEN_IMAGE_EDITOR_COMMAND } from "../plugins/ImageEditorPlugin";

export type SerializedImageNode = Spread<
  {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  },
  SerializedLexicalNode
>;

function ImageComponent({ 
  src, 
  alt, 
  width: initialWidth,
  height: initialHeight,
  nodeKey,
  editor
}: { 
  src: string; 
  alt: string; 
  width?: number;
  height?: number;
  nodeKey: NodeKey;
  editor: LexicalEditor;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState({ 
    width: initialWidth || 0, 
    height: initialHeight || 0 
  });

  useEffect(() => {
    // Load natural dimensions if not set
    if (imageRef.current && (!size.width || !size.height)) {
      const img = imageRef.current;
      const onLoad = () => {
        setSize({
          width: initialWidth || img.naturalWidth,
          height: initialHeight || img.naturalHeight
        });
      };
      
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener('load', onLoad);
        return () => img.removeEventListener('load', onLoad);
      }
    }
  }, [initialWidth, initialHeight, size.width, size.height]);

  const onResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const aspectRatio = startWidth / startHeight;

    let finalWidth = startWidth;
    let finalHeight = startHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;

      // Handle different resize directions
      if (direction === 'e' || direction === 'ne' || direction === 'se') {
        newWidth = Math.max(100, startWidth + deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction === 'w' || direction === 'nw' || direction === 'sw') {
        newWidth = Math.max(100, startWidth - deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction === 'n') {
        newHeight = Math.max(100, startHeight - deltaY);
        newWidth = newHeight * aspectRatio;
      } else if (direction === 's') {
        newHeight = Math.max(100, startHeight + deltaY);
        newWidth = newHeight * aspectRatio;
      }

      finalWidth = newWidth;
      finalHeight = newHeight;
      setSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      
      // Update the node with new dimensions
      editor.update(() => {
        const node = editor.getEditorState()._nodeMap.get(nodeKey);
        if (node && node instanceof ImageNode) {
          const writable = node.getWritable() as ImageNode;
          writable.__width = finalWidth;
          writable.__height = finalHeight;
        }
      });
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [size, editor, nodeKey]);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    // Don't start drag if clicking on resize handles
    if ((e.target as HTMLElement).className.includes('resize-handle')) {
      return;
    }
    
    e.preventDefault();
    setIsDragging(true);
    
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Create a dragging clone
    const clone = wrapper.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '0.5';
    clone.style.zIndex = '9999';
    clone.style.left = `${e.clientX - wrapper.offsetWidth / 2}px`;
    clone.style.top = `${e.clientY - wrapper.offsetHeight / 2}px`;
    document.body.appendChild(clone);

    const onMouseMove = (moveEvent: MouseEvent) => {
      clone.style.left = `${moveEvent.clientX - wrapper.offsetWidth / 2}px`;
      clone.style.top = `${moveEvent.clientY - wrapper.offsetHeight / 2}px`;
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      setIsDragging(false);
      document.body.removeChild(clone);
      
      // Find the drop target in the editor
      const dropTarget = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      if (dropTarget && dropTarget.closest('.editor-content')) {
        // Move the node in Lexical
        editor.update(() => {
          const node = editor.getEditorState()._nodeMap.get(nodeKey);
          if (node) {
            // Remove from current position
            node.remove();
            
            // Insert at new position (simplified - inserts at end)
            const root = editor.getEditorState()._nodeMap.get('root');
            if (root) {
              const newNode = new ImageNode(src, alt, size.width, size.height);
              //@ts-ignore
              root.append(newNode);
            }
          }
        });
      }
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [src, alt, size, nodeKey, editor]);

  return (
    <div 
      ref={wrapperRef}
      className={`image-node-wrapper ${isSelected ? 'selected' : ''} ${isResizing ? 'resizing' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={() => setIsSelected(!isSelected)}
      onMouseDown={isSelected ? onDragStart : undefined}
      style={{ 
        width: size.width ? `${size.width}px` : 'auto',
        maxWidth: '100%',
        position: 'relative',
        display: 'inline-block',
        margin: '16px 0',
        cursor: isSelected ? 'move' : 'pointer'
      }}
    >
      <img 
        ref={imageRef}
        src={src} 
        alt={alt}
        draggable={false}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: '4px',
          border: isSelected ? '2px solid #667eea' : '2px solid transparent',
          transition: 'border-color 0.2s'
        }}
      />
      {isSelected && (
        <>
          {/* Edit Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              editor.dispatchCommand(OPEN_IMAGE_EDITOR_COMMAND, { nodeKey, src });
            }}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '8px 16px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 10,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#5568d3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#667eea';
            }}
          >
            ✏️ Edit
          </button>
          
          {/* Corner handles */}
          <div 
            className="image-resize-handle image-resize-handle-nw"
            onMouseDown={(e) => onResizeStart(e, 'nw')}
            style={{
              position: 'absolute',
              left: '-4px',
              top: '-4px',
              width: '12px',
              height: '12px',
              background: '#667eea',
              cursor: 'nwse-resize',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              border: '2px solid white'
            }}
          />
          <div 
            className="image-resize-handle image-resize-handle-ne"
            onMouseDown={(e) => onResizeStart(e, 'ne')}
            style={{
              position: 'absolute',
              right: '-4px',
              top: '-4px',
              width: '12px',
              height: '12px',
              background: '#667eea',
              cursor: 'nesw-resize',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              border: '2px solid white'
            }}
          />
          <div 
            className="image-resize-handle image-resize-handle-sw"
            onMouseDown={(e) => onResizeStart(e, 'sw')}
            style={{
              position: 'absolute',
              left: '-4px',
              bottom: '-4px',
              width: '12px',
              height: '12px',
              background: '#667eea',
              cursor: 'nesw-resize',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              border: '2px solid white'
            }}
          />
          <div 
            className="image-resize-handle image-resize-handle-se"
            onMouseDown={(e) => onResizeStart(e, 'se')}
            style={{
              position: 'absolute',
              right: '-4px',
              bottom: '-4px',
              width: '12px',
              height: '12px',
              background: '#667eea',
              cursor: 'nwse-resize',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              border: '2px solid white'
            }}
          />
          
          {/* Edge handles */}
          <div 
            className="image-resize-handle image-resize-handle-n"
            onMouseDown={(e) => onResizeStart(e, 'n')}
            style={{
              position: 'absolute',
              left: '50%',
              top: '-4px',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '8px',
              background: '#667eea',
              cursor: 'ns-resize',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
          <div 
            className="image-resize-handle image-resize-handle-s"
            onMouseDown={(e) => onResizeStart(e, 's')}
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '-4px',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '8px',
              background: '#667eea',
              cursor: 'ns-resize',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
          <div 
            className="image-resize-handle image-resize-handle-e"
            onMouseDown={(e) => onResizeStart(e, 'e')}
            style={{
              position: 'absolute',
              right: '-4px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '8px',
              height: '40px',
              background: '#667eea',
              cursor: 'ew-resize',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
          <div 
            className="image-resize-handle image-resize-handle-w"
            onMouseDown={(e) => onResizeStart(e, 'w')}
            style={{
              position: 'absolute',
              left: '-4px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '8px',
              height: '40px',
              background: '#667eea',
              cursor: 'ew-resize',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        </>
      )}
    </div>
  );
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __alt: string;
  __width?: number;
  __height?: number;

  static getType() { return "image"; }
  
  static clone(node: ImageNode): ImageNode { 
    return new ImageNode(node.__src, node.__alt, node.__width, node.__height, node.__key); 
  }

  static isInline(): boolean {
    return true;
  }

  constructor(src: string, alt: string = "", width?: number, height?: number, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__alt = alt;
    this.__width = width;
    this.__height = height;
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.maxWidth = '100%';
    return span;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(editor: LexicalEditor): JSX.Element {
    return (
      <ImageComponent 
        src={this.__src} 
        alt={this.__alt}
        width={this.__width}
        height={this.__height}
        nodeKey={this.__key}
        editor={editor}
      />
    );
  }

  exportJSON(): SerializedImageNode {
    return { 
      type: "image", 
      src: this.__src, 
      alt: this.__alt,
      width: this.__width,
      height: this.__height,
      version: 1 
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode(
      serializedNode.src, 
      serializedNode.alt,
      serializedNode.width,
      serializedNode.height
    );
  }
}
