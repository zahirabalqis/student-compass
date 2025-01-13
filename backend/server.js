const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "your_jwt_secret_key"; // Replace with a secure secret key

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234", // Replace with your MySQL password
    database: "my_final_db",
    port: 3307, // Replace with your MySQL port
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Database connected successfully.");
});

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ error: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Middleware for Admin Authentication
const isAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ error: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err || !decoded.isAdmin) {
            return res.status(403).json({ error: 'Forbidden: Admin access only.' });
        }
        next();
    });
};

// Admin Registration
app.post('/api/admin/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error.' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Admin username already exists.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, hashedPassword, 'admin'],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error.' });
                    }
                    res.status(201).json({ message: 'Admin registered successfully.' });
                }
            );
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error.' });

        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials.' });

        const admin = results[0];
        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Error verifying password.' });

            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

            const token = jwt.sign({ id: admin.id, username: admin.username, isAdmin: true }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful!', token });
        });
    });
});

// CRUD for Buildings
app.route('/api/buildings')
    .get((req, res) => {
        db.query('SELECT * FROM buildings', (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(200).json(results);
        });
    })
    .post(isAdmin, (req, res) => {
        const { name, longitude, latitude } = req.body;
        db.query('INSERT INTO buildings (name, longitude, latitude) VALUES (?, ?, ?)', [name, longitude, latitude], (err) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(200).json({ message: 'Building added successfully.' });
        });
    });

app.route('/api/buildings/:id')
    .put(isAdmin, (req, res) => {
        const { id } = req.params;
        const { name, longitude, latitude } = req.body;
        db.query('UPDATE buildings SET name = ?, longitude = ?, latitude = ? WHERE id = ?', [name, longitude, latitude, id], (err) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(200).json({ message: 'Building updated successfully.' });
        });
    })
    .delete(isAdmin, (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM buildings WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(200).json({ message: 'Building deleted successfully.' });
        });
    });

// CRUD for Contacts
app.route('/api/contacts')
    .get((req, res) => {
        db.query('SELECT * FROM contacts', (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(200).json(results);
        });
    })
    .post(isAdmin, (req, res) => {
        const { name, email, phone} = req.body;
        db.query('INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(200).json({ message: 'Contact added successfully.' });
        });
    });

app.route('/api/contacts/:id')
    .put(isAdmin, (req, res) => {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        db.query('UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id], (err) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(200).json({ message: 'Contact updated successfully.' });
        });
    })
    .delete(isAdmin, (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM contacts WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            res.status(200).json({ message: 'Contact deleted successfully.' });
        });
    });

// Rooms: Fetch Rooms by Building ID
app.get('/api/rooms/:buildingId', (req, res) => {
    const { buildingId } = req.params;
    db.query('SELECT * FROM rooms WHERE building_id = ?', [buildingId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.status(200).json(results);
    });
});
// Feedback Submission (No Login Required)
app.post('/api/feedback', (req, res) => {
    const { feedback } = req.body;

    if (!feedback) {
        return res.status(400).json({ error: 'Feedback is required.' });
    }

    const query = 'INSERT INTO feedback (feedback) VALUES (?)';
    db.query(query, [feedback], (err) => {
        if (err) {
            console.error('Error inserting feedback:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        res.status(200).json({ message: 'Feedback submitted successfully.' });
    });
});


// Default Route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the API Server');
});

// Start Server
app.listen(5003, () => {
    console.log("Server running at http://localhost:5003");
});
