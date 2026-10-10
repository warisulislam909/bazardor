# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আনুমানিক বাজারদর, দামের ওঠানামা এবং একাধিক বাজারের মূল্য তুলনা দেখার জন্য একটি responsive বাংলা ওয়েব অ্যাপ। Figma-র দেওয়া বাজার/সবজি-ভিত্তিক ভিজ্যুয়ালকে অনুসরণ করে পরিষ্কার সবুজ-ক্রিম ডিজাইন ও আলাদা reusable component ব্যবহার করা হয়েছে।

## Technologies
- **Next.js 15 App Router** — routing, layouts, pages
- **React 19 + TypeScript** — reusable, typed UI components
- **Tailwind CSS** — styling configuration and utility foundation (custom responsive CSS for Figma matching)
- **Better Auth** — email/password and Google/GitHub OAuth
- **Prisma + SQLite** — local development database and auth persistence
- **react-hot-toast** — success/error notifications
- **Lucide React** — interface icons

## Features
1. Responsive navbar, category navigation, Bengali date, sign-in/sign-up controls and continuously scrolling market ticker.
2. Hero/banner with provided illustration and same-page “আজকের দাম দেখুন” anchor CTA.
3. Top six price risers, top six fallers and complete responsive product grid powered by typed data.
4. Product cards with Bengali numerals, unit, price and green/red/neutral change badges.
5. Category pages with loading skeletons and numeric ascending/descending sorting.
6. Protected product details with minimum, maximum, average and bazar-wise prices.
7. Better Auth email/password and Google/GitHub sign-in, toast feedback, profile page and name update flow.
8. Friendly 404 / invalid category states and responsive mobile, tablet and desktop layouts.

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
npm install
cp .env.example .env
# Set BETTER_AUTH_SECRET to a secure random value; configure OAuth keys if using social login.
npx prisma generate
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables
- `BETTER_AUTH_SECRET` — a long random secret
- `BETTER_AUTH_URL` — base URL (for local use `http://localhost:3000`)
- `DATABASE_URL` — SQLite path (default `file:./dev.db`)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — optional Google OAuth credentials
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` — optional GitHub OAuth credentials

Email/password auth works with the local Better Auth setup. Social login requires OAuth credentials from Google/GitHub and the correct callback URL configured with each provider.

## Deployment

Use a Node-compatible host such as Vercel. Configure all environment variables in the host. For persistent production auth data, switch SQLite to a production database supported by Prisma (for example PostgreSQL) and update the Prisma datasource/provider before deployment. Ensure the Better Auth base URL matches the deployed origin and configure the OAuth callback URLs. Next.js App Router handles deep links for `/category/[slug]`, `/product/[slug]`, `/signin`, and `/signup` on refresh.

## Project structure

```text
app/
  api/auth/[...all]/route.ts
  category/[slug]/page.tsx
  product/[slug]/page.tsx
  signin/page.tsx
  signup/page.tsx
  profile/page.tsx
  profile/update/page.tsx
  layout.tsx  page.tsx  not-found.tsx  globals.css
components/
  Navbar.tsx  Hero.tsx  Footer.tsx
  ProductCard.tsx  ProductGrid.tsx  ProductSections.tsx
  SkeletonGrid.tsx  Providers.tsx
lib/
  products.ts  auth.ts  auth-client.ts
prisma/schema.prisma
public/bazar-hero.png  public/logo-icon.png
```

## Data note

Product prices and bazar-level values included here are sample/demo values for the assignment and are not a live government price feed. Update `lib/products.ts` to replace them with verified data.
