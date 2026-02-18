# Contributing to CMS Block Editor

Thank you for your interest in contributing to CMS Block Editor! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Guidelines](#coding-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect everyone to:

- Be respectful and considerate
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting remarks
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git
- A code editor (VS Code recommended)
- Basic knowledge of React and TypeScript

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cms-block-editor.git
   cd cms-block-editor
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/cms-block-editor.git
   ```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Build the Package

```bash
npm run build
```

### Run the Example App

```bash
cd example-app
npm install
npm run dev
```

The example app will be available at `http://localhost:5173`

### Development Workflow

```bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Run example app
cd example-app && npm run dev
```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

1. **Bug Fixes** - Fix issues and improve stability
2. **New Features** - Add new functionality
3. **Documentation** - Improve or add documentation
4. **Examples** - Create usage examples
5. **Tests** - Add or improve tests
6. **Performance** - Optimize code performance
7. **Accessibility** - Improve accessibility features

### Finding Issues to Work On

- Check the [Issues](https://github.com/OWNER/cms-block-editor/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to let others know you're working on it

### Creating a New Issue

Before creating an issue:
1. Search existing issues to avoid duplicates
2. Use the issue template if available
3. Provide clear, detailed information

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid using `any` type when possible
- Use interfaces for object shapes

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Avoid
const props: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Extract reusable logic into custom hooks

```typescript
// Good
function TablePlugin() {
  const [editor] = useLexicalComposerContext();
  const [showModal, setShowModal] = useState(false);
  
  // Component logic
}
```

### File Structure

```
src/
├── blocks/          # Custom Lexical nodes
├── core/            # Core components
├── plugins/         # Editor plugins
├── styles/          # CSS files
├── utils/           # Utility functions
└── index.ts         # Main export
```

### Naming Conventions

- **Components**: PascalCase (`TablePlugin.tsx`)
- **Hooks**: camelCase with `use` prefix (`useTableState`)
- **Utilities**: camelCase (`formatDate`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ROWS`)
- **CSS Classes**: kebab-case with `cms-` prefix (`cms-table-modal`)

### CSS Guidelines

- Use the `cms-` prefix for all class names
- Follow BEM-like naming: `cms-block__element--modifier`
- Keep specificity low
- Use CSS variables for theming
- Ensure responsive design

```css
/* Good */
.cms-table-modal {
  /* Base styles */
}

.cms-table-modal-header {
  /* Element styles */
}

.cms-table-modal--large {
  /* Modifier styles */
}
```

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add trailing commas in objects/arrays
- Keep lines under 100 characters when possible

```typescript
// Good
const config = {
  name: 'table',
  rows: 3,
  columns: 3,
};

// Avoid
const config = {
  name: "table",
  rows: 3,
  columns: 3
}
```

## Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(image): add custom upload handler support

- Add onImageAdded prop for server uploads
- Add useBase64Url prop for encoding control
- Update ImageUploadPlugin with async support
- Add example implementation in demo app

Closes #123

fix(embed): resolve resize persistence issue

- Update EmbedNode to save dimensions
- Fix renderer to respect saved sizes
- Add responsive scaling

docs(readme): update installation instructions

- Add npm installation command
- Update usage examples
- Add TypeScript example
```

### Commit Best Practices

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Reference issue numbers when applicable
- Use present tense ("add feature" not "added feature")

## Pull Request Process

### Before Submitting

1. **Update your fork**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes**:
   - Write clean, documented code
   - Follow coding guidelines
   - Add tests if applicable

4. **Test your changes**:
   ```bash
   npm run build
   cd example-app && npm run dev
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```

### Submitting a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template:
   - Clear title following commit conventions
   - Detailed description of changes
   - Reference related issues
   - Add screenshots/videos if applicable
   - List any breaking changes

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots
(if applicable)

## Testing
- [ ] Tested in example app
- [ ] Tested on different browsers
- [ ] Tested responsive design
- [ ] No console errors

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited in the changelog

### After Your PR is Merged

1. Delete your feature branch:
   ```bash
   git branch -d feat/your-feature-name
   git push origin --delete feat/your-feature-name
   ```

2. Update your fork:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

## Reporting Bugs

### Before Reporting

- Check if the bug has already been reported
- Verify it's actually a bug and not expected behavior
- Test with the latest version

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome 120, Firefox 121]
- Node version: [e.g., 18.0.0]
- Package version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

## Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Mockups, examples, or references.

**Would you like to implement this feature?**
- [ ] Yes, I'd like to implement it
- [ ] No, just suggesting
```

### Feature Discussion

- Open an issue to discuss the feature first
- Get feedback from maintainers
- Consider backward compatibility
- Think about edge cases

## Documentation

### Types of Documentation

1. **Code Comments** - Explain complex logic
2. **JSDoc** - Document functions and components
3. **README** - Getting started guide
4. **Guides** - Feature-specific documentation
5. **API Docs** - API reference

### Documentation Guidelines

- Write clear, concise documentation
- Include code examples
- Add screenshots or videos when helpful
- Keep documentation up-to-date
- Use proper grammar and spelling

### Example Documentation

```typescript
/**
 * Handles custom image upload to server
 * 
 * @param file - Image file to upload
 * @returns Promise resolving to the uploaded image URL
 * 
 * @example
 * ```typescript
 * const handleImageUpload = async (file: File): Promise<string> => {
 *   const formData = new FormData();
 *   formData.append('image', file);
 *   const response = await fetch('/api/upload', {
 *     method: 'POST',
 *     body: formData,
 *   });
 *   const data = await response.json();
 *   return data.url;
 * };
 * 
 * <CMSBlockEditor 
 *   onImageAdded={handleImageUpload}
 *   useBase64Url={false}
 * />
 * ```
 */
function handleImageUpload(file: File): Promise<string> {
  // Implementation
}
```

## Community

### Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and discussions
- **Discord/Slack** - For real-time chat (if available)

### Staying Updated

- Watch the repository for updates
- Follow the changelog
- Join community discussions

### Recognition

Contributors are recognized in:
- CHANGELOG.md
- README.md contributors section
- GitHub contributors page

## Development Tips

### Debugging

```typescript
// Use console.log for debugging
console.log('Current state:', state);

// Use editor.getEditorState() to inspect state
editor.getEditorState().read(() => {
  const root = $getRoot();
  console.log('Root:', root);
});
```

### Testing Changes

1. Test in the example app
2. Test on different browsers
3. Test responsive design
4. Test with different content
5. Check console for errors

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Type Errors**
- Check TypeScript version compatibility
- Ensure all dependencies are installed
- Review type definitions

**CSS Issues**
- Check class name prefixes
- Verify CSS is imported
- Test in different browsers

## Questions?

If you have questions not covered here:
- Open a GitHub Discussion
- Comment on a related issue
- Reach out to maintainers

## Thank You!

Thank you for contributing to CMS Block Editor! Your contributions help make this project better for everyone.

---

**Happy Coding!** 🚀
