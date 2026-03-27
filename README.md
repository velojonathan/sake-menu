# Sake Menu MVP

A mobile-first web app for restaurant/tasting-room sake menu experiences. Guests scan a QR code from a printed menu and explore ~50 sake offerings through an interactive chart, flavor filters, and detailed sake pages.

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL via Prisma ORM
- **Charts**: Recharts (interactive scatter plot)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Seed the database with ~50 sample sakes
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ADMIN_PASSWORD` | Admin area password (MVP) | No |
| `NEXT_PUBLIC_APP_URL` | Public app URL | No |

## Architecture

### Domain-Driven Organization

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── page.tsx            # Guest landing page (SSR)
│   ├── sake/[slug]/        # Sake detail pages
│   ├── admin/              # Admin CRUD interface
│   └── api/                # REST API endpoints
├── domain/                 # Business logic by domain
│   ├── catalog/            # Sake catalog: queries, filters, types
│   │   ├── queries.ts      # Database queries (Prisma)
│   │   ├── filters.ts      # Client-side filter logic
│   │   └── types.ts        # TypeScript interfaces
│   ├── admin/              # Admin actions (server actions)
│   └── inventory/          # Phase 2 scaffolding
├── components/             # React components by domain
│   ├── catalog/            # Guest-facing: chart, cards, filters
│   ├── admin/              # Admin: forms, tables
│   ├── layout/             # Header, Footer
│   └── ui/                 # Generic reusable UI
├── hooks/                  # Custom React hooks
└── lib/                    # Shared utilities, DB client, constants
```

### Key Design Decisions

1. **Server-first rendering**: The landing page uses SSR to fetch all sakes, then hydrates a client-side `CatalogExplorer` for instant filtering without additional API calls.

2. **URL-based filter state**: Filters are serialized to URL search params, making filtered views shareable via QR codes or links.

3. **Domain separation**: Business logic is organized by domain (`catalog`, `admin`, `inventory`) to keep concerns clean and enable future module additions.

4. **Prisma schema with forward-looking tables**: `InventoryItem`, `Invoice`, `InvoiceLineItem`, and `ShelfScan` models are scaffolded but not actively used, ready for Phase 2.

5. **Client-side filtering on pre-fetched data**: For ~50 sakes, it's more performant to filter in the browser than make round-trips. The API route exists for future pagination needs.

### Data Model

```
Sake ──< SakeFlavorTag >── FlavorTag
  │
  └──< InventoryItem ──< InvoiceLineItem >── Invoice

ShelfScan (standalone, for future CV/AI)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Run Jest tests |
| `npm run db:seed` | Seed database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio |

## Deployment to Vercel

1. Push repo to GitHub
2. Import to Vercel
3. Set `DATABASE_URL` environment variable (use Vercel Postgres or external provider)
4. Vercel auto-detects Next.js and builds

## Testing

```bash
# Run unit tests
npm run test

# Tests cover:
# - Filter logic (search, numeric ranges, flavor tags)
# - Data transformation (toCardData, toChartPoint)
# - URL param serialization/deserialization
```

## Phase 2 Roadmap

The schema and architecture are designed to support these future features:

### Inventory Management
- `InventoryItem` model links to `Sake` catalog via `sakeId`
- Track stock by SKU, bottle size, location
- Reorder threshold alerts

### Invoice Processing
- `Invoice` + `InvoiceLineItem` models ready for OCR/document parsing
- `rawFileUrl` field for storing uploaded invoice images
- Status workflow: `pending` → `processed` → `verified`
- Line items map to `InventoryItem` for automatic stock updates

### Shelf Scanning (CV/AI)
- `ShelfScan` model for storing captured shelf photos
- Status workflow: `pending` → `processing` → `completed`
- Future: integrate with vision AI to detect and count bottles
- Match detected bottles to catalog SKUs

### Extension Points
- Add new domain modules in `src/domain/` (e.g., `src/domain/inventory/`)
- Add new admin pages in `src/app/admin/` (e.g., `src/app/admin/inventory/`)
- Add new API routes in `src/app/api/` (e.g., `src/app/api/inventory/`)
- The admin layout already includes navigation slots for new sections

## Nice-to-Have Features (Implemented)
- Empty states with helpful messages
- Loading skeletons
- Error boundaries
- Related/recommended sakes on detail pages (flavor + numeric similarity)
- Mobile-optimized collapsible filter panel

## Nice-to-Have Features (Future)
- Favorites/bookmarks in localStorage
- Lightweight analytics on popular viewed sakes
- QR-friendly short URL structure
- Dark mode toggle
