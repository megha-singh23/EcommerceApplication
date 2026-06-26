# Shopora — Full-Stack E-Commerce App

Spring Boot + MySQL backend with JWT authentication and role-based access
control, paired with a React (Vite) frontend.

```
ecommerce-app/
├── backend/    Spring Boot 3 REST API (Java 17)
└── frontend/   React 18 + Vite SPA
```

## What's included

**Backend**
- JWT-based authentication (register / login / `me`)
- Role-based authorization: `ROLE_USER` and `ROLE_ADMIN`
  (enforced both centrally in `SecurityConfig` and per-method with
  `@PreAuthorize`)
- Entities: `User`, `Role`, `Category`, `Product`, `Cart`, `CartItem`,
  `Order`, `OrderItem`
- Public endpoints: browse/search products and categories
- Authenticated endpoints: cart management, placing orders, order history
- Admin-only endpoints: full CRUD on products/categories, view all orders
  and update their status, list users and enable/disable accounts
- Global exception handling with consistent JSON error responses
- A `DataInitializer` that seeds the `ROLE_USER`/`ROLE_ADMIN` roles and a
  default admin account on first run

**Frontend**
- Storefront: search/filter products, product detail page, cart, checkout,
  order history
- Auth pages with token persisted in `localStorage` and attached to every
  request via an axios interceptor; expired/invalid tokens redirect to login
- Route guards: `PrivateRoute` (must be logged in) and `AdminRoute`
  (must have `ROLE_ADMIN`) — the admin nav link and its routes are
  invisible/unreachable to ordinary shoppers
- Admin dashboard: manage products, categories, orders (update status),
  and users (enable/disable)
- A custom design system (see `frontend/src/styles/global.css`) — no UI
  framework, just CSS variables and hand-built components

## Prerequisites

- Java 17+ and Maven 3.8+
- MySQL 8.x running locally

## 1. Set up MySQL

```sql
CREATE DATABASE ecommerce_db;
```

The app will create tables automatically on first run
(`spring.jpa.hibernate.ddl-auto=update`), so you only need the empty schema.

## 2. Configure and run the backend

Edit `backend/src/main/resources/application.properties` and set your own
MySQL username/password and a long random `ecommerce.app.jwtSecret`
(32+ characters). Don't commit real secrets — for production, override
these with environment variables instead of editing the file directly:

```bash
export SPRING_DATASOURCE_USERNAME=youruser
export SPRING_DATASOURCE_PASSWORD=yourpassword
export ECOMMERCE_APP_JWTSECRET=$(openssl rand -base64 48)
```

Then build and run:

```bash
cd backend
mvn spring-boot:run
```

The API starts on `http://localhost:8080`. On first startup it prints:

```
>>> Default admin created: username='admin' password='Admin@123'
```

**Change this password immediately** if this is anything beyond a local demo.

### Key endpoints

| Method | Path | Access |
|---|---|---|
| POST | `/api/auth/register` | public |
| POST | `/api/auth/login` | public |
| GET | `/api/auth/me` | authenticated |
| GET | `/api/products`, `/api/categories` | public |
| POST/PUT/DELETE | `/api/products/**`, `/api/categories/**` | ADMIN |
| GET/POST/PUT/DELETE | `/api/cart/**` | authenticated |
| POST/GET | `/api/orders` | authenticated |
| PUT | `/api/orders/{id}/status` | ADMIN |
| GET | `/api/admin/users`, `/api/admin/orders` | ADMIN |

## 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`. The dev server proxies `/api` calls to
`http://localhost:8080` (see `vite.config.js`), so no extra CORS setup is
needed locally. The backend's `SecurityConfig` also allows any
`http://localhost:*` origin for when you run the frontend on a different
port.

To build a production bundle: `npm run build` (outputs to `frontend/dist`,
which you can serve from any static host or behind the same reverse proxy
as the API).

## Trying it out

1. Register a normal account, or log in as `admin` / `Admin@123`.
2. As admin, go to **Admin → Categories** and **Admin → Products** to add
   some inventory (an image URL is optional — products without one show a
   placeholder).
3. Log in as a regular user, browse the catalog, add items to the cart,
   and place an order.
4. Back in **Admin → Orders**, update the order's status; the customer
   will see the updated status next time they open **Orders**.

## Notes on the JWT/role-based design

- Passwords are hashed with BCrypt (`spring-security-crypto`), never stored
  or logged in plaintext.
- JWTs are signed with HS256 and carry only the username as the subject;
  authorities are re-loaded from the database on every request via
  `UserDetailsServiceImpl`, so revoking a role takes effect immediately
  without waiting for token expiry.
- The filter chain is stateless (`SessionCreationPolicy.STATELESS`) — no
  server-side session, which is what makes this safe to scale horizontally.
- On the frontend, route guards are a UX convenience only; the real
  enforcement is server-side. Don't rely on hiding a button as your only
  security control — that's why every admin write endpoint is also
  annotated with `@PreAuthorize("hasRole('ADMIN')")` in addition to the
  path-based rule in `SecurityConfig`.
