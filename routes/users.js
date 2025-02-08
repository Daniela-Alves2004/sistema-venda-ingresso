const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/register', async (req, res) => {
    await User.create({ username: req.body.username, password: req.body.password });
    res.send('Usuário cadastrado!');
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && req.body.password === user.password) {
        req.session.userId = user.id;
        res.send('Login realizado com sucesso!');
    } else {
        res.status(401).send('Credenciais inválidas');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;
