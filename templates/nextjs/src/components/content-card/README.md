# ContentCard Component

A flexible, accessible card component for Next.js that uses the "stretched link" pattern to avoid nested link issues.

## Key Features

- **Server Component** - No 'use client' directive needed
- **Accessible** - Semantic HTML with proper ARIA structure
- **No Nested Links** - Uses CSS pseudo-elements for clickable cards
- **CTA Support** - Separate action buttons without HTML validation errors
- **Flexible Layouts** - Stacked (default) and horizontal variants
- **CSS Modules** - Follows project's styling patterns

## The Stretched Link Pattern

This component uses a **stretched link** approach to make the entire card clickable without wrapping it in a `<Link>`:

1. The title contains the main link (`<ContentCard.Title href="...">`)
2. A `::before` pseudo-element on the link stretches to cover the entire card
3. CTA elements have higher `z-index` to remain clickable above the stretched link
4. **Result:** No nested `<a>` tags = valid HTML + accessible

### Why This Matters

```tsx
// ❌ BAD: Nested links (invalid HTML, accessibility issues)
<Link href="/article">
  <article>
    <h3>Title</h3>
    <p>Description</p>
    <a href="/enroll">Enroll</a> {/* Nested link! */}
  </article>
</Link>

// ✅ GOOD: Stretched link pattern
<article>
  <h3>
    <Link href="/article">Title</Link> {/* Stretched via CSS */}
  </h3>
  <p>Description</p>
  <a href="/enroll">Enroll</a> {/* Separate link with higher z-index */}
</article>
```

## Usage

### Basic Card with Link

```tsx
import { ContentCard } from '@/components/content-card'

<ContentCard layout="stacked">
  <ContentCard.Image>
    <img src="/image.jpg" alt="..." />
  </ContentCard.Image>
  <ContentCard.Body>
    <ContentCard.Title href="/article/123">
      Article Title
    </ContentCard.Title>
    <ContentCard.Description>
      Article description text
    </ContentCard.Description>
    <ContentCard.Footer>
      January 15, 2024
    </ContentCard.Footer>
  </ContentCard.Body>
</ContentCard>
```

### Card with CTA Button

```tsx
<ContentCard layout="stacked">
  <ContentCard.Image>
    <img src="/course.jpg" alt="..." />
  </ContentCard.Image>
  <ContentCard.Body>
    <ContentCard.Title href="/courses/react">
      React Course
    </ContentCard.Title>
    <ContentCard.Description>
      Learn React fundamentals
    </ContentCard.Description>
    <ContentCard.Cta>
      <Link href="/enroll/react">Enroll Now</Link>
    </ContentCard.Cta>
    <ContentCard.Footer>
      20 hours • Beginner
    </ContentCard.Footer>
  </ContentCard.Body>
</ContentCard>
```

### Horizontal Layout

```tsx
<ContentCard layout="horizontal">
  {/* Same structure as above */}
</ContentCard>
```

## Components

### `ContentCard`
Main wrapper component

**Props:**
- `layout`: `'stacked' | 'horizontal'` (default: `'stacked'`)
- `className`: Additional CSS classes
- All standard `<article>` props

### `ContentCard.Image`
Image container with aspect ratio handling

### `ContentCard.Body`
Content container for title, description, CTA, and footer

### `ContentCard.Title`
Title with optional link

**Props:**
- `href`: Optional URL to make the card clickable (uses stretched link pattern)
- `className`: Additional CSS classes

### `ContentCard.Description`
Description text container

### `ContentCard.Cta`
Call-to-action container with higher z-index for clickable elements

### `ContentCard.Footer`
Footer content (dates, metadata, etc.)

## Browser Support

The stretched link pattern requires:
- `position: absolute` with `inset: 0` (all modern browsers)
- `:has()` pseudo-class for hover effects (widely supported, gracefully degrades)

## Showcase

Visit `/components` to see all variants and examples.
