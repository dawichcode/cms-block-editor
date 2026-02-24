import { LexicalComposer } from "@lexical/react/LexicalComposer";
import {EditorShell} from "./EditorShell";
import { createEditorConfig } from "./EditorConfig";

interface CMSBlockEditorProps {
  value?: string;
  onChange?: (state: any) => void;
  onImageAdded?: (file: File) => Promise<string>;
  onVideoAdded?: (file: File) => Promise<string>;
  useBase64Url?: boolean;
}

export default function CMSBlockEditor({ 
  value, 
  onChange, 
  onImageAdded,
  onVideoAdded, 
  useBase64Url = true 
}: CMSBlockEditorProps) {
  return (
    <LexicalComposer initialConfig={createEditorConfig(value)}>
      <EditorShell 
        onChange={onChange} 
        onImageAdded={onImageAdded}
        onVideoAdded={onVideoAdded} 
        useBase64Url={useBase64Url} 
      />
    </LexicalComposer>
  );
}
