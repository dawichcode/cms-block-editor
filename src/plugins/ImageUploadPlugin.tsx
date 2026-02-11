import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, DRAGOVER_COMMAND, DROP_COMMAND } from "lexical";
import { ImageNode } from "../blocks/ImageNode";

export default function ImageUploadPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Handle drag over
    const removeDragOverListener = editor.registerCommand(
      DRAGOVER_COMMAND,
      (event: DragEvent) => {
        event.preventDefault();
        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    // Handle drop
    const removeDropListener = editor.registerCommand(
      DROP_COMMAND,
      (event: DragEvent) => {
        event.preventDefault();
        
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          
          // Check if it's an image
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
              const url = e.target?.result as string;
              const alt = file.name.replace(/\.[^/.]+$/, "");
              
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  const imageNode = new ImageNode(url, alt);
                  selection.insertNodes([imageNode]);
                }
              });
            };
            
            reader.readAsDataURL(file);
            return true;
          }
        }
        
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      removeDragOverListener();
      removeDropListener();
    };
  }, [editor]);

  return null;
}
