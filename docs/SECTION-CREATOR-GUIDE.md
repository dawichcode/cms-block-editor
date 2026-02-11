# Section Creator Guide

The CMS Block Editor includes a powerful Section Creator that allows you to insert pre-designed website sections with one click.

## Features

- ✅ 10 pre-designed section templates
- ✅ One-click insertion
- ✅ Fully editable after insertion
- ✅ Professional designs
- ✅ Responsive layouts
- ✅ Customizable colors and spacing

## Available Sections

### 1. Hero Section 🎯
**Purpose:** Large header with title, subtitle, and call-to-action buttons

**Includes:**
- Large heading
- Subtitle text
- Two CTA buttons (primary & secondary)
- Purple gradient background
- Centered layout

**Best for:** Landing pages, homepage headers, product launches

---

### 2. Features Grid ⭐
**Purpose:** Showcase 3 key features in a grid layout

**Includes:**
- Section heading
- 3-column grid
- Icon placeholders (emoji)
- Feature titles
- Feature descriptions

**Best for:** Product features, service offerings, benefits

---

### 3. Call to Action 📢
**Purpose:** Encourage user action with prominent CTA

**Includes:**
- Bold heading
- Supporting text
- Large CTA button
- Green background
- Centered layout

**Best for:** Conversions, sign-ups, downloads

---

### 4. Testimonial 💬
**Purpose:** Display customer testimonial with quote

**Includes:**
- Large quote marks
- Testimonial text
- Customer photo placeholder
- Name and title
- Centered layout

**Best for:** Social proof, customer reviews, case studies

---

### 5. Pricing Table 💰
**Purpose:** Display 3-tier pricing comparison

**Includes:**
- 3 pricing cards
- Price display
- Feature lists
- CTA buttons
- "Popular" badge on middle tier

**Best for:** SaaS pricing, subscription plans, service tiers

---

### 6. Team Members 👥
**Purpose:** Showcase team members in a grid

**Includes:**
- 4-column grid
- Photo placeholders
- Names
- Job titles

**Best for:** About pages, team introductions, company culture

---

### 7. Statistics 📊
**Purpose:** Display key metrics and numbers

**Includes:**
- 4-column grid
- Large numbers
- Metric labels
- Purple background
- White text

**Best for:** Company stats, achievements, social proof

---

### 8. FAQ Section ❓
**Purpose:** Frequently asked questions

**Includes:**
- Section heading
- 3 Q&A cards
- Expandable format
- Clean layout

**Best for:** Support pages, product info, common questions

---

### 9. Contact Form 📧
**Purpose:** Contact information and form

**Includes:**
- 2-column layout
- Contact details (address, email, phone)
- Form placeholder
- Submit button

**Best for:** Contact pages, support, inquiries

---

### 10. Newsletter Signup 📬
**Purpose:** Email subscription form

**Includes:**
- Heading and description
- Email input placeholder
- Subscribe button
- Privacy notice
- Purple background

**Best for:** Email list building, updates, marketing

---

## How to Use

### From Toolbar

1. Click the **section icon** (⊞) in the toolbar
2. Browse the section templates
3. Click on any section to insert it
4. Edit the content as needed

### Editing Sections

After insertion, sections are fully editable:

1. **Text:** Click and edit any text
2. **Colors:** Use color picker to change text/background
3. **Spacing:** Use spacing controls for padding/margin
4. **Layout:** Rearrange or delete elements
5. **Styling:** Apply any formatting
6. **Section Settings:** Click the "Section" button in toolbar for full control

### Full Section Editing

When you click inside a section, a purple "Section" button appears in the toolbar. Click it to access:

- **Background Color**: 30 preset colors + custom picker
- **Text Alignment**: Left, center, right, justify
- **Layout Type**: Block, Flex, or Grid
- **Flex Controls**: Direction, wrap, align, justify
- **Grid Controls**: Columns, rows, responsive layouts
- **Gap**: Spacing between items (0-100px)
- **Padding**: Internal spacing with presets
- **Margin**: External spacing with presets

See [SECTION-EDITING-GUIDE.md](./SECTION-EDITING-GUIDE.md) for complete details.

### Customization Tips

**Change Background Color:**
1. Select the section
2. Use the color picker (paint bucket icon)
3. Choose a new background color

**Adjust Spacing:**
1. Select the section
2. Use spacing controls (⚙️ icon)
3. Modify padding and margins

**Add More Content:**
1. Click inside the section
2. Press Enter to add new paragraphs
3. Use toolbar to format content

**Remove Elements:**
1. Select unwanted content
2. Press Delete or Backspace
3. Section structure remains intact

## Section Structure

Each section is a semantic `<section>` element with:

```html
<section class="cms-section cms-section-{type}">
  <!-- Section content -->
</section>
```

### Section Types

- `cms-section-hero`
- `cms-section-features`
- `cms-section-cta`
- `cms-section-testimonial`
- `cms-section-pricing`
- `cms-section-team`
- `cms-section-stats`
- `cms-section-faq`
- `cms-section-contact`
- `cms-section-newsletter`

## Use Cases

### Landing Page

```
1. Hero Section (header)
2. Features Grid (benefits)
3. Testimonial (social proof)
4. Pricing Table (plans)
5. CTA Section (conversion)
6. Newsletter (lead capture)
```

### About Page

```
1. Hero Section (introduction)
2. Team Members (people)
3. Statistics (achievements)
4. Testimonial (culture)
5. Contact Form (reach out)
```

### Product Page

