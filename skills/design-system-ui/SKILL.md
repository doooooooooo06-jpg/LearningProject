---
name: design-system-ui
description: Build or revise Farmart Next.js pages and reusable UI components that follow the repository's DESIGN.md tokens, responsive patterns, and existing component library. Use for visual product work; not for backend-only changes.
metadata:
  short-description: Build UI from Farmart design rules
---

# Design System UI

Use this skill when implementing a storefront page, product flow, or shared visual component. `DESIGN.md` is the source for visual intent and tokens; `app/globals.css` and `app/components/` show how those rules are implemented.

## Workflow

1. Read `DESIGN.md` and inspect the nearest existing page/component before changing UI. Identify the applicable colors, type styles, spacing, responsive rules, and component patterns.
2. Reuse existing components such as `Button`, `Dialog`, `ProductCard`, `ProductGallery`, and `QuantitySelector` where they fit. If a needed pattern is missing and can be reused, create a small component in `app/components/` with accessible labels, keyboard behavior, and clear props.
3. Keep page composition in its route folder, use shared tokens/classes for common styling, and add responsive behavior consistent with Farmart's compact catalog layouts.
4. When introducing or changing a system-level component or token, update both `DESIGN.md` and the `/design` showcase so the written rules and visible examples remain aligned.
5. Use current project assets and visual references when available. Do not add a new visual dependency or substitute a generic UI kit without a clear need.

## Verification

Run `npm.cmd run build` and lint the changed files. Review the affected page at desktop and mobile widths when a browser preview is available. Storybook is not currently configured; do not make it a prerequisite for ordinary UI work.

