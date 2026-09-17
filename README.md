# User Notes Dashboard

A full-stack web application where users can securely register, log in, and manage their personal notes/tasks.

Users can create, view, edit, and delete their own messages.

## Features

- User Signup
- User Login
- JWT-based authentication
- Protected Dashboard
- Create notes/tasks
- View personal notes
- Edit notes
- Delete notes
- User-specific message access
- Password hashing using bcrypt
- Form validation using Formik and Yup
- Toast notifications using React-Toastify
- Responsive UI using Material UI
- MySQL database integration
- CORS configuration
- Environment variables for sensitive information

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Material UI (MUI)
- Formik
- Yup
- React-Toastify

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

## Project Structure

```text
user-notes-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MessageForm.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   └── HomePage.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── validations/
│   │   │   ├── signupSchema.js
│   │   │   └── loginSchema.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── index.js
│   ├── db.js
│   ├── authMiddleware.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## Database Setup

Create the database in MySQL:

```sql
CREATE DATABASE user_notes_db;
```

Select the database:

```sql
USE user_notes_db;
```

### User Table

```sql
CREATE TABLE user_tbl (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### Message Table

```sql
CREATE TABLE message_tbl (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user_tbl(id),
    message VARCHAR(255)
);
```

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=user_notes_db
JWT_SECRET=your_jwt_secret
```

Replace the values with your local MySQL credentials.

> Never commit the `.env` file to GitHub.

## Backend Setup

Open a terminal and run:

```bash
cd backend
npm install
npm start
```

Backend server:

```text
http://localhost:8000
```

## Frontend Setup

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the Vite development server, usually:

```text
http://localhost:5173
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login user |

### Messages

| Method | Endpoint | Authentication |
|---|---|---|
| GET | `/messages` | Required |
| POST | `/messages` | Required |
| PUT | `/messages/:id` | Required |
| DELETE | `/messages/:id` | Required |

### Other

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Basic backend response |
| GET | `/about` | About endpoint |
| GET | `/protected` | Protected route |

## Authentication Flow

The application uses JWT-based authentication.

1. User registers with name, email, and password.
2. Password is hashed using bcrypt before being stored in MySQL.
3. User logs in using email and password.
4. Backend verifies the password.
5. Backend generates a JWT token.
6. Frontend stores the token in `localStorage`.
7. The token is sent with protected API requests.
8. Backend middleware verifies the token.
9. The authenticated user's ID is used to access their own messages.

Authorization header format:

```text
Authorization: Bearer <token>
```

## Authorization and Data Ownership

Each message is associated with the authenticated user's ID.

For update and delete operations, the backend checks both:

- Message ID
- Authenticated User ID

This ensures that users can only view, edit, and delete their own messages.

## Form Validation

Formik and Yup are used for frontend form validation.

Validation is implemented for:

- Signup
- Login
- Message creation

## Notifications

React-Toastify is used for displaying success and error notifications.

Examples include:

- Signup successful
- Login successful
- Logout successful
- Message added
- Message updated
- Message deleted
- API errors

## How to Run the Project

### 1. Start MySQL

Make sure MySQL is running and the required database and tables are created.

### 2. Start Backend

```bash
cd backend
npm install
npm start
```

### 3. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the Application

Open the frontend URL provided by Vite in your browser.

## Future Improvements

- Loading indicators
- Search and filter functionality
- Pagination
- User profile management
- Improved error handling
- Automated testing
- Frontend and backend deployment

## Author

Developed as a full-stack web development project using React, Node.js, Express, and MySQL.