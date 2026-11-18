---
version: alpha
name: Farmart
description: A bright, practical grocery storefront with a farm-fresh character. Warm market yellow carries the shopping actions, while white space, quiet gray surfaces, and thin borders keep the product range easy to scan. Food illustrations add approachability; compact typography and a dense product grid preserve the feeling of a useful online market.
colors:
  primary: "#F8BC28"
  primary-strong: "#EAB438"
  ink: "#252525"
  body: "#444444"
  muted: "#858585"
  canvas: "#FFFFFF"
  surface-soft: "#F8F8F8"
  surface-warm: "#FFF9EF"
  hairline: "#EDEDED"
  success: "#73A34B"
  rating: "#F3AE19"
  sale: "#E67D51"
  on-primary: "#252525"
  on-sale: "#FFFFFF"
typography:
  display:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 29px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.6px
  heading-lg:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  button:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0
rounded:
  none: 0px
  sm: 2px
  md: 3px
  lg: 4px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  section: 34px
  page-gutter: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 10px 17px
  button-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 10px 17px
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 10px 16px
  search-field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 0px 14px
  category-tile:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 12px
  product-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 12px
  product-gallery:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 12px
  quantity-selector:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 0px 8px
  newsletter-panel:
    backgroundColor: "{colors.surface-warm}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 20px
  dialog:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
---

## Overview

Farmart is a friendly grocery shop built for quick browsing and confident everyday purchases. Its visual language pairs a white canvas with fresh produce cues, warm yellow actions, and restrained gray dividers. The page should feel like a well-organized market: abundant choice, clear prices, and easy paths from category discovery to cart.

Keep the interface compact and product-led. Food and package imagery should carry most of the color and personality; chrome stays quiet so the inventory remains the focus. Use the yellow accent for purchase actions and important offers, not as a broad background color.

