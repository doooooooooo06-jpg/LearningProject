# Graph Report - Learn Ai  (2026-11-18)

## Corpus Check
- 41 files · ~13,651 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .graphify-bak 1, (none) 1, .css 1)

## Summary
- 218 nodes · 302 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50dd2de0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Project Dependencies and Scripts
- product-detail.tsx
- Catalog API and SQLite
- Storefront Design Guidance
- TypeScript Compiler Settings
- Storefront and API Documentation
- Command Safety Hook
- Storefront Home and Catalog
- Storefront Database Diagram
- PostCSS Configuration
- Graphify Repository Workflow
- react
- deals-catalog.tsx
- products/route.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `next` - 15 edges
3. `react` - 11 edges
4. `ProductDetail()` - 9 edges
5. `openDatabase()` - 9 edges
6. `getProductDetailById()` - 8 edges
7. `scripts` - 6 edges
8. `Button()` - 5 edges
9. `Dialog()` - 5 edges
10. `DealsCatalog()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Farmart Storefront Design Reference Image` --semantically_similar_to--> `Farmart Market Identity`  [INFERRED] [semantically similar]
  Ex.jpg → DESIGN.md
- `Farmart Relational Schema` --semantically_similar_to--> `Farmart SQLite Schema Diagram`  [INFERRED] [semantically similar]
  skills/project-seed-onboarding/references/farmart-seed-reference.md → public/mermaid.html
- `generateMetadata()` --calls--> `getProductDetailById()`  [EXTRACTED]
  app/product/page.tsx → lib/database.ts
- `GET()` --calls--> `getCategories()`  [EXTRACTED]
  app/api/v1/categories/route.ts → lib/database.ts
- `GET()` --calls--> `searchProducts()`  [EXTRACTED]
  app/api/v1/products/route.ts → lib/database.ts

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "Project Dependencies and Scripts"
Cohesion: 0.07
Nodes (34): eslintConfig, dependencies, next@latest, react@latest, react-dom@latest, devDependencies, eslint@latest, eslint-config-next@latest (+26 more)

### Community 1 - "product-detail.tsx"
Cohesion: 0.13
Nodes (18): Button(), ButtonProps, ButtonVariant, ProductCard(), ProductCardData, ProductImageGallery(), QuantitySelector(), QuantitySelectorProps (+10 more)

### Community 2 - "Catalog API and SQLite"
Cohesion: 0.11
Nodes (25): dynamic, GET(), runtime, dynamic, GET(), runtime, getCategories(), getDatabase() (+17 more)

### Community 3 - "Storefront Design Guidance"
Cohesion: 0.09
Nodes (15): Design System Guidance, Repository Project Map, Storefront Component Patterns, Visual Color Tokens, Farmart Storefront Design Reference Image, Farmart SQLite Schema Diagram, Storefront Hero Table, Catalog Feature Onboarding (+7 more)

### Community 4 - "TypeScript Compiler Settings"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 5 - "Storefront and API Documentation"
Cohesion: 0.14
Nodes (8): ApiDocsPage(), metadata, SwaggerUiClient(), SwaggerUiFactory, Window, metadata, nextConfig, next

### Community 6 - "Command Safety Hook"
Cohesion: 0.17
Nodes (4): dangerousPatterns, match, database, databaseDirectory

### Community 7 - "Storefront Home and Catalog"
Cohesion: 0.27
Nodes (9): ApiProduct, categories, Home(), ProductCard(), products, ProductSection(), StoreCardProduct, StorefrontResponse (+1 more)

### Community 9 - "Storefront Database Diagram"
Cohesion: 0.50
Nodes (4): Categories Table, Collection Products Join Table, Collections Table, Products Table

### Community 12 - "react"
Cohesion: 0.20
Nodes (9): Dialog(), DialogProps, views, DialogDemo(), colors, DesignSystemPage(), spacing, typeStyles (+1 more)

### Community 13 - "deals-catalog.tsx"
Cohesion: 0.29
Nodes (8): DealCard(), DealCardData, ApiProduct, DealsCatalog(), ProductPage, toDealCard(), DealsPage(), metadata

### Community 14 - "products/route.ts"
Cohesion: 0.32
Nodes (7): allowedSorts, dynamic, error(), GET(), positiveInteger(), runtime, ProductSearch

## Knowledge Gaps
- **9 isolated node(s):** `Graphify Repository Workflow`, `Visual Color Tokens`, `Storefront Hero Table`, `Homepage Collections`, `Repository Project Map` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 96 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Storefront and API Documentation` to `Project Dependencies and Scripts`, `product-detail.tsx`, `Catalog API and SQLite`, `Storefront Home and Catalog`, `react`, `deals-catalog.tsx`, `products/route.ts`?**
  _High betweenness centrality (0.276) - this node is a cross-community bridge._
- **What connects `Graphify Repository Workflow`, `Visual Color Tokens`, `Storefront Hero Table` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Dependencies and Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `Project Dependencies and Scripts`, `product-detail.tsx`, `Storefront and API Documentation`, `Storefront Home and Catalog`, `deals-catalog.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `product-detail.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12681159420289856 - nodes in this community are weakly interconnected._
- **Should `Catalog API and SQLite` be split into smaller, more focused modules?**
  _Cohesion score 0.10574712643678161 - nodes in this community are weakly interconnected._
- **Should `Storefront Design Guidance` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._