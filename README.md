# Shopora — Full Stack E-Commerce Application

A full-stack e-commerce web application built with **React + Vite** on the frontend and **Spring Boot** on the backend, backed by a **PostgreSQL** database. Deployed on **Vercel** (frontend) and **Render** (backend + database).

---

## Live Demo

| Layer | URL |
|---|---|
| **Frontend** | [ecommerce-application-eta-lemon.vercel.app](https://ecommerce-application-eta-lemon.vercel.app) |
| **Backend API** | [ecommerceapplication-pkf7.onrender.com/api](https://ecommerceapplication-pkf7.onrender.com/api) |

---

## Features

- JWT-based authentication (Register / Login)
- Shopping cart with quantity management
- Product search and category filtering
- Product listing with pagination
- User profile and order history
- Admin panel for product & category management
- Responsive design with Flowbite React components

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| Flowbite React | UI component library |
| Tailwind CSS | Utility-first styling |
| Context API | Global state management |

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 3 | REST API framework |
| Spring Security | Authentication & authorization |
| Spring Data JPA | Database ORM |
| JWT (JSON Web Tokens) | Stateless authentication |
| Hibernate | ORM implementation |
| Maven | Dependency management |

### Database & Deployment
| Technology | Purpose |
|---|---|
| PostgreSQL | Relational database |
| Render | Backend & database hosting |
| Vercel | Frontend hosting |
| Docker | Backend containerization |

---

## Project Structure

```
ecommerce-app/
├── frontend/                   # React + Vite app
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js  # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── admin/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.production
│   ├── vercel.json
│   └── package.json
│
├── backend/                    # Spring Boot app
│   ├── src/main/java/com/ecommerce/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── service/
│   │   └── EcommerceApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
```

---

## Getting Started Locally

### Prerequisites
- Java 17 or 21
- Maven
- PostgreSQL

---

### 1. Clone the Repository

```bash
git clone https://github.com/megha-singh23/EcommerceApplication.git
cd EcommerceApplication
```

---

### 2. Backend Setup

```bash
cd backend
```

Create `src/main/resources/application.properties`:

```properties
server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

ecommerce.app.jwtSecret=your_jwt_secret_key_here
ecommerce.app.jwtExpirationMs=86400000
ecommerce.app.allowedOrigins=http://localhost:3000,http://localhost:5173
```

Run the backend:

```bash
./mvnw spring-boot:run
```

Backend will start at `http://localhost:8080`

---

### 3. Frontend Setup

```bash
cd frontend
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

Install dependencies and start:

```bash
npm install
npm run dev
```

Frontend will start at `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products (paginated) |
| GET | `/api/products?keyword=phone` | Search products |
| GET | `/api/products?categoryId=1` | Filter by category |
| GET | `/api/products/{id}` | Get product by ID |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/{id}` | Update product (Admin) |
| DELETE | `/api/products/{id}` | Delete product (Admin) |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category (Admin) |

### Cart & Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart` | Add item to cart |
| DELETE | `/api/cart/{id}` | Remove item from cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Get user orders |

---

## Environment Variables

### Backend (Render)
| Variable | Description |
|---|---|
| `DATABASE_URL` | JDBC PostgreSQL connection URL |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Secret key for JWT signing |
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins |

### Frontend (Vercel)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## Docker (Backend)

```bash
# Build image
docker build -t shopora-backend .

# Run container
docker run -p 8080:8080 \
  -e DATABASE_URL=jdbc:postgresql://localhost:5432/ecommerce_db \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=yourpassword \
  -e JWT_SECRET=your_secret \
  -e ALLOWED_ORIGINS=http://localhost:5173 \
  shopora-backend
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request
