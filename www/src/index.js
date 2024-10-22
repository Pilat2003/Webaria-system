const express = require('express');
const path = require('path');
const registerUser = require('../functions/registerUser');
const loginUser = require('../functions/loginUser');
const redeemGiftCode = require('../functions/redeemGiftCode');
const checkout = require('../functions/checkout');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userId = await registerUser(email, password);
        res.status(201).json({ message: 'Rejestracja udana', userId });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userId = await loginUser(email, password);
        res.status(200).json({ message: 'Logowanie udane', userId });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

app.post('/redeem', async (req, res) => {
    const { userId, code } = req.body;

    try {
        const promo = await redeemGiftCode(userId, code);
        res.status(200).json({ message: 'Kod promocyjny zrealizowany', promo });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

app.post('/checkout', async (req, res) => {
    const { userId, packageId } = req.body;

    try {
        const purchaseId = await checkout(userId, packageId);
        res.status(200).json({ message: 'Zakup udany', purchaseId });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// Serwer nasłuchuje na porcie 3000
app.listen(process.env.PORT, () => {
    console.log(`Serwer działa na porcie ${process.env.PORT}`);
});