**Key Characteristics:**
- Market yellow `{colors.primary}` is the primary shopping cue.
- White surfaces and `{colors.hairline}` dividers create a clean, low-noise catalog.
- Product rows prioritize visible packaging, name, rating, price, stock, and add-to-cart action.
- Small corner radii and restrained shadows keep the storefront practical rather than luxurious.
- Responsive layouts preserve category and product browsing on narrow screens.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #F8BC28): Main add-to-cart, registration, and category navigation actions; warm and easy to associate with shopping.
- **Primary Strong** (`{colors.primary-strong}` — #EAB438): Secondary warm emphasis such as newsletter headings and decorative highlights.
- **Sale** (`{colors.sale}` — #E67D51): Small discount badges that need to stand apart from the yellow action color.

### Surface
- **Canvas** (`{colors.canvas}` — #FFFFFF): Main page background and product card surface.
- **Soft Surface** (`{colors.surface-soft}` — #F8F8F8): Category tiles, footer, and quiet catalog bands.
- **Warm Surface** (`{colors.surface-warm}` — #FFF9EF): Newsletter promotion panel; gives the offer a gentle, distinct region.

### Hairlines
- **Hairline** (`{colors.hairline}` — #EDEDED): Thin rules around search, cards, and product columns. Prefer this to heavy shadows for separation.

### Text
- **Ink** (`{colors.ink}` — #252525): Headings, prices, and primary text.
- **Body** (`{colors.body}` — #444444): Navigation and standard supporting text.
- **Muted** (`{colors.muted}` — #858585): Metadata, product brands, secondary labels, and helper copy.
- **On Primary** (`{colors.on-primary}` — #252525): Button text on yellow, keeping contrast legible.
- **On Sale** (`{colors.on-sale}` — #FFFFFF): Discount text on the terracotta badge.

### Semantic
- **Success** (`{colors.success}` — #73A34B): Product price emphasis and healthy stock indicators.
- **Rating** (`{colors.rating}` — #F3AE19): Star ratings; keep this distinct from primary purchase controls where practical.

## Typography

Use Arial with system sans-serif fallbacks. The system is intentionally familiar and compact, letting grocery names and prices stay readable without making the catalog feel editorial.

| Role | Token | Size / Weight | Line height | Use |
|---|---|---:|---:|---|
| Display | `{typography.display}` | 29px / 700 | 1.2 | Hero headline; reduce to about 23px on small screens. |
| Section heading | `{typography.heading-lg}` | 18px / 700 | 1.3 | Category, brand, and product section titles. |
| Body | `{typography.body}` | 13px / 400 | 1.5 | Main copy, navigation, and descriptions. |
| Label | `{typography.label}` | 10px / 500 | 1.4 | Product metadata, categories, tabs, and helper text. |
| Button | `{typography.button}` | 10px / 700 | 1 | Compact high-clarity shopping actions. |

### Principles
Use weight and spacing to establish hierarchy rather than oversized type. Product titles are short and compact; allow up to two lines and reserve consistent vertical space so prices align across a row. All-caps is for short brand tags or eyebrow labels only.

### Note on Font Substitutes
No licensed font is required. Keep the system stack `Arial, Helvetica, sans-serif` so the page renders consistently without a remote font dependency.

## Layout

Use a centered content container capped around 1180px with 24px desktop gutters. Keep section spacing regular, about `{spacing.section}` between catalog groups, and use `{spacing.lg}` for internal group separation. The desktop page is composed of full-width header bands around a centered catalog: utility header, navigation, hero, category strip, featured brands, product promotions, and product collections.

The desktop catalog uses an eight-column category strip and a six-column product row. Give the hero a wider editorial panel beside a narrower offer panel. The newsletter sits beside the first product row when space allows. Keep rows dense but preserve clear separation between products with `{colors.hairline}`.

Whitespace should make scanning easy without making the grocery catalog feel sparse. Product cards need enough room for a clear pack image and an obvious purchase action; keep surrounding navigation and metadata compact.

## Elevation

Depth is mostly created with surface color changes and one-pixel borders. Use `{colors.hairline}` for card boundaries and avoid large, dark shadows. A very soft shadow may sit under illustrative product art or a small floating control, but it must not compete with product imagery. Hero and category surfaces may use pale tonal backgrounds without adding extra elevation.

## Components

**`button-primary`** — Main shopping action for add-to-cart and sign-up. Use `{colors.primary}` with `{colors.on-primary}`, `{typography.button}`, `{rounded.sm}`, and 10px × 17px padding. Keep labels short and action-oriented.

**`button-light`** — Secondary hero action on a photo or colored banner. Use a white surface, ink text, `{typography.button}`, `{rounded.sm}`, and 10px × 17px padding. It should remain visually quieter than the primary shopping action.

**`button-outline`** — Quiet secondary action for controls such as review links or alternate choices. Use a white surface, ink text, `{typography.button}`, `{rounded.sm}`, 10px × 16px padding, and a thin hairline border. Increase border contrast on hover without introducing a new accent color.

**`search-field`** — A full-width desktop search control with a category selector, text input, and search affordance. Use a white surface, muted copy, `{rounded.md}`, and a thin `{colors.hairline}` border. On mobile, move it to its own full-width row.

**`category-tile`** — A pale gray tile with a centered food illustration and a short label. Use `{colors.surface-soft}`, `{colors.ink}`, `{typography.label}`, `{rounded.md}`, and 12px padding. Keep the illustration prominent and the label to one or two short lines.

**`product-card`** — A compact white catalog cell with image area, brand, product title, rating, sale and price details, stock bar, quantity affordance, and add-to-cart action. Use `{colors.canvas}`, `{colors.ink}`, `{typography.body}`, `{rounded.md}`, 12px padding, and a thin `{colors.hairline}` boundary. Maintain consistent content order across all collections.

**`product-gallery`** — The primary image area on a product detail page, with a large centered product view, subtle neutral surface, small image thumbnails, and unobtrusive wishlist and image labels. Use `{colors.surface-soft}`, `{colors.ink}`, `{typography.label}`, `{rounded.md}`, and 12px spacing between thumbnails. Keep image choice separate from product purchase controls.

**`quantity-selector`** — A compact bordered control with decrement and increment buttons around a centered quantity. Use `{colors.canvas}`, `{colors.body}`, `{typography.body}`, `{rounded.md}`, and 8px horizontal padding. Disable decrement at the minimum and keep the numeric value readable as a live update.

**`newsletter-panel`** — A warm-toned membership offer with a strong discount heading, brief benefit, two stacked fields, and a yellow submit action. Use `{colors.surface-warm}`, `{colors.ink}`, `{typography.body}`, `{rounded.md}`, 20px padding, and a subtle border. Keep the form visually quieter than the shopping catalog.

**`dialog`** — A focused surface for a short, important decision such as confirming an action or showing a quick offer. Center a white panel over a dimmed canvas, use `{colors.ink}`, `{typography.body}`, `{rounded.lg}`, 24px padding, and a subtle `{colors.hairline}` border. Give the title and primary action clear hierarchy; provide an explicit close control and keep the panel narrow enough for easy reading. On mobile, constrain it to the viewport with comfortable side gutters.

## Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| Mobile | ≤ 760px | Header wraps; search gets a full row; hero panels stack; categories become four columns; brands become two columns; newsletter moves below products; product grid becomes three columns. |
| Compact mobile | ≤ 380px | Reduce page gutters and card padding; hide excess navigation; keep primary category and shopping actions visible. |
| Tablet / compact desktop | 761–1050px | Narrow navigation, reduce spacing, and retain a multi-column catalog inside the capped container. |
| Desktop | > 1050px | Full horizontal navigation, split hero, eight categories, six products per row, and newsletter beside the top offer row. |

### Touch Targets
- Keep primary buttons and form controls at least 34px tall in the compact storefront; prefer 44px or taller when space permits.
- Make category tiles large enough to tap as a single target, including their icon and label.
- Do not use color alone to communicate a sale or available stock; include a text label or number.

### Collapsing Strategy
- Keep the wordmark and key contact information in the first header row; move search below them at mobile widths.
- Allow navigation to scroll horizontally and remove lower-priority links on small screens.
- Stack hero panels vertically on mobile, preserving the main offer before the secondary sale.
- Reduce category and product column counts rather than shrinking cards below readable widths.
- Move the newsletter after the first product set when the two-column desktop layout no longer fits.

## Known Gaps

- Current product and category illustrations are emoji placeholders; final catalog imagery may change the balance of color and image sizing.
- The reference covers a grocery landing page only; account, checkout, search results, and product detail screens are not specified.
- Interaction states for validation errors, successful registration, cart updates, and keyboard focus are not fully defined.
- Dark mode, localization, and alternate brand themes are not documented.
- The current compact controls are optimized for visual density; touch target sizing should be revisited alongside production assets and accessibility review.
