# HandsOn - A Community-Driven Social Volunteering Platform

## 📌 Project Overview  
HandsOn is a platform that connects volunteers with meaningful social impact opportunities. Users can discover and join volunteer-driven events, post requests for community help, form teams for large-scale initiatives, and track their contributions.  

## 🚀 Technologies Used  

### 🔹 Backend:  
- **Node.js** with **Express.js** – REST API development  
- **MongoDB** (Mongoose ORM) – Database for storing users, events, and requests  
- **JWT Authentication** – Secure login system  
- **bcrypt.js** – Password hashing for security  

### 🔹 Frontend:  
- **React (Vite)** – Fast and optimized React framework
- **React Router** – For navigation and routing  
- **Tailwind CSS** – Responsive styling for a clean design  
- **ShadCN UI** – Component library for a better UI/UX  
- **Axios** – API requests and data fetching  
- **React Context API** – Global state management for authentication  

---

## ✨ Features Implemented  

### 🔐 1️⃣ User Authentication (Signup & Login)  
- **Signup API:** Users can create an account with name, email, password, skills, and causes they support.  
- **Password Hashing:** Uses **bcrypt** to securely store passwords.  
- **Login API:** Users can log in using their email and password.  
- **JWT Token Generation:** A JWT token is issued upon successful login for authentication.  

#### 🔹 API Endpoints for Authentication  

##### **User Registration (Signup)**  
- **Endpoint:** `POST /api/auth/signup`  
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

##### **User Login**  
- **Endpoint:** `POST /api/auth/login`  
- **Request Body (JSON):**  
  ```json
  {
    "email": "johndoe@example.com",
    "password": "123456"
  }
  ```
- **Response:** Returns a JWT token for authentication.  

##### **Protected Route Example**  
- **Endpoint:** `GET /api/protected`  
- **Headers:**  
  ```json
  {
    "Authorization": "Bearer <your_jwt_token>"
  }
  ```
- **Response:** If token is valid, returns the protected resource.  

---

### 🎉 2️⃣ Event Management  
- Users can **create**, **view**, and **join** events.  
- Organizers can manage attendees.  
- Events are sorted by upcoming and past activities.  

#### 🔹 API Endpoints for Events  

##### **Create Event**  
- **Endpoint:** `POST /api/events/create`  
- **Request Body (JSON):**  
  ```json
  {
    "title": "Tree Plantation Drive",
    "description": "Join us to plant trees in our community park.",
    "date": "2024-05-15",
    "time": "09:00 AM",
    "location": "Greenwood Park",
    "capacity": 5,
    "createdBy": "user_id"
  }
  ```
- **Response:** Returns the created event details.  

##### **Join Event**  
- **Endpoint:** `POST /api/events/:eventId/join`  
- **Headers:**  
  ```json
  {
    "Authorization": "Bearer <your_jwt_token>"
  }
  ```
- **Response:** `Joined event successfully` or `Already joined this event`.  

##### **List Events**  
- **Endpoint:** `GET /api/events`  
- **Response:** Returns all available events.  

---

### 🆘 3️⃣ Help Requests  
- Users can **post** requests for community assistance.  
- Other users can **comment** on requests to offer help.  
- Requests are categorized by **urgency levels** (Low, Medium, High).  

#### 🔹 API Endpoints for Help Requests  

##### **Create Help Request**  
- **Endpoint:** `POST /api/help-requests/create`  
- **Request Body (JSON):**  
  ```json
  {
    "title": "Need Food Supplies for Flood Victims",
    "description": "Looking for donations to support 50 affected families.",
    "urgency": "High"
  }
  ```
- **Response:** `Help request posted successfully`.  

##### **List Help Requests**  
- **Endpoint:** `GET /api/help-requests`  
- **Response:** Returns all posted help requests.  

##### **Comment on Help Request**  
- **Endpoint:** `POST /api/help-requests/:requestId/comment`  
- **Request Body (JSON):**  
  ```json
  {
    "comment": "I can donate food supplies!",
    "user": "user_id"
  }
  ```
- **Response:** `Comment added successfully`.  

---

## 📌 How to Use  
1️⃣ **Clone the repository**  
```bash
git clone https://github.com/your-repo/hands-on.git
cd hands-on
```
  
2️⃣ **Install dependencies**  
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```
  
3️⃣ **Start the development servers**  
```bash
# Backend
npm run dev  

# Frontend
npm run dev
```

4️⃣ **Access the application**  
- Open `http://localhost:3000` for the frontend.  
- API runs on `http://localhost:5000`.  

---


Let me know if you need any changes! 🚀
