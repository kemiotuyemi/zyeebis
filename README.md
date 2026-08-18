# Zyeebis Place Ordering App

Mobile-first food & cake ordering web app with PWA support.

## Tech Stack

- **Next.js 16** + TypeScript + Tailwind v4
- **Neon Postgres** + Prisma 7
- **UploadThing** — product images + receipt uploads
- **Auth.js** — admin authentication (JWT)
- **next-pwa** — installable PWA

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` — Neon Postgres connection string
- `UPLOADTHING_TOKEN` — UploadThing API token
- `AUTH_SECRET` — Random secret for Auth.js sessions
- `ADMIN_EMAIL` — Admin login email
- `ADMIN_PASSWORD` — Admin login password
- `BUSINESS_PHONE` — Business WhatsApp number (+2347050337273)
- `OPAY_ACCOUNT` — Opay account number (7050337273)

### 3. Generate Prisma client + migrate

```bash
npm run db:generate
npm run db:migrate
```

### 4. Seed products

```bash
npm run db:seed
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Access

Navigate to `/admin` and sign in with the credentials from your `.env` file.

Admin features:
- Dashboard with order stats
- Order management (view, update status, payment status)
- Product management (CRUD, image upload, availability toggle)

## Project Structure

```
src/
  app/
    admin/          — Admin panel (login, dashboard, orders, products)
    api/            — API routes (orders, uploadthing, auth, admin)
    cart/           — Shopping cart
    checkout/       — Checkout form
    order/          — Order confirmation
    products/       — Product detail pages
  components/       — Shared components (Navbar, Footer, AdminProviders)
  contexts/         — Cart context (localStorage)
  lib/              — Utilities (Prisma, UploadThing, WhatsApp)
prisma/
  schema.prisma     — Database schema
  seed.ts           — Product seed data
```

## Delivery

Available on: Monday, Wednesday, Friday

## Payment

Manual Opay transfer. Account: 7050337273

## Build & Deploy

```bash
npm run build
npm run start
```

Deploy to Vercel:
1. Connect your GitHub repo
2. Set environment variables in Vercel dashboard
3. Deploy
