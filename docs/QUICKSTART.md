# 🚀 Quick Start Guide

Your CMS Block Editor demo is now running!

## ✅ What's Running

The development server is live at: **http://localhost:5174/**

## 🎯 What You'll See

The demo app has 3 tabs showcasing different implementations:

### 1. **Basic** Tab
- Minimal editor setup
- Type `/` to see slash commands
- Real-time character count
- **Upload Image button** in toolbar

### 2. **With Persistence** Tab  
- Auto-saves to localStorage
- Refresh the page - your content persists!
- Visual save indicator
- Clear content button

### 3. **Custom Styled** Tab
- Themed editor with gradient styling
- Custom block styles
- Content statistics

## 🎨 Try These Features

1. **Slash Commands** - Type `/` anywhere to insert blocks
2. **Upload Images** - Click the "📷 Upload Image" button in the toolbar
3. **Drag & Drop Images** - Drag image files directly into the editor
4. **Image from URL** - Type `/image` and select "Image from URL"
5. **Rich Text** - Use standard keyboard shortcuts (Cmd+B for bold, etc.)
6. **Undo/Redo** - Cmd+Z / Cmd+Shift+Z
7. **Persistence** - Switch to tab 2, type something, refresh the page!

## 📸 Adding Images (3 Ways!)

### Method 1: Toolbar Button
1. Click the "📷 Upload Image" button
2. Select an image from your computer
3. Image is inserted as base64

### Method 2: Drag & Drop
1. Drag an image file from your computer
2. Drop it anywhere in the editor
3. Image is automatically inserted

### Method 3: Slash Command
1. Type `/image` 
2. Choose "Image" for file upload
3. Or choose "Image from URL" to paste a URL

## 📁 Project Structure

```
cms/
├── src/                    # Your editor source code
│   ├── blocks/            # Custom block nodes
│   ├── core/              # Core editor components
│   └── plugins/           # Editor plugins
├── example-app/           # Demo application (currently running)
│   └── src/
│       ├── App.tsx        # Main demo with tabs
│       └── App.css        # Styling
└── examples/              # Standalone examples
```

## 🛠️ Development Commands

```bash
# Stop the dev server
# (Use Ctrl+C in the terminal or stop the process)

# Restart the dev server
cd example-app
npm run dev

# Build the editor package
cd ..
npm run build

# Build the demo for production
cd example-app
npm run build
npm run preview
```

## 📝 Next Steps

1. **Explore the code** - Check out `example-app/src/App.tsx`
2. **Customize styling** - Edit `example-app/src/App.css`
3. **Add features** - Modify the editor in `src/`
4. **Read the docs** - See `README.md` and `examples/README.md`

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Module not found?**
```bash
cd example-app
npm install
```

**Changes not showing?**
- Hard refresh: Cmd+Shift+R
- Clear cache and reload

## 💡 Tips

- The editor uses Lexical under the hood
- All custom blocks are in `src/blocks/`
- Slash commands are defined in `src/plugins/SlashCommandPlugin.tsx`
- The demo links directly to your source code via Vite aliases

Enjoy building with the CMS Block Editor! 🎉
