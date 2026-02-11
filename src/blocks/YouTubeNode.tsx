import { DecoratorNode, NodeKey, SerializedLexicalNode, Spread, LexicalEditor } from "lexical";
import React, { JSX, useCallback, useRef, useState } from "react";

export type SerializedYouTubeNode = Spread<
  {
    id: string;
    width?: number;
    height?: number;
  },
  SerializedLexicalNode
>;

function YouTubeComponent({
  id,
  width: initialWidth,
  height: initialHeight,
  nodeKey,
  editor
}: {
  id: string;
  width?: number;
  height?: number;
  nodeKey: NodeKey;
  editor: LexicalEditor;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState({
    width: initialWidth || 560,
    height: initialHeight || 315
  });

  const onResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const aspectRatio = 560 / 315; // YouTube aspect ratio

    let finalWidth = startWidth;
    let finalHeight = startHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;

      // Handle different resize directions
      if (direction === 'e' || direction === 'ne' || direction === 'se') {
        newWidth = Math.max(280, startWidth + deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction === 'w' || direction === 'nw' || direction === 'sw') {
        newWidth = Math.max(280, startWidth - deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction === 'n') {
        newHeight = Math.max(158, startHeight - deltaY);
        newWidth = newHeight * aspectRatio;
      } else if (direction === 's') {
        newHeight = Math.max(158, startHeight + deltaY);
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
        if (node && node instanceof YouTubeNode) {
          const writable = node.getWritable() as YouTubeNode;
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
              const newNode = new YouTubeNode(id, size.width, size.height);
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
  }, [id, size, nodeKey, editor]);

  return (
    <div
      ref={wrapperRef}
      className={`youtube-node-wrapper ${isSelected ? 'selected' : ''} ${isResizing ? 'resizing' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={() => setIsSelected(!isSelected)}
      onMouseDown={isSelected ? onDragStart : undefined}
      style={{
        width: `${size.width}px`,
        maxWidth: '100%',
        position: 'relative',
        display: 'inline-block',
        margin: '16px 0',
        cursor: isSelected ? 'move' : 'pointer'
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        width={size.width}
        height={size.height}
        allowFullScreen
        style={{
          width: '100%',
          height: `${size.height}px`,
          display: 'block',
          borderRadius: '8px',
          border: isSelected ? '2px solid #667eea' : '2px solid transparent',
          transition: 'border-color 0.2s'
        }}
      />
      {isSelected && (
        <>
          {/* Corner handles */}
          <div
            className="youtube-resize-handle youtube-resize-handle-nw"
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
              border: '2px solid white',
              zIndex: 10
            }}
          />
          <div
            className="youtube-resize-handle youtube-resize-handle-ne"
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
              border: '2px solid white',
              zIndex: 10
            }}
          />
          <div
            className="youtube-resize-handle youtube-resize-handle-sw"
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
              border: '2px solid white',
              zIndex: 10
            }}
          />
          <div
            className="youtube-resize-handle youtube-resize-handle-se"
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
              border: '2px solid white',
              zIndex: 10
            }}
          />
          
          {/* Edge handles */}
          <div
            className="youtube-resize-handle youtube-resize-handle-n"
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
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          />
          <div
            className="youtube-resize-handle youtube-resize-handle-s"
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
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          />
          <div
            className="youtube-resize-handle youtube-resize-handle-e"
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
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          />
          <div
            className="youtube-resize-handle youtube-resize-handle-w"
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
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          />
        </>
      )}
    </div>
  );
}

export class YouTubeNode extends DecoratorNode<JSX.Element> {
  __id: string;
  __width?: number;
  __height?: number;

  static getType() { return "youtube"; }

  static clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(node.__id, node.__width, node.__height, node.__key);
  }

  static isInline(): boolean {
    return true;
  }

  constructor(id: string, width?: number, height?: number, key?: NodeKey) {
    super(key);
    this.__id = id;
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
      <YouTubeComponent
        id={this.__id}
        width={this.__width}
        height={this.__height}
        nodeKey={this.__key}
        editor={editor}
      />
    );
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      type: "youtube",
      id: this.__id,
      width: this.__width,
      height: this.__height,
      version: 1
    };
  }

  static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
    return new YouTubeNode(
      serializedNode.id,
      serializedNode.width,
      serializedNode.height
    );
  }
}
