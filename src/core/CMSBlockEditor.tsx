import { LexicalComposer } from "@lexical/react/LexicalComposer";
import EditorShell from "./EditorShell";
import { createEditorConfig } from "./EditorConfig";

interface CMSBlockEditorProps {
  value?: string;
  onChange?: (state: any) => void;
}

export default function CMSBlockEditor({ value, onChange }: CMSBlockEditorProps) {
  return (
    <LexicalComposer initialConfig={createEditorConfig(value)}>
      <EditorShell onChange={onChange} />
    </LexicalComposer>
  );
}