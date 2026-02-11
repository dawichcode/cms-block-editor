# CMS Block Editor Demo App

This is a demo application showcasing the CMS Block Editor in action.

## Getting Started

### 1. Install dependencies

```bash
cd example-app
npm install
```

### 2. Install Lexical dependencies

The editor requires Lexical packages:

```bash
npm install lexical @lexical/react @lexical/rich-text @lexical/list
```

### 3. Run the development server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## What's Included

This demo includes three example implementations:

1. **Basic** - Minimal setup showing core functionality
2. **With Persistence** - Auto-save to localStorage with visual feedback
3. **Custom Styled** - Themed editor with custom CSS

## Features to Try

- Type `/` to open the slash command menu
- Try different block types (headings, lists, quotes)
- Test the persistence by refreshing the page
- Explore the custom styling in the third tab

## Project Structure

```
example-app/
├── src/
│   ├── App.tsx          # Main demo app with tabs
│   ├── App.css          # Styling for the demo
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies
```

## Building for Production

```bash
npm run build
npm run preview
```

## Troubleshooting

If you encounter module resolution issues:

1. Make sure you're in the `example-app` directory
2. Ensure all dependencies are installed
3. Check that the parent package is built: `cd .. && npm run build`
