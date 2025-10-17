# GraphQL E-Commerce Platform

A **production-ready multi-role eCommerce platform backend** built with **Node.js, Apollo Server, GraphQL, MySQL, and Sequelize**.  
This project demonstrates advanced GraphQL concepts, JWT authentication, role-based access, and MySQL integration.  

---

## **Table of Contents**

- [Features](#features)  
- [Technologies](#technologies)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup--installation)  
- [Database Setup](#database-setup)  
- [Running the Server](#running-the-server)  
- [GraphQL Operations](#graphql-operations)  
- [Sample Data](#sample-data)  
- [Future Enhancements](#future-enhancements)  
- [License](#license)  

---

## **Features**

- User roles: `ADMIN`, `SELLER`, `CUSTOMER`  
- JWT-based authentication  
- Password hashing with bcrypt  
- Role-based authorization for queries and mutations  
- Product management (CRUD) linked to sellers  
- Filtering products by category and price  
- DataLoader to prevent N+1 query problem  
- Ready for **GraphQL subscriptions** (real-time features)  
- MySQL database integration using Sequelize ORM  

---

## **Technologies**

- **Node.js**  
- **Apollo Server** (GraphQL)  
- **MySQL** (Database)  
- **Sequelize** (ORM)  
- **bcrypt** (Password hashing)  
- **jsonwebtoken** (JWT Auth)  
- **DataLoader** (Batching & caching)  
- **dotenv** (Environment variables)  

---

## **Project Structure**

graphql-ecommerce/
│
├─ src/
│  ├─ index.js              # Main server & Apollo setup
│  ├─ sync.js               # Database sync script
│  ├─ graphql/
│  │  ├─ schema.js          # GraphQL type definitions
│  │  └─ resolvers.js       # GraphQL resolvers
│  ├─ modules/
│  │  ├─ users/
│  │  │  └─ model.js        # User model
│  │  └─ products/
│  │     └─ model.js        # Product model
│  └─ utils/
│     └─ dataloader.js      # DataLoader setup
│
├─ .env                     # Environment variables
├─ package.json
└─ README.md



Setup & Installation

Clone the repo

git clone <your-repo-url>
cd graphql-ecommerce



Install dependencies
npm install



Create .env file in project root:
PORT=4000
JWT_SECRET=supersecretkey
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce
DB_PORT=3306



Database Setup

Create MySQL database
CREATE DATABASE ecommerce;





Run sync script to create tables:
node src/sync.js




Tables created:

users

products

Running the Server

Start server in development mode with nodemon:
npm run dev




Production mode:
npm start



Access GraphQL Playground:
http://localhost:4000/graphql




GraphQL Operations
Queries
# Get all users
query {
  users {
    id
    name
    email
    role
  }
}

# Get products with optional filters
query {
  products(category: "Electronics", minPrice: 100, maxPrice: 2000) {
    id
    name
    price
    stock
    category
    seller {
      name
      email
    }
  }
}



Mutations
# Register a user
mutation {
  register(name: "Jane Smith", email: "jane@test.com", password: "123456", role: SELLER) {
    id
    name
    role
  }
}

# Login user (returns JWT)
mutation {
  login(email: "jane@test.com", password: "123456")
}

# Create a product (SELLER only)
mutation {
  createProduct(name: "iPhone 15", price: 1200, stock: 50, category: "Electronics") {
    id
    name
    price
    stock
    category
    seller {
      name
      email
    }
  }
}

Sample Data
Users
Name	Email	Role	Password (plain)
John Doe	john@example.com
	SELLER	123456
Alice Smith	alice@example.com
	CUSTOMER	123456
Admin User	admin@example.com
	ADMIN	123456
Products
SellerId	Name	Price	Stock	Category
1	iPhone 15	1200	50	Electronics
1	MacBook Pro	2500	30	Electronics
1	AirPods Pro	250	100	Electronics

Passwords are hashed using bcrypt.

Future Enhancements

Orders & Checkout system

Stripe / Razorpay payment integration

Real-time subscriptions for order updates

Pagination and Relay-style queries

Multi-tenant support for sellers

Admin dashboard with analytics

License

MIT License © 2025

This README now fully documents your project with:

Setup instructions

GraphQL operations

Sample data

Project structure

Future enhancements
