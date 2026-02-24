import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, DRAGOVER_COMMAND, DROP_COMMAND } from "lexical";
import { VideoNode } from "../blocks/VideoNode";

export function VideoUploadPlugin({ 
  onVideoAdded, 
  useBase64Url = false 
}: { 
  onVideoAdded?: (file: File) => Promise<string>;
  useBase64Url?: boolean;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Handle drag over
    const removeDragOverListener = editor.registerCommand(
      DRAGOVER_COMMAND,
      (event: DragEvent) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith("video/")) {
            event.preventDefault();
            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    // Handle drop
    const removeDropListener = editor.registerCommand(
      DROP_COMMAND,
      //@ts-ignore
      async (event: DragEvent) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          
          // Check if it's a video
          if (file.type.startsWith("video/")) {
            event.preventDefault();
            
            let url: string;
            
            // Use custom upload handler if provided
            if (onVideoAdded) {
              try {
                url = await onVideoAdded(file);
              } catch (error) {
                console.error("Error uploading video:", error);
                alert("Failed to upload video. Please try again.");
                return false;
              }
            } else if (useBase64Url) {
              // Fall back to base64 encoding (not recommended for videos)
              console.warn("Using base64 for video - this may cause performance issues");
              url = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  resolve(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              });
            } else {
              alert("Video upload handler not configured. Please provide onVideoAdded prop.");
              return false;
            }
            
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                const videoNode = new VideoNode(url);
                selection.insertNodes([videoNode]);
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
  }, [editor, onVideoAdded, useBase64Url]);

  return null;
}
