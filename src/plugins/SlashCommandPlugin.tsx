import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { 
  $createParagraphNode, 
  $getSelection, 
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  TextNode,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_ENTER_COMMAND,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createListNode, $createListItemNode } from "@lexical/list";
import { ImageNode } from "../blocks/ImageNode";
import { VideoNode } from "../blocks/VideoNode";
import { YouTubeNode } from "../blocks/YouTubeNode";
import { QuoteNode } from "../blocks/QuoteNode";
import { ColumnsNode, ColumnNode } from "../blocks/ColumnsNode";

interface SlashCommand {
  title: string;
  description: string;
  keywords: string[];
  onSelect: (editor: any) => void;
}

export default function SlashCommandPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: SlashCommand[] = [
    {
      title: "Heading 1",
      description: "Large section heading",
      keywords: ["h1", "heading", "title"],
      onSelect: (editor) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const heading = $createHeadingNode("h1");
            selection.insertNodes([heading]);
          }
        });
      },
    },
    {
      title: "Heading 2",
      description: "Medium section heading",
      keywords: ["h2", "heading", "subtitle"],
      onSelect: (editor) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const heading = $createHeadingNode("h2");
            selection.insertNodes([heading]);
          }
        });
      },
    },
    {
      title: "Heading 3",
      description: "Small section heading",
      keywords: ["h3", "heading"],
      onSelect: (editor) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const heading = $createHeadingNode("h3");
            selection.insertNodes([heading]);
          }
        });
      },
    },
    {
      title: "Bullet List",
      description: "Create a bulleted list",
      keywords: ["ul", "list", "bullet"],
      onSelect: (editor) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const list = $createListNode("bullet");
            const listItem = $createListItemNode();
            list.append(listItem);
            selection.insertNodes([list]);
          }
        });
      },
    },
    {
      title: "Numbered List",
      description: "Create a numbered list",
      keywords: ["ol", "list", "number"],
      onSelect: (editor) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const list = $createListNode("number");
            const listItem = $createListItemNode();
            list.append(listItem);
            selection.insertNodes([list]);
          }
        });
      },
    },
    {
      title: "Quote",
      description: "Insert a quote block",
      keywords: ["quote", "blockquote"],
      onSelect: (editor) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const quote = new QuoteNode();
            const paragraph = $createParagraphNode();
            quote.append(paragraph);
            selection.insertNodes([quote]);
          }
        });
      },
    },
    {
      title: "Image",
      description: "Insert an image",
      keywords: ["image", "img", "picture", "photo"],
      onSelect: (editor) => {
        // Create a file input element
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        
        input.onchange = (e: any) => {
          const file = e.target?.files?.[0];
          if (file) {
            // Convert to base64 or object URL
            const reader = new FileReader();
            reader.onload = (event) => {
              const url = event.target?.result as string;
              const alt = file.name.replace(/\.[^/.]+$/, ""); // filename without extension
              
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  const imageNode = new ImageNode(url, alt);
                  const nodes = [imageNode];
                  selection.insertNodes(nodes);
                }
              });
            };
            reader.readAsDataURL(file);
          }
        };
        
        input.click();
      },
    },
    {
      title: "Video",
      description: "Insert a video",
      keywords: ["video", "mp4", "movie", "film"],
      onSelect: (editor) => {
        // Create a file input element
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "video/*";
        
        input.onchange = (e: any) => {
          const file = e.target?.files?.[0];
          if (file) {
            // For videos, we should use object URL or upload to server
            // Base64 is not recommended for large video files
            const url = URL.createObjectURL(file);
            
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                const videoNode = new VideoNode(url);
                const nodes = [videoNode];
                selection.insertNodes(nodes);
              }
            });
          }
        };
        
        input.click();
      },
    },
    {
      title: "Image from URL",
      description: "Insert an image from a URL",
      keywords: ["image", "url", "link", "web"],
      onSelect: (editor) => {
        const url = prompt("Enter image URL:");
        if (url) {
          const alt = prompt("Enter alt text (optional):") || "";
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const imageNode = new ImageNode(url, alt);
              selection.insertNodes([imageNode]);
            }
          });
        }
      },
    },
    {
      title: "YouTube",
      description: "Embed a YouTube video",
      keywords: ["youtube", "video", "embed"],
      onSelect: (editor) => {
        const id = prompt("Enter YouTube video ID:");
        if (id) {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const youtubeNode = new YouTubeNode(id);
              selection.insertNodes([youtubeNode]);
            }
          });
        }
      },
    },
    {
      title: "Columns",
      description: "Create a two-column layout",
      keywords: ["columns", "layout", "grid"],
      onSelect: (editor) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const columns = new ColumnsNode();
            const col1 = new ColumnNode();
            const col2 = new ColumnNode();
            const p1 = $createParagraphNode();
            const p2 = $createParagraphNode();
            col1.append(p1);
            col2.append(p2);
            columns.append(col1, col2);
            selection.insertNodes([columns]);
          }
        });
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(searchLower) ||
      cmd.description.toLowerCase().includes(searchLower) ||
      cmd.keywords.some((kw) => kw.includes(searchLower))
    );
  });

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode();
          const text = node.getTextContent();
          
          // Check if we just typed "/"
          if (text.endsWith("/")) {
            setShowMenu(true);
            setSearch("");
            setSelectedIndex(0);
          } else if (showMenu) {
            // Extract search term after "/"
            const lastSlashIndex = text.lastIndexOf("/");
            if (lastSlashIndex !== -1) {
              const searchTerm = text.substring(lastSlashIndex + 1);
              setSearch(searchTerm);
            }
          }
        }
      });
    });
  }, [editor, showMenu]);

  useEffect(() => {
    if (!showMenu) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        setShowMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showMenu, selectedIndex, filteredCommands]);

  const executeCommand = (command: SlashCommand) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const node = selection.anchor.getNode();
        const text = node.getTextContent();
        const lastSlashIndex = text.lastIndexOf("/");
        
        if (lastSlashIndex !== -1) {
          // Remove the slash command text
          const textNode = node as TextNode;
          const newText = text.substring(0, lastSlashIndex);
          textNode.setTextContent(newText);
        }
      }
    });

    command.onSelect(editor);
    setShowMenu(false);
    setSearch("");
    setSelectedIndex(0);
  };

  if (!showMenu || filteredCommands.length === 0) {
    return null;
  }

  return (
    <div className="slash-menu">
      <div className="slash-menu-title">Commands</div>
      {filteredCommands.map((cmd, index) => (
        <div
          key={cmd.title}
          className={`slash-menu-item ${index === selectedIndex ? "selected" : ""}`}
          onClick={() => executeCommand(cmd)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <div className="slash-menu-item-title">{cmd.title}</div>
          <div className="slash-menu-item-description">{cmd.description}</div>
        </div>
      ))}
    </div>
  );
}