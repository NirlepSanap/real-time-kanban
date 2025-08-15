const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());

// In-memory task list (temporary)
let tasks = [];

// Test API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working' });
});

// ✅ Handle task creation
app.post('/tasks', (req, res) => {
  const { title, description, status, priority } = req.body;

  if (!title || !status) {
    return res.status(400).json({ error: 'Title and status are required.' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description: description || '',
    status,
    priority: priority || 'Low',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  // Optionally emit via socket.io
  io.emit('taskCreated', newTask);

  res.status(201).json({ message: 'Task created', task: newTask });
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
