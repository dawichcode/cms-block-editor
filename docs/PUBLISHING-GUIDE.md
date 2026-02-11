# Publishing Guide

This guide will help you publish the CMS Block Editor package to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup)
2. **npm CLI**: Ensure npm is installed (`npm --version`)
3. **Git**: Ensure git is installed and repository is initialized

## Pre-Publishing Checklist

### 1. Update Package Information

Edit `package.json` and update:
- `name`: Choose a unique package name (check availability on npm)
- `version`: Set to `1.0.0` for first release
- `author`: Your name and email
- `repository`: Your GitHub repository URL
- `bugs`: Your GitHub issues URL
- `homepage`: Your GitHub repository homepage

Example:
```json
{
  "name": "your-package-name",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/cms-block-editor.git"
  }
}
```

### 2. Update README.md

Replace placeholder URLs in README.md:
- GitHub repository links
- Author information
- Support links

### 3. Update LICENSE

Replace `[Your Name]` in LICENSE file with your actual name.

### 4. Build the Package

```bash
npm run build
```

Verify the `dist/` folder contains:
- `index.mjs` (main module)
- `index.css` (styles)
- `index.d.mts` (TypeScript definitions)
- Source maps

### 5. Test Locally

Test the package locally before publishing:

```bash
# In the package directory
npm link

# In a test project
npm link cms-block-editor

# Test the import
import { CMSBlockEditor } from 'cms-block-editor';
```

### 6. Check Package Contents

Preview what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included in the package.

## Publishing Steps

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### 2. Check Package Name Availability

```bash
npm search your-package-name
```

If the name is taken, choose a different name in `package.json`.

### 3. Publish to npm

For first-time publishing:

```bash
npm publish
```

For scoped packages (e.g., `@yourorg/package-name`):

```bash
npm publish --access public
```

### 4. Verify Publication

Check your package on npm:
```
https://www.npmjs.com/package/your-package-name
```

## Post-Publishing

### 1. Tag the Release

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Create GitHub Release

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Choose the tag `v1.0.0`
4. Add release notes from CHANGELOG.md
5. Publish release

### 3. Update Documentation

Ensure all documentation links are working:
- README.md
- CHANGELOG.md
- Guide documents

### 4. Announce

Share your package:
- Twitter/X
- Reddit (r/reactjs, r/javascript)
- Dev.to
- Your blog
- LinkedIn

## Updating the Package

### Version Bumping

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1): Bug fixes
  ```bash
  npm version patch
  ```

- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
  ```bash
  npm version minor
  ```

- **Major** (1.0.0 → 2.0.0): Breaking changes
  ```bash
  npm version major
  ```

### Publishing Updates

```bash
# 1. Update version
npm version patch  # or minor/major

# 2. Build
npm run build

# 3. Publish
npm publish

# 4. Push to git
git push origin main --tags
```

## Troubleshooting

### Error: Package name already exists

**Solution**: Choose a different package name in `package.json`

### Error: You must be logged in

**Solution**: Run `npm login` and enter your credentials

### Error: 402 Payment Required

**Solution**: This usually means the package name is reserved. Choose a different name.

### Error: 403 Forbidden

**Solution**: 
- Check if you have permission to publish
- For scoped packages, use `npm publish --access public`

### Build Errors

**Solution**:
- Run `npm run build` and fix any TypeScript errors
- Ensure all dependencies are installed
- Check `tsup.config.ts` configuration

## Best Practices

### 1. Semantic Versioning

- **1.0.0**: Initial stable release
- **1.0.x**: Bug fixes
- **1.x.0**: New features
- **x.0.0**: Breaking changes

### 2. Changelog

Update CHANGELOG.md for every release:
- List all changes
- Categorize (Added, Changed, Fixed, Removed)
- Include migration guides for breaking changes

### 3. Testing

Before publishing:
- Test in development environment
- Test in production build
- Test with different React versions
- Test on different browsers

### 4. Documentation

Keep documentation up-to-date:
- README.md
- API documentation
- Migration guides
- Examples

### 5. Deprecation

When deprecating features:
- Add deprecation warnings
- Provide migration path
- Keep deprecated features for at least one major version

## npm Scripts

Useful npm commands:

```bash
# View package info
npm view cms-block-editor

# View all versions
npm view cms-block-editor versions

# Unpublish (within 72 hours)
npm unpublish cms-block-editor@1.0.0

# Deprecate a version
npm deprecate cms-block-editor@1.0.0 "Use version 1.0.1 instead"

# Check outdated dependencies
npm outdated

# Update dependencies
npm update
```

## Security

### 1. Enable 2FA

Enable two-factor authentication on npm:
```bash
npm profile enable-2fa auth-and-writes
```

### 2. Audit Dependencies

Regularly check for vulnerabilities:
```bash
npm audit
npm audit fix
```

### 3. Keep Dependencies Updated

Update dependencies regularly:
```bash
npm update
npm outdated
```

## Support

### Getting Help

- [npm Documentation](https://docs.npmjs.com/)
- [npm Support](https://www.npmjs.com/support)
- [npm Community](https://github.com/npm/feedback)

### Reporting Issues

If users report issues:
1. Respond promptly
2. Ask for reproduction steps
3. Fix and release patch version
4. Update documentation

## Checklist

Before publishing, ensure:

- [ ] Package name is unique and available
- [ ] Version number is correct
- [ ] README.md is complete and accurate
- [ ] LICENSE file is included
- [ ] CHANGELOG.md is updated
- [ ] All tests pass
- [ ] Build succeeds (`npm run build`)
- [ ] Package contents verified (`npm pack --dry-run`)
- [ ] Logged in to npm (`npm login`)
- [ ] Git repository is up to date
- [ ] All documentation links work
- [ ] Example app works with built package

## Quick Publish Commands

```bash
# Complete publishing workflow
npm run build                    # Build the package
npm pack --dry-run              # Preview package contents
npm login                       # Login to npm
npm publish                     # Publish to npm
git tag v1.0.0                  # Tag the release
git push origin main --tags     # Push to GitHub
```

---

**Ready to publish?** Follow the steps above and your package will be live on npm! 🚀

For questions or issues, refer to the [npm documentation](https://docs.npmjs.com/) or open an issue on GitHub.
