const pool = require('./db');

const redeemGiftCode = async (userId, code) => {
    if (!userId || !code) {
        throw new Error('Proszę podać identyfikator użytkownika i kod');
    }

    // Logika realizacji kodu promocyjnego
    const query = `SELECT * FROM promo_codes WHERE code = $1 AND is_used = false`;
    const result = await pool.query(query, [code]);

    if (result.rows.length === 0) {
        throw new Error('Kod promocyjny jest nieprawidłowy lub już został użyty');
    }

    // Oznaczanie kodu jako użyty
    const promoCode = result.rows[0];
    await pool.query(`UPDATE promo_codes SET is_used = true WHERE id = $1`, [promoCode.id]);

    return promoCode;
};

module.exports = redeemGiftCode;