import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import SlashCommandPlugin from "../plugins/SlashCommandPlugin";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import ImageUploadPlugin from "../plugins/ImageUploadPlugin";
import LinkPlugin from "../plugins/LinkPlugin";
import SectionEditorPlugin from "../plugins/SectionEditorPlugin";
import EmbedPlugin from "../plugins/EmbedPlugin";
import "../styles/editor.css";

export default function EditorShell({ onChange }: { onChange?: (state: any) => void }) {
  return (
    <div className="cms-editor-shell">
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className="cms-editor-content" />}
        placeholder={<div className="cms-editor-placeholder">Start typing or press / for commands...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <ListPlugin />
      <LexicalLinkPlugin />
      <SlashCommandPlugin />
      <ImageUploadPlugin />
      <LinkPlugin />
      <SectionEditorPlugin />
      <EmbedPlugin />
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