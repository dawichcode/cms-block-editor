import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { createEditorConfig } from "./EditorConfig";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import "../styles/renderer.css";

interface CMSRendererProps {
  content: string;
  className?: string;
}

function ReadOnlyPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(false);
  }, [editor]);

  return null;
}

export default function CMSRenderer({ content, className = "" }: CMSRendererProps) {
  const config = {
    ...createEditorConfig(content),
    editable: false,
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div className={`cms-renderer ${className}`}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="cms-renderer-content" />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ReadOnlyPlugin />
      </div>
    </LexicalComposer>
  );
}
