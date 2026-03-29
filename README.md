# 📝 To-Do Application (Full Stack)
Built as part of a Full Stack Developer Assessment

A full-stack To-Do application built with authentication and complete CRUD functionality. Users can register, log in, and manage their personal tasks efficiently.

---

## 🚀 Live Demo

* Link - https://todo-app-green-alpha-38.vercel.app/

---

## 🧠 Features

* 🔐 User Authentication (Register & Login)
* 🔑 JWT-based Authorization
* 📝 Create, Read, Update, Delete Tasks
* ✅ Mark tasks as completed
* 🔄 Auto Sign-In (Persistent Login)
* 🎨 Clean and Responsive UI

---

## ⚙️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js
* RESTful API design 
* MongoDB (Mongoose)

### Authentication

* JSON Web Token (JWT)
* bcrypt

---

## 📁 Project Structure

```
Assessment/
 ├── frontend/
 └── backend/
```

---

## 🔌 API Endpoints

### Auth Routes

* POST /api/auth/register
* POST /api/auth/login

### Task Routes (Protected)

* GET /api/tasks
* POST /api/tasks
* PUT /api/tasks/:id
* DELETE /api/tasks/:id

---

## 🔐 Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### Frontend (Vercel)

```
VITE_API_URL=your_backend_url
```

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/Sumit797369/todo-app.git
```

### 2. Install dependencies

#### Backend

```
cd backend
npm install
npm start
```

#### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

* API tested using Postman
* Manual testing for UI and features

---

## 🎯 Bonus Features

* 🔍 Search functionality
* 📊 Pagination 
* 🛡️ Input validation


