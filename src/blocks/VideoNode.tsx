import { DecoratorNode, NodeKey, SerializedLexicalNode, Spread, LexicalEditor } from "lexical";
import React, { JSX, useCallback, useEffect, useRef, useState } from "react";

export type SerializedVideoNode = Spread<
  {
    src: string;
    width?: number;
    height?: number;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
  },
  SerializedLexicalNode
>;

function VideoComponent({ 
  src, 
  width: initialWidth,
  height: initialHeight,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  nodeKey,
  editor
}: { 
  src: string; 
  width?: number;
  height?: number;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  nodeKey: NodeKey;
  editor: LexicalEditor;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [size, setSize] = useState({ 
    width: initialWidth || 640, 
    height: initialHeight || 360 
  });
  const [settings, setSettings] = useState({
    autoplay,
    loop,
    muted,
    controls
  });

  useEffect(() => {
    // Load video dimensions if not set
    if (videoRef.current && (!size.width || !size.height)) {
      const video = videoRef.current;
      const onLoadedMetadata = () => {
        setSize({
          width: initialWidth || video.videoWidth || 640,
          height: initialHeight || video.videoHeight || 360
        });
      };
      
      if (video.readyState >= 1) {
        onLoadedMetadata();
      } else {
        video.addEventListener('loadedmetadata', onLoadedMetadata);
        return () => video.removeEventListener('loadedmetadata', onLoadedMetadata);
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

      if (direction === 'e' || direction === 'ne' || direction === 'se') {
        newWidth = Math.max(200, startWidth + deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction === 'w' || direction === 'nw' || direction === 'sw') {
        newWidth = Math.max(200, startWidth - deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction === 'n') {
        newHeight = Math.max(150, startHeight - deltaY);
        newWidth = newHeight * aspectRatio;
      } else if (direction === 's') {
        newHeight = Math.max(150, startHeight + deltaY);
        newWidth = newHeight * aspectRatio;
      }

      finalWidth = newWidth;
      finalHeight = newHeight;
      setSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      
      editor.update(() => {
        const node = editor.getEditorState()._nodeMap.get(nodeKey);
        if (node && node instanceof VideoNode) {
          const writable = node.getWritable() as VideoNode;
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

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    
    editor.update(() => {
      const node = editor.getEditorState()._nodeMap.get(nodeKey);
      if (node && node instanceof VideoNode) {
        const writable = node.getWritable() as VideoNode;
        writable.__autoplay = updated.autoplay;
        writable.__loop = updated.loop;
        writable.__muted = updated.muted;
        writable.__controls = updated.controls;
      }
    });
  };

  const deleteVideo = () => {
    editor.update(() => {
      const node = editor.getEditorState()._nodeMap.get(nodeKey);
      if (node) {
        node.remove();
      }
    });
  };

  return (
    <div 
      ref={wrapperRef}
      className={`video-node-wrapper ${isSelected ? 'selected' : ''} ${isResizing ? 'resizing' : ''}`}
      onClick={() => setIsSelected(!isSelected)}
      style={{ 
        width: size.width ? `${size.width}px` : 'auto',
        maxWidth: '100%',
        position: 'relative',
        display: 'inline-block',
        margin: '16px 0',
        cursor: isSelected ? 'default' : 'pointer'
      }}
    >
      <video 
        ref={videoRef}
        src={src}
        autoPlay={settings.autoplay}
        loop={settings.loop}
        muted={settings.muted}
        controls={settings.controls}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: '4px',
          border: isSelected ? '2px solid #667eea' : '2px solid transparent',
          transition: 'border-color 0.2s',
          backgroundColor: '#000'
        }}
      />
      
      {isSelected && (
        <>
          {/* Control Buttons */}
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
              style={{
                padding: '8px 16px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.2s'
              }}
            >
              ⚙️ Settings
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Delete this video?')) {
                  deleteVideo();
                }
              }}
              style={{
                padding: '8px 16px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.2s'
              }}
            >
              🗑️ Delete
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: '8px',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 20,
              minWidth: '200px'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Video Settings</h4>
              
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.controls}
                  onChange={(e) => updateSettings({ controls: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                Show Controls
              </label>

              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.autoplay}
                  onChange={(e) => updateSettings({ autoplay: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                Autoplay
              </label>

              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.loop}
                  onChange={(e) => updateSettings({ loop: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                Loop
              </label>

              <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.muted}
                  onChange={(e) => updateSettings({ muted: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                Muted
              </label>
            </div>
          )}
          
          {/* Resize Handles */}
          <div 
            className="video-resize-handle video-resize-handle-se"
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
          <div 
            className="video-resize-handle video-resize-handle-sw"
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
            className="video-resize-handle video-resize-handle-ne"
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
            className="video-resize-handle video-resize-handle-nw"
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
        </>
      )}
    </div>
  );
}

export class VideoNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __width?: number;
  __height?: number;
  __autoplay?: boolean;
  __loop?: boolean;
  __muted?: boolean;
  __controls?: boolean;

  static getType() { return "video"; }
  
  static clone(node: VideoNode): VideoNode { 
    return new VideoNode(
      node.__src, 
      node.__width, 
      node.__height,
      node.__autoplay,
      node.__loop,
      node.__muted,
      node.__controls,
      node.__key
    ); 
  }

  static isInline(): boolean {
    return true;
  }

  constructor(
    src: string, 
    width?: number, 
    height?: number,
    autoplay: boolean = false,
    loop: boolean = false,
    muted: boolean = false,
    controls: boolean = true,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__width = width;
    this.__height = height;
    this.__autoplay = autoplay;
    this.__loop = loop;
    this.__muted = muted;
    this.__controls = controls;
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
      <VideoComponent 
        src={this.__src}
        width={this.__width}
        height={this.__height}
        autoplay={this.__autoplay}
        loop={this.__loop}
        muted={this.__muted}
        controls={this.__controls}
        nodeKey={this.__key}
        editor={editor}
      />
    );
  }

  exportJSON(): SerializedVideoNode {
    return { 
      type: "video", 
      src: this.__src,
      width: this.__width,
      height: this.__height,
      autoplay: this.__autoplay,
      loop: this.__loop,
      muted: this.__muted,
      controls: this.__controls,
      version: 1 
    };
  }

  static importJSON(serializedNode: SerializedVideoNode): VideoNode {
    return new VideoNode(
      serializedNode.src,
      serializedNode.width,
      serializedNode.height,
      serializedNode.autoplay,
      serializedNode.loop,
      serializedNode.muted,
      serializedNode.controls
    );
  }
}
