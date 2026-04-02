# Dulceria Medina

Authentic Mexican candy, piñatas, and fresh kitchen — based in St. Louis.

## Tech Stack

- **Vite** — Fast build tooling
- **React** with **TypeScript**
- **shadcn/ui** — Component library
- **Tailwind CSS** — Utility-first styling

## Getting Started

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd dulceria-delight

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server will start at [http://localhost:8080](http://localhost:8080).

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the development server       |
| `npm run build`   | Build for production               |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |
| `npm run test`    | Run tests                         |

## Production (Vercel)

To avoid **500 errors** in production, set these in **Vercel → Project → Settings → Environment Variables** (for Production):

**Server (API):**

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT tokens
- `STRIPE_SECRET_KEY` — Stripe secret key (sk_…)
- `GOOGLE_CLIENT_SECRET` — Google OAuth client secret
- `STRIPE_WEBHOOK_SECRET` — (optional) For Stripe webhooks

**Client (used at build time):**

- `VITE_API_BASE_URL` — e.g. `https://www.dulceriamedina.com/api`
- `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (pk_…)
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client ID

Redeploy after changing env vars so the new values are applied.
