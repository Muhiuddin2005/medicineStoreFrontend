# MediStore 💊 — Frontend

> **"Your Trusted Online Medicine Shop"**

MediStore Frontend is a modern, responsive, and performance-optimized e-commerce web application built using **Next.js 16 (App Router)** and **TypeScript**. It serves as the user-facing interface for customers, sellers, and administrators of the MediStore platform, facilitating seamless medicine browsing, order placements, inventory tracking, and platform moderation.

---

## 🚀 Tech Stack

| Technology | Purpose | Description |
| :--- | :--- | :--- |
| **Next.js 16 (App Router)** | Core Framework | Server-Side Rendering (SSR), React Server Components (RSC), Client/Server boundary separation, and optimized routing. |
| **React 19 & TypeScript** | UI & Type Safety | Strongly typed components, safe props, and modern state management. |
| **Tailwind CSS & CSS** | Responsive Styling | Curated modern styling, sleek glassmorphism, responsive grid layouts, and consistent typography. |
| **Framer Motion & GSAP** | Micro-animations | Fluid user transitions, subtle hover micro-animations, and dynamic visual indicators. |
| **TanStack React Form & Zod** | Form Handling | Schema-based validation, error handling, state-tracked forms, and validation feedback. |
| **Lucide React** | Icon Pack | Modern, lightweight, and clean SVG icons. |
| **Sonner & SweetAlert2** | User Alerts | Non-intrusive toast notifications and interactive feedback modals. |

---

## 🌟 Key Features

### 👤 Customer Journey
* **Dynamic Medicine Showcase:** Browse all available over-the-counter (OTC) medicines with interactive filters (category, price range, manufacturer) and live search.
* **Detailed Product Pages:** View specifications, descriptions, manufacturer information, and authentic customer reviews.
* **Persistent Cart Management:** Seamlessly add/remove products, adjust quantities, and calculate subtotals with persistent client state.
* **Order Placement & Tracking:** Secure Checkout with shipping address configuration (supported via *Cash on Delivery*). Track order states in real-time.
* **Review System:** Leave verified reviews and star ratings for medicines after purchase.

### 🏪 Seller Dashboard
* **Sales Analytics:** Review active sales metrics, order tallies, and product lists on a dedicated seller dashboard.
* **Inventory Control (CRUD):** Add, update, or remove medicines. Handles image uploads and includes client-side compression via `browser-image-compression` to optimize server payload size.
* **Order Fulfillment:** Receive order notifications and update shipping statuses (`Processing` ➔ `Shipped` ➔ `Delivered`).

### 🛡️ Admin Panel
* **Platform Overview:** High-level dashboard showcasing platform statistics, user ratios, and active listings.
* **User Management:** Monitor registration profiles. Ability to ban/unban customers and sellers instantly.
* **Category Administration:** Create and modify medicine categories to maintain clean filtering lists.
* **Global Order & Stock Auditing:** Oversee all transactions and active inventory on the platform.

---

## 📁 Project Structure

```
frontend/
├── actions/                  # Next.js Server Actions for API communication
│   ├── admin.ts              # Admin controls (users, status modifications)
│   ├── auth.ts               # User login, registration, session management
│   ├── category.ts           # Category CRUD requests
│   ├── medicine.ts           # Medicine inventory and list fetching
│   ├── order.ts              # Order placement, history, tracking updates
│   ├── profile.ts            # Profile information updates
│   ├── review.ts             # Customer reviews submission and retrieval
│   └── user.ts               # User directory retrieval
├── public/                   # Static assets (images, icons, favicons)
├── src/
│   ├── app/                  # Next.js App Router folders
│   │   ├── (commonLayout)/   # Customer-facing public layouts and pages
│   │   │   ├── cart/         # Shopping cart checkout overview
│   │   │   ├── checkout/     # Order summary and address forms
│   │   │   ├── login/        # User authentication portal
│   │   │   ├── register/     # Registration (Roles: Customer, Seller)
│   │   │   ├── shop/         # Shop page (Listing, Search, Filters)
│   │   │   └── page.tsx      # Landing Home Page (Hero, Categories, Featured items)
│   │   ├── (dashboardLayout)/# Role-based dashboard layouts
│   │   │   ├── admin/        # Admin routes (Users, Categories, Orders, Medicines)
│   │   │   ├── dashboard/    # User landing profile redirection
│   │   │   └── seller/       # Seller routes (Inventory, Add-Medicine, Orders)
│   │   ├── forbidden/        # 403 Forbidden Access Page
│   │   ├── orders/           # Customer order tracking page ([id])
│   │   ├── globals.css       # Core Tailwind/Vanilla CSS configurations
│   │   ├── layout.tsx        # Base root layout
│   │   └── loading.tsx       # Global fallback skeletal loader
│   ├── components/           # Reusable UI component blocks
│   │   ├── animations/       # GSAP & Framer Motion animation containers
│   │   ├── layout/           # Shared structures (Navbar, Footer, HeroSection)
│   │   ├── modules/          # Domain-specific page sub-components
│   │   └── ui/               # Core atomic elements (buttons, inputs, tables, badges)
│   ├── lib/                  # Utilities and helper modules
│   │   ├── alerts.ts         # SweetAlert/Sonner configurations
│   │   └── utils.ts          # Tailwind CSS merge and className helpers
│   ├── providers/            # React Context Providers
│   │   ├── CartProvider.tsx  # Global shopping cart context & localStorage syncing
│   │   └── ThemeProvider.tsx # Next-themes provider (Dark/Light mode support)
│   ├── types/                # Shared TypeScript models and interfaces
│   └── proxy.ts              # Middleware route guard / Role interceptor
├── package.json              # Script commands and project dependencies
└── tsconfig.json             # TypeScript rules compilation settings
```

---

## 🔒 Route Protection & Middleware

To safeguard access across different user roles, the frontend includes a robust route protection helper in [proxy.ts](file:///c:/Programming/PH%20L2/medistore/frontend/src/proxy.ts):
- **Role Verification:** Extracts JWT payload cookies to inspect role claims (`CUSTOMER`, `SELLER`, `ADMIN`).
- **Dashboard Access:** Restricts `/admin/*` routes strictly to `ADMIN` accounts.
- **Merchant Access:** Restricts `/seller/*` routes to `SELLER` and `ADMIN` users.
- **Redirection:** Unauthenticated requests redirect to `/login`, and unauthorized profiles are securely redirected to `/forbidden`.

---

## ⚙️ Configuration & Environment Variables

Create a `.env` or `.env.local` file in the root of the `frontend` folder:

```env
# Backend API Base Endpoint URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🛠️ Installation & Local Setup

To run this application locally, follow these steps:

1. **Clone the repository and navigate into the folder:**
   ```bash
   git clone https://github.com/Muhiuddin2005/medicineStoreFrontend.git
   cd medicineStoreFrontend
   ```

2. **Install all required dependencies:**
   ```bash
   npm install
   ```

3. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```
   *The development server will boot up by default on **http://localhost:3001**.*

4. **Build the production application bundle:**
   ```bash
   npm run build
   ```

5. **Start the production server:**
   ```bash
   npm run start
   ```

---

## 🤝 Verification & Contributing

We maintain code consistency and type safety across our repository. Before pushing any edits:
* Ensure ESLint is satisfied: `npm run lint`
* Verify TypeScript compilation has no issues: `npx tsc --noEmit`
* Validate Next.js build runs cleanly: `npm run build`
