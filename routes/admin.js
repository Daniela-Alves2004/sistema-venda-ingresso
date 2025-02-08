const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/create-admin', async (req, res) => {
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    if (existingAdmin) {
        return res.send('Usuário administrador já existe');
    }

    const admin = await User.create({
        username: 'admin',
        password: 'admin123',
        isAdmin: true
    });

    res.send('Usuário administrador criado: admin/admin123');
});

module.exports = router;
