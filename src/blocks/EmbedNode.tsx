import { DecoratorNode, NodeKey, SerializedLexicalNode, Spread, LexicalEditor } from "lexical";
import React, { JSX, useCallback, useEffect, useRef, useState } from "react";

export type EmbedType = 'youtube' | 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'vimeo' | 'spotify' | 'soundcloud' | 'generic';

export type SerializedEmbedNode = Spread<
  {
    url: string;
    embedType: EmbedType;
    width?: number;
    height?: number;
  },
  SerializedLexicalNode
>;

// Helper functions to detect and parse embed URLs
function detectEmbedType(url: string): EmbedType {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('vimeo.com')) return 'vimeo';
  if (url.includes('spotify.com')) return 'spotify';
  if (url.includes('soundcloud.com')) return 'soundcloud';
  return 'generic';
}

function getYouTubeEmbedUrl(url: string): string {
  const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
}

function getVimeoEmbedUrl(url: string): string {
  const videoIdMatch = url.match(/vimeo\.com\/(\d+)/);
  return videoIdMatch ? `https://player.vimeo.com/video/${videoIdMatch[1]}` : url;
}

function getSpotifyEmbedUrl(url: string): string {
  // Convert Spotify URLs to embed format
  const match = url.match(/spotify\.com\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
  }
  return url;
}

function getEmbedUrl(url: string, type: EmbedType): string {
  switch (type) {
    case 'youtube':
      return getYouTubeEmbedUrl(url);
    case 'vimeo':
      return getVimeoEmbedUrl(url);
    case 'spotify':
      return getSpotifyEmbedUrl(url);
    case 'facebook':
      return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&width=500`;
    case 'instagram':
      return url; // Instagram uses oEmbed API
    case 'twitter':
      return url; // Twitter uses oEmbed API
    case 'tiktok':
      return url; // TikTok uses oEmbed API
    case 'soundcloud':
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
    default:
      return url;
  }
}

function EmbedComponent({
  url,
  type,
  width: initialWidth,
  height: initialHeight,
  nodeKey,
  editor
}: {
  url: string;
  type: EmbedType;
  width?: number;
  height?: number;
  nodeKey: NodeKey;
  editor: LexicalEditor;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [embedHtml, setEmbedHtml] = useState<string>('');
  
  // Use saved dimensions or defaults
  const width = initialWidth || (type === 'spotify' ? 300 : 560);
  const height = initialHeight || (type === 'spotify' ? 380 : 315);
  
  const [size, setSize] = useState({
    width,
    height
  });

  // Update size when props change
  useEffect(() => {
    setSize({
      width: initialWidth || (type === 'spotify' ? 300 : 560),
      height: initialHeight || (type === 'spotify' ? 380 : 315)
    });
  }, [initialWidth, initialHeight, type]);

  const embedUrl = getEmbedUrl(url, type);

  // Load oEmbed content for platforms that require it
  useEffect(() => {
    if (type === 'instagram' || type === 'twitter' || type === 'tiktok') {
      loadOEmbed(url, type);
    }
  }, [url, type]);

  const loadOEmbed = async (url: string, type: EmbedType) => {
    try {
      let oEmbedUrl = '';
      
      switch (type) {
        case 'instagram':
          oEmbedUrl = `https://graph.facebook.com/v12.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=YOUR_ACCESS_TOKEN`;
          break;
        case 'twitter':
          oEmbedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
          break;
        case 'tiktok':
          oEmbedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
          break;
      }

      if (oEmbedUrl) {
        const response = await fetch(oEmbedUrl);
        const data = await response.json();
        if (data.html) {
          setEmbedHtml(data.html);
        }
      }
    } catch (error) {
      console.error('Failed to load oEmbed:', error);
    }
  };

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
        newWidth = Math.max(280, startWidth + deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction === 'w' || direction === 'nw' || direction === 'sw') {
        newWidth = Math.max(280, startWidth - deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction === 'n') {
        newHeight = Math.max(200, startHeight - deltaY);
        newWidth = newHeight * aspectRatio;
      } else if (direction === 's') {
        newHeight = Math.max(200, startHeight + deltaY);
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
        if (node && node instanceof EmbedNode) {
          const writable = node.getWritable() as EmbedNode;
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

  const renderEmbed = () => {
    // For oEmbed platforms, render the HTML directly
    if (embedHtml && (type === 'instagram' || type === 'twitter' || type === 'tiktok')) {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: embedHtml }}
          style={{ maxWidth: '100%' }}
        />
      );
    }

    // For iframe-based embeds
    if (type === 'youtube' || type === 'vimeo' || type === 'facebook' || type === 'spotify' || type === 'soundcloud') {
      return (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            border: 'none',
            borderRadius: '8px'
          }}
        />
      );
    }

    // Fallback for generic embeds
    return (
      <div style={{
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 10px 0', color: '#6c757d' }}>Embedded Content</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#667eea', textDecoration: 'underline' }}
        >
          {url}
        </a>
      </div>
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={`embed-node-wrapper embed-${type} ${isSelected ? 'selected' : ''} ${isResizing ? 'resizing' : ''}`}
      onClick={() => setIsSelected(!isSelected)}
      style={{
        width: `${size.width}px`,
        height: type === 'instagram' || type === 'twitter' || type === 'tiktok' ? 'auto' : `${size.height}px`,
        maxWidth: '100%',
        position: 'relative',
        display: 'inline-block',
        margin: '20px 0',
        cursor: isSelected ? 'default' : 'pointer',
        border: isSelected ? '2px solid #667eea' : '2px solid transparent',
        borderRadius: '8px',
        transition: 'border-color 0.2s'
      }}
    >
      {renderEmbed()}
      
      {isSelected && (type === 'youtube' || type === 'vimeo' || type === 'facebook' || type === 'spotify' || type === 'soundcloud') && (
        <>
          {/* Resize handles - only for iframe embeds */}
          <div 
            className="embed-resize-handle embed-resize-handle-se"
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
          <div 
            className="embed-resize-handle embed-resize-handle-ne"
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
        </>
      )}
    </div>
  );
}

export class EmbedNode extends DecoratorNode<JSX.Element> {
  __url: string;
  __type: EmbedType;
  __width?: number;
  __height?: number;

  static getType() { return "embed"; }
  
  static clone(node: EmbedNode): EmbedNode { 
    return new EmbedNode(node.__url, node.__type, node.__width, node.__height, node.__key); 
  }

  static isInline(): boolean {
    return true;
  }

  constructor(url: string, type?: EmbedType, width?: number, height?: number, key?: NodeKey) {
    super(key);
    this.__url = url;
    this.__type = type || detectEmbedType(url);
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
      <EmbedComponent 
        url={this.__url}
        type={this.__type}
        width={this.__width}
        height={this.__height}
        nodeKey={this.__key}
        editor={editor}
      />
    );
  }

  exportJSON(): SerializedEmbedNode {
    return { 
      type: "embed", 
      url: this.__url,
      embedType: this.__type,
      width: this.__width,
      height: this.__height,
      version: 1 
    };
  }

  static importJSON(serializedNode: SerializedEmbedNode): EmbedNode {
    return new EmbedNode(
      serializedNode.url,
      serializedNode.embedType,
      serializedNode.width,
      serializedNode.height
    );
  }
}

export function $createEmbedNode(url: string, type?: EmbedType, width?: number, height?: number): EmbedNode {
  return new EmbedNode(url, type, width, height);
}

export function $isEmbedNode(node: any): node is EmbedNode {
  return node instanceof EmbedNode;
}
