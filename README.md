# Frejen Task

## Overview
Frejen Task is a **Web Platform for Ticket Management** developed for **Frejen Wise Solutions**. The platform enables users to manage tickets efficiently with features for authentication, ticket creation, filtering, and state management.

---

## Features
The project satisfies all the functional requirements provided in the task description, along with some additional enhancements:

### Required Functionalities
1. **Authentication Page**  
   - Login using email and password
2. **Profile Page**  
   - Update name, password, and associated department
3. **Home Page**  
   - Ticket list showing:
     - Title
     - Creation date
     - Last updated date
     - Responsible department
     - Current state
   - Displays tickets associated with the user's department or created by the user
4. **Ticket Creation Page**  
   - Form with required fields: title, description, and department
5. **Ticket Detail Page**  
   - Detailed view of a single ticket
6. **Lazy Loading**  
   - Implemented for the ticket list
7. **Filtering**  
   - Filter tickets by:
     - State (multi-state selection)
     - Text (title and description)
8. **Ticket States**  
   - Four possible states:
     - Pending
     - Refused
     - In Progress
     - Completed.
   - State cannot be changed if the ticket is *refused* or *completed*.
   - Refusing a ticket requires observations.
9. **Admin Privileges**  
   - Admin users can view and manage tickets across all departments.

### Additional Features
- Logout functionality.
- Server-side authentication for page access authorization.
- Custom error page.

---

## Tech Stack

### Backend
- **Express.js** for server-side logic.
- **Sequelize** for ORM.
- **Passport.js** for authentication.
- **bcrypt** for password encryption.

#### Server Dependencies:
```json
"dependencies": {
    "bcrypt": "^5.1.1",
    "connect-session-sequelize": "^7.1.7",
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "sequelize": "^6.37.5"
}
```

### Frontend
- **Next.js** for server-side rendering and React-based UI.
- **React** for component-based UI.
- **Axios** for API communication.

#### Client Dependencies:
```json
"dependencies": {
    "axios": "^1.7.9",
    "next": "15.1.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
}
```
---

## Installation and Usage

### Prerequisites
- **Node.js** installed on your machine.
- **MySQL** is installed and running on your machine.
- Create a database named `frejen_task`.

### Setup
1. Extract the project folder and navigate to the extracted directory.
2. Inside, you'll find two folders:
   - `client` (frontend)
   - `server` (backend)

#### Backend Setup
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies and start the server:
   ```bash
   npm install
   node server
   ```
3. The server will start listening on `http://localhost:8000`.

#### Frontend Setup
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies and start the frontend:
   ```bash
   npm install
   npm run dev
   ```
3. The Next.js app will start listening on `http://localhost:3000`.

## Notes
- For simplicity during testing, all users in the database are set up with `a` for the password.


---
