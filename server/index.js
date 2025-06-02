import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mariadb from 'mariadb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Database pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

// Database initialization
async function initializeDatabase() {
  let conn;
  try {
    conn = await pool.getConnection();
    
    // Create users table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tickets table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('open', 'in-progress', 'closed') DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create knowledge_base table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        solution TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    if (conn) conn.release();
  }
}

initializeDatabase();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    
    await conn.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    conn.release();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const conn = await pool.getConnection();
    const users = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
    conn.release();
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Tickets routes
app.get('/api/tickets', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const tickets = await conn.query('SELECT * FROM tickets ORDER BY created_at DESC');
    conn.release();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tickets' });
  }
});

app.post('/api/tickets', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO tickets (title, description) VALUES (?, ?)',
      [title, description]
    );
    conn.release();
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating ticket' });
  }
});

app.put('/api/tickets/:id', authenticateToken, async (req, res) => {
  const { title, description, status } = req.body;
  
  try {
    const conn = await pool.getConnection();
    await conn.query(
      'UPDATE tickets SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, req.params.id]
    );
    conn.release();
    res.json({ message: 'Ticket updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating ticket' });
  }
});

app.delete('/api/tickets/:id', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.query('DELETE FROM tickets WHERE id = ?', [req.params.id]);
    conn.release();
    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting ticket' });
  }
});

// Knowledge base routes
app.get('/api/knowledge', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const knowledge = await conn.query('SELECT * FROM knowledge_base ORDER BY created_at DESC');
    conn.release();
    res.json(knowledge);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching knowledge base entries' });
  }
});

app.post('/api/knowledge', authenticateToken, async (req, res) => {
  const { title, solution } = req.body;
  
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO knowledge_base (title, solution) VALUES (?, ?)',
      [title, solution]
    );
    conn.release();
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating knowledge base entry' });
  }
});

app.put('/api/knowledge/:id', authenticateToken, async (req, res) => {
  const { title, solution } = req.body;
  
  try {
    const conn = await pool.getConnection();
    await conn.query(
      'UPDATE knowledge_base SET title = ?, solution = ? WHERE id = ?',
      [title, solution, req.params.id]
    );
    conn.release();
    res.json({ message: 'Knowledge base entry updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating knowledge base entry' });
  }
});

app.delete('/api/knowledge/:id', authenticateToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.query('DELETE FROM knowledge_base WHERE id = ?', [req.params.id]);
    conn.release();
    res.json({ message: 'Knowledge base entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting knowledge base entry' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
