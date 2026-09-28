# BuildMart 🏗️

> **India's Modern Direct-From-Yard Building Supplies & Construction Procurement Platform**

BuildMart connects structural developers, civil contractors, civil engineers, and home builders directly to regional logistics yards for heavy building supplies: Portland cement, TMT steel rebars, kiln-fired clay bricks, river sand, vitrified tiles, waterproofing membranes, and industrial power tools.

---

## 🚀 Key Features

- **Direct Yard Pricing & Specifications:** Real-time stock status, compressive strengths, standard compliance (IS/BIS), and tiered contractor discounts.
- **Unit of Measurement (UoM) & MOQ:** Native support for bulk pricing per bag, ton, piece, sq.ft, or bucket with Minimum Order Quantity validation.
- **Smart Material Quantity Estimator:** Interactive construction calculators:
  - **Tile & Flooring Area Calculator:** Computes square footage, buffer allowance (5-15%), required box counts, and estimated cost.
  - **Concrete Slab Volume Estimator:** Calculates cement bags (50kg), coarse river sand (tons), and 20mm aggregates (tons) using the M20 (1:1.5:3) nominal mix ratio.
- **Construction Logistics & Site Dispatch:**
  - Standard Site Drop (Flatbed Tipper)
  - Flatbed with Hydraulic Crane Unload
  - Express Same-Day Urgent Tipper Dispatch
  - Site entrance clearance and unloading advisory notes
- **Live Dispatch Tracker:**
  - 5-stage fulfillment timeline: *Order Placed → Confirmed & Yard Assigned → Dispatched → Out for Delivery → Delivered & Signed*.
  - Interactive simulation button to test status progression in real time.
- **Cart & Discount Engine:**
  - Automatic bulk contractor savings calculations.
  - Dynamic 5% GST on building materials.
  - Free flatbed delivery milestone progress bar for orders ≥ ₹50,000.
  - Persistent state in browser `localStorage`.

---

## 📂 Architecture & Directory Structure

```text
buildmart/
│
├── frontend/                          # React 18 + Vite SPA
│   ├── public/
│   │   └── favicon.svg
│   │
│   ├── src/
│   │   ├── assets/images/             # Static image assets & fallbacks
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Top bar, search input & cart badge
│   │   │   ├── Footer.jsx             # Material categories & logistics assurance
│   │   │   ├── ProductCard.jsx        # Material card with MOQ, UoM and quick-add
│   │   │   ├── CategoryFilter.jsx     # Category scrolling pill filter
│   │   │   ├── CartItem.jsx           # Quantity controls & line savings
│   │   │   ├── OrderStatus.jsx        # 5-step milestone tracking stepper
│   │   │   ├── MaterialCalculator.jsx # Tile area & concrete slab estimator
│   │   │   └── Toast.jsx              # Floating notification feedback
│   │   │
│   │   ├── context/
│   │   │   └── CartContext.jsx        # Global cart state & discount calculation
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Hero, trust metrics, catalog & calculator
│   │   │   ├── Products.jsx           # Catalog with search, sorting & filters
│   │   │   ├── ProductDetails.jsx     # Technical specs table & bulk tiers
│   │   │   ├── Cart.jsx               # Order breakdown & free delivery tracker
│   │   │   ├── Checkout.jsx           # Site delivery address & crane logistics
│   │   │   └── Orders.jsx             # Real-time order dispatch tracking
│   │   │
│   │   ├── services/
│   │   │   └── api.js                 # Centralized API service with proxy
│   │   │
│   │   ├── App.jsx                    # Routing configuration
│   │   ├── main.jsx                   # React DOM root
│   │   └── index.css                  # Modern industrial CSS design system
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
├── backend/                           # Node.js + Express REST API
│   ├── routes/
│   │   ├── productRoutes.js           # /api/products, /categories, /:id
│   │   └── orderRoutes.js             # /api/orders, /:id, /:id/status
│   │
│   ├── controllers/
│   │   ├── productController.js       # Query filters, search, sorting
│   │   └── orderController.js         # Validation, tax, delivery fee & mutation
│   │
│   ├── middleware/
│   │   └── errorHandler.js            # 404 & centralized error formatting
│   │
│   ├── data/
│   │   ├── products.js                # Seed products catalog with specs & tiers
│   │   └── orders.js                  # In-memory store with live mutation helpers
│   │
│   ├── server.js                      # Express app, CORS, JSON parser & logger
│   ├── package.json
│   └── .env
│
├── package.json                       # Root runner with concurrently
├── README.md
└── .gitignore
```

---

## 🛠️ Quick Start & Running Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
Run in both backend and frontend directories:
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3. Run the Development Servers
From the `buildmart/` root directory:
```bash
# Start backend on http://localhost:5000
npm run dev:backend

# In a second terminal, start frontend on http://localhost:5173
npm run dev:frontend
```

Alternatively, run both concurrently from the root:
```bash
npm install -D concurrently
npm run dev
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/products` | Fetch catalog (supports `?category=`, `?search=`, `?sortBy=`, `?inStockOnly=`) |
| `GET` | `/api/products/:id` | Fetch single product with technical specs |
| `GET` | `/api/products/categories` | Get category names with product counts |
| `GET` | `/api/orders` | List all site delivery orders |
| `GET` | `/api/orders/:id` | Get order details & tracking timeline |
| `POST` | `/api/orders` | Place a new order with site address & items |
| `PATCH`| `/api/orders/:id/status`| Update order fulfillment status |

---

## 🧱 Design System
- **Colors:** Safety Construction Orange (`#ea580c`), Technical Steel Blue (`#0284c7`), Industrial Amber (`#f59e0b`), Deep Slate/Charcoal (`#0f172a`).
- **Typography:** `Outfit` (Headings) & `Plus Jakarta Sans` (Body).
- **Responsive:** Designed for mobile site supervisors on tablets/phones and desktop procurement teams.
