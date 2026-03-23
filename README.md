# ApnaKart — Smart Daily Needs 🛒

A modern, production-ready web application for Indian users to manage daily needs — grocery browsing, AI-powered recommendations, budget tracking, and subscription management.

## Features

- 🛍️ **Grocery Store** — Browse 30+ Indian grocery items with categories, search, and filters
- 🛒 **Smart Cart** — AI-powered "you might also need" recommendations
- 💰 **Budget Dashboard** — Expense tracking, category breakdown, spending charts
- 🤖 **AI Assistant** — Multi-agent system (Planner, Budget, Shopping, Execution)
- 🔄 **Subscriptions** — Track milk, gas, electricity, and other recurring services
- 🍽️ **Meal Plans** — Weekly meal planning with cost estimates
- 🌙 **Dark/Light Mode** — Beautiful, premium UI with theme toggle
- 📱 **Mobile-First** — Fully responsive design

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + CSS Custom Properties
- **State:** React Context API
- **AI:** Simulated multi-agent system (ready for OpenAI/Claude integration)
- **API:** Next.js API Routes

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home Dashboard
│   ├── store/page.tsx      # Grocery Store
│   ├── cart/page.tsx       # Cart & Checkout
│   ├── budget/page.tsx     # Budget Dashboard
│   ├── assistant/page.tsx  # AI Assistant
│   ├── login/page.tsx      # Authentication
│   └── api/                # API Routes
│       ├── products/       # Product catalog
│       ├── cart/            # Cart operations
│       ├── budget/         # Budget & transactions
│       └── agents/         # AI agent endpoint
├── components/
│   └── layout/             # Sidebar, Header, ClientLayout
├── lib/
│   ├── agents/             # AI multi-agent system
│   ├── data/               # Mock data
│   ├── hooks/              # Custom React hooks
│   ├── context.tsx         # Cart & Theme providers
│   └── utils.ts            # Utility functions
└── types/                  # TypeScript definitions
```

## Promo Codes

Try `APNA10` or `FIRST10` in the cart for 10% discount!

## AI Agents

| Agent | Role |
|-------|------|
| 🧠 Planner | Analyzes habits & suggests daily needs |
| 💰 Budget | Tracks & optimizes spending |
| 🛒 Shopping | Auto-builds smart carts |
| ⚡ Execution | Finalizes actions & workflow |
