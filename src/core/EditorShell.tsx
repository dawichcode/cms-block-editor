import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TablePlugin as LexicalTablePlugin } from "@lexical/react/LexicalTablePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import SlashCommandPlugin from "../plugins/SlashCommandPlugin";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { ImageUploadPlugin } from "../plugins/ImageUploadPlugin";
import { VideoUploadPlugin } from "../plugins/VideoUploadPlugin";
import ImageEditorPlugin from "../plugins/ImageEditorPlugin";
import LinkPlugin from "../plugins/LinkPlugin";
import SectionEditorPlugin from "../plugins/SectionEditorPlugin";
import EmbedPlugin from "../plugins/EmbedPlugin";
import TablePlugin from "../plugins/TablePlugin";
import { SEOPlugin } from "../plugins/SEOPlugin";
import { SEOMetadata } from "../seo/types";
import "../styles/editor.css";

export function EditorShell({
  onChange,
  onImageAdded,
  onVideoAdded,
  useBase64Url,
  seoMetadata,
  onSEOMetadataChange,
  showSEO
}: {
  onChange?: (state: any) => void;
  onImageAdded?: (file: File) => Promise<string>;
  onVideoAdded?: (file: File) => Promise<string>;
  useBase64Url?: boolean;
  seoMetadata?: SEOMetadata;
  onSEOMetadataChange?: (metadata: SEOMetadata) => void;
  showSEO?: boolean;
}) {
  return (
    <div className="cms-editor-shell">
      <ToolbarPlugin />
      {showSEO && (
        <div className="cms-toolbar-seo">
          <SEOPlugin 
            metadata={seoMetadata}
            onMetadataChange={onSEOMetadataChange}
            showAnalysis={true}
          />
        </div>
      )}
      <RichTextPlugin
        contentEditable={<ContentEditable className="cms-editor-content" />}
        placeholder={<div className="cms-editor-placeholder">Start typing or press / for commands...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <ListPlugin />
      <LexicalLinkPlugin />
      <LexicalTablePlugin />
      <SlashCommandPlugin />
      <ImageUploadPlugin onImageAdded={onImageAdded} useBase64Url={useBase64Url} />
      <VideoUploadPlugin onVideoAdded={onVideoAdded} useBase64Url={useBase64Url} />
      <ImageEditorPlugin />
      <LinkPlugin />
      <SectionEditorPlugin />
      <EmbedPlugin />
      <TablePlugin />
      {onChange && (
        <OnChangePlugin
          onChange={(editorState) => {
            onChange(editorState);
          }}
        />
      )}
    </div>
  );
}
