# 📋 Kanban Task Management System

A full-stack task management application built with Node.js, Express, MongoDB, and Socket.io for real-time collaboration. Features a clean Kanban board interface with drag-and-drop functionality, user authentication, and activity logging.

## ✨ Features

- **🔐 User Authentication** - Secure JWT-based registration and login
- **📊 Kanban Board** - Visual task management with Todo, In Progress, and Done columns
- **🔄 Real-time Updates** - Live task updates across all connected clients via Socket.io
- **👥 User Assignment** - Assign tasks to specific team members
- **⚡ Priority Levels** - Set task priorities (Low, Medium, High)
- **📝 Activity Logging** - Track all task creation, updates, and deletions
- **🎯 Task Management** - Create, edit, delete, and move tasks between columns
- **📱 Responsive Design** - Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional event-based communication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Database Schema
- **Users** - User accounts with encrypted passwords
- **Tasks** - Task items with status, priority, and assignment
- **ActionLog** - Activity tracking and audit trail

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kanban-task-management.git
   cd kanban-task-management
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secure_jwt_secret_key
   PORT=5000
   ```

   **Important:** Replace with your actual values:
   - Get MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use local MongoDB
   - Generate a strong JWT secret (recommended: 32+ characters)

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:5000`

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # Database connection configuration
├── controllers/
│   └── taskController.js  # Task-related business logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User schema and model
│   ├── Task.js            # Task schema and model
│   └── ActionLog.js       # Activity log schema and model
├── routes/
│   ├── auth.js            # Authentication routes
│   └── task.js            # Task management routes
├── .env                   # Environment variables (create this)
├── index.js               # Main server entry point
└── package.json           # Dependencies and scripts
```

## 🔗 API Endpoints

### Authentication
```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
```

### Tasks (Protected Routes)
```http
GET    /api/tasks                 # Get all tasks
POST   /api/tasks                 # Create new task
PUT    /api/tasks/:id             # Update task
DELETE /api/tasks/:id             # Delete task
GET    /api/tasks/actions/logs    # Get activity logs
```

### Request Examples

**Register User:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Create Task:**
```json
POST /api/tasks
Authorization: Bearer <jwt_token>
{
  "title": "Design landing page",
  "description": "Create a responsive landing page design",
  "priority": "High",
  "assignedUser": "user_id_here"
}
```

## 🔌 Socket.io Events

The application uses Socket.io for real-time updates:

```javascript
// Client-side event listeners
socket.on('task:created', (task) => {
  // Handle new task creation
});

socket.on('task:updated', (task) => {
  // Handle task updates
});

socket.on('task:deleted', (taskId) => {
  // Handle task deletion
});
```

## 🗄️ Database Models

### Task Model
```javascript
{
  title: String (required),
  description: String,
  status: ['Todo', 'In Progress', 'Done'],
  priority: ['Low', 'Medium', 'High'],
  assignedUser: ObjectId (User reference),
  createdAt: Date,
  lastUpdatedAt: Date
}
```

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### ActionLog Model
```javascript
{
  user: ObjectId (User reference),
  action: String,
  task: ObjectId (Task reference),
  timestamp: Date
}
```

## 🔧 Development Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ Yes |
| `PORT` | Server port number | ❌ No (defaults to 5000) |

## 🔒 Security Features

- **Password Hashing** - bcryptjs with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Configured for specific origins
- **Environment Variables** - Sensitive data stored securely

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Thanks to the Node.js and Express.js communities
- MongoDB for the excellent database solution
- Socket.io for real-time communication capabilities

---

**⭐ If you found this project helpful, please consider giving it a star!**
