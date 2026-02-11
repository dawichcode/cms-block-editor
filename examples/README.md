# CMS Block Editor Examples

This directory contains example implementations of the CMS Block Editor.

## Examples

### 1. Basic Example (`basic.tsx`)
The simplest possible implementation showing minimal setup required.

**Features:**
- Basic editor initialization
- State management with useState
- Simple onChange handler

**Use this when:** You need a quick, no-frills editor setup.

---

### 2. Persistence Example (`with-persistence.tsx`)
Shows how to save and load editor content using localStorage.

**Features:**
- Auto-save functionality
- Load saved content on mount
- Save indicator
- Clear content button

**Use this when:** You need to persist content between sessions.

---

### 3. Custom Styling Example (`custom-styling.tsx`)
Demonstrates how to apply custom CSS to the editor.

**Features:**
- Custom themed editor
- Styled blocks (quotes, columns, images)
- Content preview panel
- Professional appearance

**Use this when:** You need the editor to match your brand/design system.

---

## Running the Examples

### Option 1: Copy into your project

```bash
# Copy the example you want
cp examples/basic.tsx src/App.tsx

# For styling example, also copy the CSS
cp examples/custom-styles.css src/
```

### Option 2: Create a demo app

```bash
# Create a new React app
npx create-react-app cms-editor-demo
cd cms-editor-demo

# Install the editor
npm install @cms/cms-block-editor

# Copy an example
cp ../examples/basic.tsx src/App.tsx
```

### Option 3: Use in existing project

```tsx
import { BasicExample } from './examples/basic';
// or
import { PersistenceExample } from './examples/with-persistence';
// or
import { CustomStylingExample } from './examples/custom-styling';

function App() {
  return <BasicExample />;
}
```

## Tips

1. **Start with the basic example** to understand the core concepts
2. **Add persistence** when you need to save user content
3. **Customize styling** to match your application's design
4. **Combine patterns** from multiple examples as needed

## Common Patterns

### Controlled vs Uncontrolled

The editor works as a controlled component:

```tsx
// Controlled (recommended)
<CMSBlockEditor value={content} onChange={setContent} />

// Uncontrolled (not recommended)
<CMSBlockEditor />
```

### Debouncing onChange

For performance with auto-save:

```tsx
const debouncedSave = useMemo(
  () => debounce((content) => {
    localStorage.setItem('content', content);
  }, 1000),
  []
);

<CMSBlockEditor onChange={debouncedSave} />
```

### Read-only Mode

To display content without editing:

```tsx
// Note: Read-only mode would need to be added to the editor
// This is a placeholder for future functionality
<CMSBlockEditor value={content} readOnly />
```

## Need Help?

- Check the main [README.md](../README.md) for API documentation
- Review the source code in `src/` for implementation details
- Open an issue if you find bugs or have questions
