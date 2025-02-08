const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');
const mustacheExpress= require('mustache-express');
const engine = mustacheExpress();
const ticketsRouter = require('./routes/tickets');
const path = require('path');


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

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const TicketType = sequelize.define('TicketType', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
});

const Purchase = sequelize.define('Purchase', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    ticketTypeId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
});

app.post('/register', async (req, res) => {
    await User.create({ username: req.body.username, password: req.body.password });
    res.send('Usuário cadastrado!');
});


app.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && req.body.password === user.password) {
        req.session.userId = user.id;
        res.send('Login realizado com sucesso!');
    } else {
        res.status(401).send('Credenciais inválidas');
    }
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.use('/tickets', ticketsRouter);


app.get('/', (req, res) => {
    res.send('Sistema de Venda de Ingressos');
});

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});


