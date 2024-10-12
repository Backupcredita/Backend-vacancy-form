const express = require('express');
const { Pool } = require('pg'); // Import pg for PostgreSQL
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PostgreSQL Connection
const pool = new Pool({
    host: 'dpg-cs53vh23esus73aorsf0-a',         // Replace with your PostgreSQL host
    user: 'vacancy_db_jwn3_user',     // Replace with your PostgreSQL username
    password: 'L0pbn9TKeNBX8ZxGT4bNjRrRJpDxgTMy',  // Replace with your PostgreSQL password
    database: 'vacancy_db',    // Your database name
    port: 5432,                 // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false // Required for secure connections on Render
    }
});

// Check PostgreSQL Connection
pool.connect(err => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err);
        process.exit(1); // Exit if connection fails
    } else {
        console.log('Connected to PostgreSQL successfully!');
    }
});

// Handle POST request from form submission
app.post('/apply', async (req, res) => {
    const { name, email, phone, location, qualification, salary, employed, employer, years } = req.body;

    const query = `
        INSERT INTO vacancies (name, email, phone, location, qualification, salary, employed, employer, years)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    try {
        await pool.query(query, [name, email, phone, location, qualification, salary, employed, employer, years]);
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (err) {
        console.error('Error inserting data: ', err);
        res.status(500).json({ message: 'Error inserting data' });
    }
});

// Start the server
const PORT = process.env.PORT || 5432; // Use environment variable for port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${5432}`);
});