```
1. Hero Section (product intro)
2. Features Grid (capabilities)
3. Pricing Table (plans)
4. FAQ Section (questions)
5. CTA Section (trial/demo)
```

### Blog/Content Site

```
1. Hero Section (featured post)
2. Features Grid (categories)
3. Newsletter (subscribe)
4. Contact Form (feedback)
```

## Responsive Design

All sections are responsive and adapt to mobile:

- **Desktop:** Full multi-column layouts
- **Tablet:** Adjusted spacing and columns
- **Mobile:** Stacked single-column layout

### Mobile Optimizations

- Columns stack vertically
- Padding reduces to 40px 20px
- Font sizes adjust automatically
- Buttons remain full-width
- Images scale proportionally

## Styling

### Default Styles

Sections come with professional default styles:

```css
.cms-section {
  margin: 40px 0;
  border-radius: 12px;
  transition: all 0.2s;
}

.cms-section:hover {
  box-shadow: 0 0 0 2px #667eea;
}
```

### Custom Styling

Override section styles with CSS:

```css
/* Custom hero section */
.cms-section-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 500px;
}

/* Custom pricing cards */
.cms-section-pricing {
  background: #f0f0f0;
  padding: 80px 40px;
}
```

## Best Practices

### Content

1. **Keep it concise:** Short, impactful text works best
2. **Clear CTAs:** Use action-oriented button text
3. **Consistent tone:** Match your brand voice
4. **Visual hierarchy:** Use headings effectively
5. **White space:** Don't overcrowd sections

### Design

1. **Color harmony:** Use complementary colors
2. **Consistent spacing:** Maintain rhythm
3. **Readable fonts:** Ensure good contrast
4. **Mobile-first:** Test on small screens
5. **Accessibility:** Use semantic HTML

### Layout

1. **Logical flow:** Order sections purposefully
2. **Visual breaks:** Use different backgrounds
3. **Focal points:** Guide user attention
4. **Balance:** Mix content-heavy and light sections
5. **Consistency:** Maintain design patterns

## Advanced Usage

### Programmatic Insertion

```tsx
import { $createSectionNode } from '@cms/cms-block-editor';

editor.update(() => {
  const section = $createSectionNode('hero', '#667eea', '80px 40px');
  // Add content to section
  selection.insertNodes([section]);
});
```

### Custom Templates

Create your own section templates:

```tsx
const customTemplate: SectionTemplate = {
  type: 'hero',
  name: 'Custom Hero',
  description: 'My custom hero section',
  icon: '🚀',
  backgroundColor: '#ff6b6b',
  padding: '100px 40px',
  content: `
    <h1>Custom Content</h1>
    <p>Your custom HTML here</p>
  `
};
```

### Duplicate Sections

To reuse a section:

1. Select the entire section
2. Copy (Cmd/Ctrl + C)
3. Paste where needed (Cmd/Ctrl + V)
4. Edit the duplicated content

## Export & Import

Sections are preserved when exporting:

**HTML Export:**
```html
<section class="cms-section cms-section-hero" style="background-color: #667eea; padding: 80px 40px;">
  <!-- Section content -->
</section>
```

**Markdown Export:**
Sections export as regular content with formatting preserved.

## Accessibility

Sections maintain accessibility:

- ✅ Semantic `<section>` elements
- ✅ Proper heading hierarchy
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Color contrast compliance

## Browser Support

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile browsers: Full support

## Troubleshooting

### Section not inserting
- Ensure cursor is in the editor
- Try clicking in a paragraph first
- Check that editor is focused

### Styling not applying
- Verify CSS is loaded
- Check for conflicting styles
- Inspect element in DevTools

### Content not editable
- Click inside the section
- Ensure editor is not read-only
- Try refreshing the page

### Layout breaking on mobile
- Check custom CSS
- Verify responsive styles
- Test in different viewports

## Tips & Tricks

### Quick Edits

1. **Double-click** to select text quickly
2. **Cmd/Ctrl + A** to select all in section
3. **Tab** to navigate between elements
4. **Shift + Enter** for line breaks

### Design Consistency

1. Use the same color scheme across sections
2. Maintain consistent padding
3. Align text consistently (center/left)
4. Use similar button styles

### Performance

1. Don't overuse heavy sections
2. Optimize images before inserting
3. Keep content concise
4. Test load times

### Workflow

1. Start with hero section
2. Add 2-3 content sections
3. Include social proof (testimonial/stats)
4. End with CTA or newsletter
5. Review and refine

## Examples

### Complete Landing Page

```
Hero Section
↓
Features Grid
↓
Statistics
↓
Testimonial
↓
Pricing Table
↓
FAQ Section
↓
CTA Section
↓
Newsletter
```

### Simple About Page

```
Hero Section (Company intro)
↓
Team Members
↓
Statistics (Achievements)
↓
Contact Form
```

### Product Launch

```
Hero Section (Product announcement)
↓
Features Grid (Key features)
↓
Testimonial (Early user)
↓
Pricing Table (Plans)
↓
CTA Section (Pre-order)
```

---

## Summary

The Section Creator provides:

- ✅ 10 professional templates
- ✅ One-click insertion
- ✅ Full customization
- ✅ Responsive design
- ✅ Semantic HTML
- ✅ Accessibility compliant

**Perfect for:** Landing pages, marketing sites, product pages, portfolios, and any content that needs professional section layouts!

---

**Pro Tip:** Mix and match sections to create unique page layouts. All sections are designed to work together seamlessly! 🎨
