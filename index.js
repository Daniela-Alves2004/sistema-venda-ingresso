const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');
const mustacheExpress= require('mustache-express');
const engine = mustacheExpress();
const ticketsRouter = require('./routes/tickets');
const path = require('path');
const { sequelize } = require('./models');
const usersRouter = require('./routes/users');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'chave-secreta', resave: false, saveUninitialized: false }));

app.engine('mustache',engine);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname) + '/views');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);


app.get('/', (req, res) => {
    res.send('Sistema de Venda de Ingressos');
});

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});


