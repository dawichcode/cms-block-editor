import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, DRAGOVER_COMMAND, DROP_COMMAND } from "lexical";
import { ImageNode } from "../blocks/ImageNode";

export function ImageUploadPlugin({
  onImageAdded,
  useBase64Url = true
}: {
  onImageAdded?: (file: File) => Promise<string>;
  useBase64Url?: boolean;
}) {
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
      //@ts-ignore
      async (event: DragEvent) => {
        event.preventDefault();

        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];

          // Check if it's an image
          if (file.type.startsWith("image/")) {
            let url: string;
            const alt = file.name.replace(/\.[^/.]+$/, "");

            // Use custom upload handler if provided
            if (onImageAdded) {
              try {
                url = await onImageAdded(file);
              } catch (error) {
                console.error("Error uploading image:", error);
                return false;
              }
            } else if (useBase64Url) {
              // Fall back to base64 encoding
              url = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  resolve(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              });
            } else {
              console.warn("No image upload handler provided and useBase64Url is false");
              return false;
            }

            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                const imageNode = new ImageNode(url, alt);
                selection.insertNodes([imageNode]);
              }
            });

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
  }, [editor, onImageAdded, useBase64Url]);

  return null;
}
