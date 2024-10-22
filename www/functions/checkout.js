const pool = require('./db');

const checkout = async (userId, packageId) => {
    if (!userId || !packageId) {
        throw new Error('Proszę podać identyfikator użytkownika i pakietu');
    }

    // Logika realizacji checkoutu (przykład)
    const query = `INSERT INTO purchases (user_id, package_id) VALUES ($1, $2) RETURNING id`;
    const result = await pool.query(query, [userId, packageId]);

    return result.rows[0].id;
};

module.exports = checkout;