# Table Support Guide

The CMS Block Editor includes comprehensive table support with an intuitive interface for creating and editing tables.

## Features

- **Visual Table Builder**: Interactive modal with live preview
- **Flexible Dimensions**: Create tables from 1×1 to 20×10 (rows × columns)
- **Header Row Option**: Toggle header row styling
- **Quick Presets**: One-click templates (3×3, 5×3, 4×4, 10×5)
- **Full Editing**: Add/remove rows and columns, merge cells, edit content
- **Professional Styling**: Purple headers, striped rows, hover effects
- **Responsive Design**: Tables adapt to mobile screens with horizontal scroll

## Inserting a Table

### From Toolbar

1. Click the table icon (📊) in the toolbar
2. Configure your table:
   - Adjust rows (1-20) using +/- buttons or input
   - Adjust columns (1-10) using +/- buttons or input
   - Toggle "Include header row" checkbox
3. Preview updates in real-time
4. Click "Insert Table" or press Enter

### Quick Presets

Use preset buttons for common table sizes:
- **3×3**: Small data table
- **5×3**: Standard list with headers
- **4×4**: Square grid
- **10×5**: Large data table

## Editing Tables

Once inserted, tables support full editing capabilities:

### Cell Editing
- Click any cell to edit content
- Use Tab to move to next cell
- Use Shift+Tab to move to previous cell
- Format text within cells (bold, italic, etc.)

### Table Structure
- Right-click on table for context menu
- Add/remove rows and columns
- Merge/split cells
- Delete entire table

## Styling

Tables come with built-in professional styling:

### Header Row
- Purple background (#8b5cf6)
- White text
- Bold font weight
- Centered alignment

### Body Rows
- Alternating row colors (striped)
- Hover effect for better UX
- Bordered cells for clarity

### Responsive Behavior
- Full width on desktop
- Horizontal scroll on mobile (<768px)
- Maintains readability on all devices

## Example Usage

```tsx
import { CMSBlockEditor } from 'cms-block-editor';
import 'cms-block-editor/styles';

function App() {
  const [content, setContent] = useState('');

  return (
    <CMSBlockEditor
      value={content}
      onChange={setContent}
    />
  );
}
```

## Keyboard Shortcuts

- **Enter**: Insert table (when modal is open)
- **Escape**: Close modal
- **Tab**: Next cell
- **Shift+Tab**: Previous cell

## Tips

1. **Start Small**: Begin with a smaller table and add rows/columns as needed
2. **Use Headers**: Enable header row for data tables to improve readability
3. **Mobile Testing**: Test tables on mobile to ensure content fits
4. **Content First**: Plan your table structure before inserting
5. **Formatting**: Format text within cells for emphasis

## Technical Details

The table implementation uses Lexical's `@lexical/table` package with:
- `TableNode`: Container for the table
- `TableRowNode`: Individual rows
- `TableCellNode`: Individual cells
- `LexicalTablePlugin`: Editing functionality

Tables are fully serializable and work with export/import features (HTML and Markdown).
