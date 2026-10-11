<div align="center">

# 🛒 বাজার দর — BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

</div>

BazarDor is a Bangla market-price tracker. It shows today's prices of daily essentials (rice, lentils, oil, vegetables, fish, meat, dairy, spices) with price-change badges, a live scrolling ticker, category browsing, and a per-market price breakdown across divisions of Bangladesh.

## 🧰 Technologies Used

| Purpose | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + DaisyUI |
| Authentication | Better Auth (Email/Password + Google + GitHub) |
| Database | MongoDB (Better Auth adapter) |
| Notifications | react-hot-toast |
| Data | Programming Hero BazarDor Open API |
| Deployment | Vercel |

## ✨ Key Features

1. **Live price ticker & price-change badges** — an infinite marquee under the navbar plus green ▲ / red ▼ / gray — badges with Bengali numerals.
2. **Top risers & fallers** — home page highlights the 6 biggest price rises and drops, followed by the full product grid with a smooth-scroll hero CTA.
3. **Category browsing with numeric sorting** — filter by category and sort (ডিফল্ট / কম থেকে বেশি / বেশি থেকে কম) by true numeric value.
4. **Protected product details** — min / max / average / today price, price history comparison and a division-wise market table (login required).
5. **Full authentication & profile** — Email/Password, Google and GitHub sign-in, toast feedback everywhere, profile page and *update name* flow.

Bonus: skeleton loaders, friendly 404 pages, and a fully responsive layout (mobile → desktop).

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Open <http://localhost:3000>.

### OAuth setup

| Provider | Callback URL |
|---|---|
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |

For production, add the same paths using your Vercel domain and set `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` to it.

### Deploy to Vercel

1. Push to GitHub and import the repo in Vercel.
2. Add every variable from `.env.example` in *Project → Settings → Environment Variables*.
3. Deploy. Dynamic routes (`/product/[slug]`, `/category/[slug]`) work on refresh — no static export is used.

## 📁 Structure

```
src/
  app/                 routes (home, category, product, signin, signup, profile, api/auth)
  components/
    ui/                Section, EmptyState, ErrorAlert, FormField, SubmitButton, Avatar
    navbar/            Logo, CategoryNav, AuthButtons, UserMenu
    auth/              AuthCard, SignInForm, SignUpForm
    product/           ProductSummary, PriceStats, StatCard, PriceTrend, MarketPrices, DivisionTable
    category/          CategoryHeader
    profile/           ProfileCard, UpdateProfileForm
    (root)             Navbar, Ticker, TickerItem, Hero, ProductCard, ProductGrid, SortSelect, Skeletons, Footer…
  hooks/               useProducts, useRequireAuth
  lib/                 auth (server + client), api, Bengali number helpers, redirect helper
```
