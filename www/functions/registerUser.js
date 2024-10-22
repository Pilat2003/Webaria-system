const bcrypt = require('bcryptjs');
const pool = require('./db');

const registerUser = async (email, password) => {
    if (!email || !password) {
        throw new Error('Proszę podać email i hasło');
    }

    // Szyfrowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    // Zapis do bazy danych
    const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`;
    const result = await pool.query(query, [email, hashedPassword]);

    return result.rows[0].id;
};

module.exports = registerUser;