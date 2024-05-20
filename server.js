const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'my_sql_db@18',
    database: 'REGISTRATION'
});

const executeQuery = async (sql, values) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [results] = await connection.query(sql, values);
        connection.release();
        return results;
    } catch (error) {
        if (connection) connection.release();
        throw new Error(`Error executing query: ${error.message}`);
    }
};

app.get('/getusers', async (req, res) => {
    try {
        const sql = 'SELECT * FROM data';
        const data = await executeQuery(sql);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/postusers', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const sql = 'INSERT INTO data (name, email, password) VALUES (?, ?, ?)';
        const values = [username, email, password];
        await executeQuery(sql, values);
        res.status(200).json({ message: 'Successfully registered!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
