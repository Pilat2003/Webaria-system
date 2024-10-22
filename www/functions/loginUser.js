const bcrypt = require('bcryptjs');
const pool = require('./db');

const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error('Proszę podać email i hasło');
    }

    // Sprawdzenie użytkownika w bazie danych
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
        throw new Error('Nieprawidłowy email lub hasło');
    }

    const user = result.rows[0];

    // Porównanie hasła
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Nieprawidłowy email lub hasło');
    }

    return user.id;
};

module.exports = loginUser;