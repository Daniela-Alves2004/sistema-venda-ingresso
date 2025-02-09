const express = require('express');
const router = express.Router();
const { Users } = require('../models');

router.post('/register', async (req, res) => {
    await Users.create({ username: req.body.username, password: req.body.password });
    res.send('Usuário cadastrado!');
});

router.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ where: { username: req.body.username } });
        if (!user) {
            console.log('Usuário não encontrado');
        } else {
            console.log('Usuário encontrado:', user);
        }
        
        if (user && req.body.password === user.password) {
            req.session.userId = user.id;
            res.send('Login realizado com sucesso!');
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).send('Erro no servidor');
    }
});


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;
