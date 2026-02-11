import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useCallback, useRef, useEffect } from "react";
import { $getSelection, $isRangeSelection, $createParagraphNode } from "lexical";
import { 
  INSERT_TABLE_COMMAND,
  $createTableNodeWithDimensions,
  TableNode
} from "@lexical/table";
import { MdTableChart } from "react-icons/md";

export default function TablePlugin() {
  const [editor] = useLexicalComposerContext();
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = useCallback(() => {
    setShowModal(true);
    setRows(3);
    setColumns(3);
    setIncludeHeaders(true);
  }, []);

  const insertTable = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const tableNode = $createTableNodeWithDimensions(
          rows,
          columns,
          includeHeaders
        );
        
        selection.insertNodes([tableNode]);
        
        // Add paragraph after table
        const paragraph = $createParagraphNode();
        tableNode.insertAfter(paragraph);
      }
    });

    setShowModal(false);
  }, [editor, rows, columns, includeHeaders]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      insertTable();
    } else if (e.key === 'Escape') {
      setShowModal(false);
    }
  }, [insertTable]);

  return (
    <div className="cms-table-plugin" ref={modalRef}>
      <button
        className="cms-toolbar-button"
        onClick={openModal}
        title="Insert Table"
        type="button"
      >
        <MdTableChart size={18} />
      </button>

      {showModal && (
        <>
          <div className="cms-modal-backdrop" onClick={() => setShowModal(false)} />
          <div className="cms-table-modal">
            <div className="cms-table-modal-header">
              <span>Insert Table</span>
            </div>

            <div className="cms-table-modal-content">
              <div className="cms-table-preview">
                <div className="cms-table-preview-grid">
                  {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="cms-table-preview-row">
                      {Array.from({ length: columns }).map((_, colIndex) => (
                        <div
                          key={colIndex}
                          className={`cms-table-preview-cell ${
                            includeHeaders && rowIndex === 0 ? 'header' : ''
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="cms-table-preview-label">
                  {rows} × {columns} {includeHeaders ? '(with headers)' : ''}
                </div>
              </div>

              <div className="cms-form-group">
                <label htmlFor="table-rows">Rows</label>
                <div className="cms-number-input-group">
                  <button
                    onClick={() => setRows(Math.max(1, rows - 1))}
                    className="cms-number-button"
                    type="button"
                  >
                    −
                  </button>
                  <input
                    id="table-rows"
                    type="number"
                    min="1"
                    max="20"
                    value={rows}
                    onChange={(e) => setRows(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                    onKeyDown={handleKeyDown}
                    className="cms-number-input"
                  />
                  <button
                    onClick={() => setRows(Math.min(20, rows + 1))}
                    className="cms-number-button"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cms-form-group">
                <label htmlFor="table-columns">Columns</label>
                <div className="cms-number-input-group">
                  <button
                    onClick={() => setColumns(Math.max(1, columns - 1))}
                    className="cms-number-button"
                    type="button"
                  >
                    −
                  </button>
                  <input
                    id="table-columns"
                    type="number"
                    min="1"
                    max="10"
                    value={columns}
                    onChange={(e) => setColumns(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    onKeyDown={handleKeyDown}
                    className="cms-number-input"
                  />
                  <button
                    onClick={() => setColumns(Math.min(10, columns + 1))}
                    className="cms-number-button"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cms-form-group">
                <label className="cms-checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeHeaders}
                    onChange={(e) => setIncludeHeaders(e.target.checked)}
                    className="cms-checkbox"
                  />
                  <span>Include header row</span>
                </label>
              </div>

              <div className="cms-table-presets">
                <p className="cms-table-presets-title">Quick Presets:</p>
                <div className="cms-table-preset-buttons">
                  <button
                    onClick={() => { setRows(3); setColumns(3); setIncludeHeaders(true); }}
                    className="cms-preset-button"
                    type="button"
                  >
                    3×3
                  </button>
                  <button
                    onClick={() => { setRows(5); setColumns(3); setIncludeHeaders(true); }}
                    className="cms-preset-button"
                    type="button"
                  >
                    5×3
                  </button>
                  <button
                    onClick={() => { setRows(4); setColumns(4); setIncludeHeaders(true); }}
                    className="cms-preset-button"
                    type="button"
                  >
                    4×4
                  </button>
                  <button
                    onClick={() => { setRows(10); setColumns(5); setIncludeHeaders(true); }}
                    className="cms-preset-button"
                    type="button"
                  >
                    10×5
                  </button>
                </div>
              </div>

              <div className="cms-modal-actions">
                <button
                  onClick={() => setShowModal(false)}
                  className="cms-button cms-button-secondary"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={insertTable}
                  className="cms-button cms-button-primary"
                  type="button"
                >
                  Insert Table
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
