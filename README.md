# HandsOn - A Community-Driven Social Volunteering Platform

## 📌 Project Overview
HandsOn is a platform that connects volunteers with meaningful social impact opportunities. Users can discover and join volunteer-driven events, post requests for community help, form teams for large-scale initiatives, and track their contributions.

## 🚀 Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Token), bcrypt
- **API Communication:** REST API

## ✨ Features Implemented (Authentication & Authorization)
### 1️⃣ User Authentication (Signup & Login)
- **Signup API:** Users can create an account with name, email, password, skills, and causes they support.
- **Password Hashing:** Uses **bcrypt** to securely store passwords.
- **Login API:** Users can log in using their email and password.
- **JWT Token Generation:** A JWT token is issued upon successful login for authentication.

### 2️⃣ Authorization & Protected Routes
- **JWT Middleware:** Protects API routes by verifying tokens.
- **Secure User Access:** Only authenticated users can access certain endpoints.

## API Endpoints for Authentication

### 1️⃣ User Registration (Signup)
- **Endpoint:** `POST /api/auth/signup`
- **Description:** Allows users to create an account.
- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "123456",
    "skills": ["Teaching", "Coding"],
    "causes": ["Education", "Healthcare"]
  }
  ```
- **Response:** Returns a success message with user details.

### 2️⃣ User Login
- **Endpoint:** `POST /api/auth/login`
- **Description:** Allows users to log in and receive a JWT token.
- **Request Body (JSON):**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "123456"
  }
  ```
- **Response:** Returns a JWT token for authentication.

### 3️⃣ Protected Route Example
- **Endpoint:** `GET /api/protected`
- **Description:** Accessing this route requires a valid JWT token.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your_jwt_token>"
  }
  ```
- **Response:** If token is valid, returns the protected resource.

---

## How to Use Authentication in Requests

1️⃣ Register a new user using the **Signup API**.
2️⃣ Log in using the **Login API** and copy the received token.
3️⃣ Send this token in the **Authorization Header** for protected routes.
