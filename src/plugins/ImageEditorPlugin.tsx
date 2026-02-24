import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { COMMAND_PRIORITY_LOW, createCommand, LexicalCommand } from "lexical";
import { ImageNode } from "../blocks/ImageNode";

export const OPEN_IMAGE_EDITOR_COMMAND: LexicalCommand<{ nodeKey: string; src: string }> = createCommand();

interface ImageEditorState {
  isOpen: boolean;
  nodeKey: string | null;
  src: string;
  originalSrc: string;
  crop: { x: number; y: number; width: number; height: number };
  filters: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
    grayscale: number;
    sepia: number;
    hueRotate: number;
  };
}

export default function ImageEditorPlugin() {
  const [editor] = useLexicalComposerContext();
  const [editorState, setEditorState] = useState<ImageEditorState>({
    isOpen: false,
    nodeKey: null,
    src: "",
    originalSrc: "",
    crop: { x: 0, y: 0, width: 100, height: 100 },
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      grayscale: 0,
      sepia: 0,
      hueRotate: 0,
    },
  });

  useEffect(() => {
    return editor.registerCommand(
      OPEN_IMAGE_EDITOR_COMMAND,
      ({ nodeKey, src }) => {
        setEditorState({
          isOpen: true,
          nodeKey,
          src,
          originalSrc: src,
          crop: { x: 0, y: 0, width: 100, height: 100 },
          filters: {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            blur: 0,
            grayscale: 0,
            sepia: 0,
            hueRotate: 0,
          },
        });
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  const applyFilters = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Set canvas size based on crop
      const cropWidth = (img.width * editorState.crop.width) / 100;
      const cropHeight = (img.height * editorState.crop.height) / 100;
      const cropX = (img.width * editorState.crop.x) / 100;
      const cropY = (img.height * editorState.crop.y) / 100;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      if (ctx) {
        // Apply filters
        const { brightness, contrast, saturation, blur, grayscale, sepia, hueRotate } = editorState.filters;
        ctx.filter = `
          brightness(${brightness}%)
          contrast(${contrast}%)
          saturate(${saturation}%)
          blur(${blur}px)
          grayscale(${grayscale}%)
          sepia(${sepia}%)
          hue-rotate(${hueRotate}deg)
        `;

        // Draw cropped and filtered image
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        // Get the result as data URL
        const editedSrc = canvas.toDataURL("image/png");

        // Update the node
        editor.update(() => {
          const node = editor.getEditorState()._nodeMap.get(editorState.nodeKey!);
          if (node && node instanceof ImageNode) {
            const writable = node.getWritable() as ImageNode;
            writable.__src = editedSrc;
          }
        });

        handleClose();
      }
    };

    img.src = editorState.originalSrc;
  };

  const handleClose = () => {
    setEditorState((prev) => ({ ...prev, isOpen: false, nodeKey: null }));
  };

  const resetFilters = () => {
    setEditorState((prev) => ({
      ...prev,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        hueRotate: 0,
      },
    }));
  };

  const applyPreset = (preset: string) => {
    const presets: Record<string, typeof editorState.filters> = {
      vintage: { brightness: 110, contrast: 90, saturation: 80, blur: 0, grayscale: 0, sepia: 40, hueRotate: 0 },
      bw: { brightness: 100, contrast: 110, saturation: 0, blur: 0, grayscale: 100, sepia: 0, hueRotate: 0 },
      warm: { brightness: 105, contrast: 100, saturation: 110, blur: 0, grayscale: 0, sepia: 20, hueRotate: 10 },
      cool: { brightness: 100, contrast: 100, saturation: 110, blur: 0, grayscale: 0, sepia: 0, hueRotate: 180 },
      dramatic: { brightness: 90, contrast: 130, saturation: 120, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0 },
      soft: { brightness: 110, contrast: 85, saturation: 90, blur: 1, grayscale: 0, sepia: 0, hueRotate: 0 },
    };

    if (presets[preset]) {
      setEditorState((prev) => ({ ...prev, filters: presets[preset] }));
    }
  };

  if (!editorState.isOpen) return null;

  const filterStyle = {
    filter: `
      brightness(${editorState.filters.brightness}%)
      contrast(${editorState.filters.contrast}%)
      saturate(${editorState.filters.saturation}%)
      blur(${editorState.filters.blur}px)
      grayscale(${editorState.filters.grayscale}%)
      sepia(${editorState.filters.sepia}%)
      hue-rotate(${editorState.filters.hueRotate}deg)
    `,
  };

  return (
    <div className="cms-image-editor-modal">
      <div className="cms-image-editor-overlay" onClick={handleClose} />
      <div className="cms-image-editor-content">
        <div className="cms-image-editor-header">
          <h2>Edit Image</h2>
          <button onClick={handleClose} className="cms-close-btn">×</button>
        </div>

        <div className="cms-image-editor-body">
          <div className="cms-image-editor-preview">
            <img src={editorState.src} alt="Preview" style={filterStyle} />
          </div>

          <div className="cms-image-editor-controls">
            <div className="cms-editor-section">
              <h3>Presets</h3>
              <div className="cms-preset-buttons">
                <button onClick={() => applyPreset("vintage")}>Vintage</button>
                <button onClick={() => applyPreset("bw")}>B&W</button>
                <button onClick={() => applyPreset("warm")}>Warm</button>
                <button onClick={() => applyPreset("cool")}>Cool</button>
                <button onClick={() => applyPreset("dramatic")}>Dramatic</button>
                <button onClick={() => applyPreset("soft")}>Soft</button>
              </div>
            </div>

            <div className="cms-editor-section">
              <h3>Filters</h3>
              
              <div className="cms-filter-control">
                <label>
                  Brightness: {editorState.filters.brightness}%
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={editorState.filters.brightness}
                    onChange={(e) =>
                      setEditorState((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, brightness: Number(e.target.value) },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="cms-filter-control">
                <label>
                  Contrast: {editorState.filters.contrast}%
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={editorState.filters.contrast}
                    onChange={(e) =>
                      setEditorState((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, contrast: Number(e.target.value) },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="cms-filter-control">
                <label>
                  Saturation: {editorState.filters.saturation}%
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={editorState.filters.saturation}
                    onChange={(e) =>
                      setEditorState((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, saturation: Number(e.target.value) },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="cms-filter-control">
                <label>
                  Blur: {editorState.filters.blur}px
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={editorState.filters.blur}
                    onChange={(e) =>
                      setEditorState((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, blur: Number(e.target.value) },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="cms-filter-control">
                <label>
                  Grayscale: {editorState.filters.grayscale}%
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editorState.filters.grayscale}
                    onChange={(e) =>
                      setEditorState((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, grayscale: Number(e.target.value) },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="cms-filter-control">
                <label>
                  Sepia: {editorState.filters.sepia}%
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editorState.filters.sepia}
                    onChange={(e) =>
                      setEditorState((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, sepia: Number(e.target.value) },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="cms-filter-control">
                <label>
                  Hue Rotate: {editorState.filters.hueRotate}°
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={editorState.filters.hueRotate}
                    onChange={(e) =>
                      setEditorState((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, hueRotate: Number(e.target.value) },
                      }))
                    }
                  />
                </label>
              </div>
            </div>

            <div className="cms-editor-section">
              <h3>Crop</h3>
              <div className="cms-crop-info">
                <p>Click and drag on the image to crop (coming soon)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cms-image-editor-footer">
          <button onClick={resetFilters} className="cms-btn-secondary">Reset</button>
          <div>
            <button onClick={handleClose} className="cms-btn-secondary">Cancel</button>
            <button onClick={applyFilters} className="cms-btn-primary">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
