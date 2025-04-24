# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


# 🛒 React TypeScript eCommerce Marketplace

A fully functional Amazon-like eCommerce platform built using **React + TypeScript**, featuring:

- Product listing and cart functionality
- Modular SCSS styling
- LocalStorage-based user authentication
- JWT-like token generation and decoding
- Order placement with GST calculations
- Order history page
- Collapsible sidebar and global alert system

---

## 📁 Project Structure

src/ ├── components/ # UI Components (Cart, Orders, Sidebar, etc.) ├── data/ # Static book/product data (40+ items) ├── pages/ # Route-based pages (Home, Orders, etc.) ├── services/ # CartProvider, AlertProvider, custom hooks ├── styles/ # SCSS modules (buttons, forms, layout, etc.) ├── types/ # TypeScript type definitions (User, CartItem, etc.) ├── utils/ # Utility functions (auth.ts, etc.) └── App.tsx # Main app component

markdown
Copy
Edit

---

## 🚀 Features

### 🔐 Authentication

- Custom signup/login logic using localStorage
- JWT-like token is generated (using `btoa`) and decoded
- `currentUser` is stored in localStorage and updated on logout

### 🛍 Product & Cart System

- Users can add, increment, or decrement items in their cart
- Cart items show image, quantity controls, and remove buttons
- Final order shows subtotal, 18% GST, and final amount

### 📦 Order History

- On placing an order, cart items' IDs are saved to `boughtItems` under the current user
- `/orders` page fetches and displays these purchases (title + price only)

### 📢 Global Alert System

- Uses `AlertProvider` + `useAlert.ts`
- Auto-dismissable stacked alerts with transition effects
- Supports `success`, `error`, and `info` types

### 📚 Book Data

- Static `books.data.ts` contains 40+ mock book items with:
  - `id`, `title`, `author`, `description`, `image`, `price`, etc.

### 📱 Responsive UI

- Sidebar toggles using a hamburger button
- Layout mimics a bookstore/marketplace
- SCSS modules used for clean styling and maintainability

---

## 🔧 Tech Stack

- **React** (w/ Vite or CRA)
- **TypeScript**
- **SCSS Modules**
- **localStorage** for data persistence
- **Custom Hooks & Context API**
- No backend or external database

---

## 🧪 Available Scripts

```bash
npm install       # Install dependencies
npm run dev       # Run development server
npm run build     # Production build

Product Listing Page

Cart with GST calculations

Order History

Sidebar Navigation

Global Alerts

👨‍💻 Developer Notes
Built with a focus on modularity and simplicity

No external packages used for authentication or backend

Data is volatile (stored in browser only) — not suitable for production use

📂 Future Improvements
Add user profile & password update feature

Backend integration (Firebase / Express + MongoDB)

Coupon/Discounts

Image zoom, product filters

Order confirmation modals

Pagination and search for book listing

💻 Author
Ashutosh Singh
Master’s in Computer Applications 🥇 | Angular + React Enthusiast
