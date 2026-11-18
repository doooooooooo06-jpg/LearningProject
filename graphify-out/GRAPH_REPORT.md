# Graph Report - Learn Ai  (2026-11-18)

## Corpus Check
- Corpus is ~12,226 words - fits in a single context window. You may not need a graph.

## Summary
- 192 nodes · 254 edges · 12 communities (9 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Project Dependencies and Scripts
- Shared UI Components
- Catalog API and SQLite
- Storefront Design Guidance
- TypeScript Compiler Settings
- Storefront and API Documentation
- Command Safety Hook
- Storefront Home and Catalog
- Storefront Database Diagram
- PostCSS Configuration
- Graphify Repository Workflow

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `next` - 9 edges
3. `react` - 9 edges
4. `ProductDetail()` - 8 edges
5. `openDatabase()` - 7 edges
6. `scripts` - 6 edges
7. `Button()` - 5 edges
8. `Dialog()` - 5 edges
9. `getCategories()` - 5 edges
10. `getStorefront()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Farmart Storefront Design Reference Image` --semantically_similar_to--> `Farmart Market Identity`  [INFERRED] [semantically similar]
  Ex.jpg → DESIGN.md
- `Farmart Relational Schema` --semantically_similar_to--> `Farmart SQLite Schema Diagram`  [INFERRED] [semantically similar]
  skills/project-seed-onboarding/references/farmart-seed-reference.md → public/mermaid.html
- `GET()` --calls--> `getCategories()`  [EXTRACTED]
  app/api/v1/categories/route.ts → lib/database.ts
- `GET()` --calls--> `getStorefront()`  [EXTRACTED]
  app/api/v1/storefront/route.ts → lib/database.ts
- `SQLite Test Isolation` --conceptually_related_to--> `Deterministic Development Seed Data`  [INFERRED]
  AGENTS.md → skills/project-seed-onboarding/SKILL.md

## Import Cycles
- None detected.

## Communities (12 total, 3 thin omitted)

### Community 0 - "Project Dependencies and Scripts"
Cohesion: 0.07
Nodes (34): eslintConfig, dependencies, next@latest, react@latest, react-dom@latest, devDependencies, eslint@latest, eslint-config-next@latest (+26 more)

### Community 1 - "Shared UI Components"
Cohesion: 0.11
Nodes (22): Button(), ButtonProps, ButtonVariant, Dialog(), DialogProps, ProductCard(), ProductCardData, ProductGallery() (+14 more)

### Community 2 - "Catalog API and SQLite"
Cohesion: 0.11
Nodes (24): dynamic, GET(), runtime, allowedSorts, dynamic, error(), GET(), positiveInteger() (+16 more)

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

## Knowledge Gaps
- **9 isolated node(s):** `Repository Project Map`, `Graphify Repository Workflow`, `Visual Color Tokens`, `Categories Table`, `Collections Table` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 88 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Storefront and API Documentation` to `Project Dependencies and Scripts`, `Catalog API and SQLite`?**
  _High betweenness centrality (0.276) - this node is a cross-community bridge._
- **What connects `Repository Project Map`, `Graphify Repository Workflow`, `Visual Color Tokens` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Dependencies and Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Shared UI Components` to `Project Dependencies and Scripts`, `Storefront and API Documentation`, `Storefront Home and Catalog`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **Should `Shared UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.11397849462365592 - nodes in this community are weakly interconnected._
- **Should `Catalog API and SQLite` be split into smaller, more focused modules?**
  _Cohesion score 0.10574712643678161 - nodes in this community are weakly interconnected._
- **Should `Storefront Design Guidance` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._