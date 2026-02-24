import { LexicalComposer } from "@lexical/react/LexicalComposer";
import {EditorShell} from "./EditorShell";
import { createEditorConfig } from "./EditorConfig";
import { SEOMetadata } from "../seo/types";

interface CMSBlockEditorProps {
  value?: string;
  onChange?: (state: any) => void;
  onImageAdded?: (file: File) => Promise<string>;
  onVideoAdded?: (file: File) => Promise<string>;
  useBase64Url?: boolean;
  seoMetadata?: SEOMetadata;
  onSEOMetadataChange?: (metadata: SEOMetadata) => void;
  showSEO?: boolean;
}

export default function CMSBlockEditor({ 
  value, 
  onChange, 
  onImageAdded,
  onVideoAdded, 
  useBase64Url = true,
  seoMetadata,
  onSEOMetadataChange,
  showSEO = true
}: CMSBlockEditorProps) {
  return (
    <LexicalComposer initialConfig={createEditorConfig(value)}>
      <EditorShell 
        onChange={onChange} 
        onImageAdded={onImageAdded}
        onVideoAdded={onVideoAdded} 
        useBase64Url={useBase64Url}
        seoMetadata={seoMetadata}
        onSEOMetadataChange={onSEOMetadataChange}
        showSEO={showSEO}
      />
    </LexicalComposer>
  );
}
