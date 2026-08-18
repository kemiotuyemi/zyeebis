# Zyeebis Place Ordering App — Build Plan

Source: `Product Requirements Document — Zyeebis Place Ordering App.md`

## Stack
- **Next.js 14 (App Router) + TypeScript + Tailwind** — single app, mobile-first, fuchsia pink (#FF00A8) theme
- **Neon Postgres** + **Prisma** for schema/queries
- **Auth.js (Credentials)** — single admin account
- **UploadThing** — product images + receipt/payment proof uploads
- **next-pwa** — installable PWA
- Deploy to **Vercel** (free tier)

### Environment variables
- `DATABASE_URL` — Neon Postgres connection string
- `UPLOADTHING_TOKEN` — UploadThing API token
- `AUTH_SECRET` — Auth.js session secret
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — single admin credentials
- `BUSINESS_PHONE` — +234 705 033 7273 (WhatsApp link target)
- `OPAY_ACCOUNT` — 7050337273

## Database schema (Neon / Prisma)
- `products` — name, description, category (cakes/food), price, image_url, available, sort_order
- `orders` — order_number (ZP-XXXXXX), customer_name, phone, email?, address, delivery_day (Mon/Wed/Fri), instructions?, subtotal, total, status, payment_status, created_at
- `order_items` — order_id, product snapshot (name/unit_price), quantity, subtotal
- `receipts` — order_id, uploadthing_url, uploaded_at
- `settings` — business phone, payment details (Opay 7050337273), delivery days
- `admin` — single admin row (hashed password)

Pricing stored per product, always computed server-side (cakes ₦1,000/unit, spaghetti ₦1,800/unit). Delivery fee omitted entirely (MVP).

## Build phases
1. **Setup** — scaffold app, Tailwind fuchsia theme, Prisma + Neon schema, UploadThing integration, seed 4 products, Vercel config
2. **Storefront** — Home (logo, intro, featured products w/ prices, Order Now, WhatsApp CTA) → Product detail (image, desc, price, qty selector, Add to Cart)
3. **Cart** — localStorage persistence, qty +/- , remove, live subtotal/total, continue/checkout
4. **Checkout** — full name, phone, email?, address, delivery day (only Mon/Wed/Fri), instructions?, order summary
5. **Confirmation** — order number ZP-XXXXXX, delivery day, total, Opay payment details, **receipt upload** (UploadThing) + WhatsApp "send receipt" deep link
6. **Notifications** — new order auto-opens WhatsApp deep link w/ priced summary (name, phone, address, items ×qty ₦total, day)
7. **Admin** — login, dashboard (today's/pending/awaiting payment/preparing/completed + total sales), order management (view + update status + payment status), product CRUD + image upload (UploadThing) + availability toggle
8. **PWA + polish** — manifest, offline shell, input validation, mobile QA, README

## Acceptance criteria (from PRD §28)
- Cakes always calculate at ₦1,000/unit, spaghetti at ₦1,800/unit
- Cart/order totals accurate at all quantities
- Guest checkout works with no account; delivery days restricted to Mon/Wed/Fri