const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');
const mustacheExpress= require('mustache-express');
const engine = mustacheExpress();

const app = express();


app.engine('mustache',engine);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname) + '/views');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
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
    const hashedPassword = await (req.body.password, 10);
    await User.create({ username: req.body.username, password: hashedPassword });
    res.send('Usuário cadastrado!');
});

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'chave-secreta', resave: false, saveUninitialized: false }));

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
app.post('/tickets', async (req, res) => {
    if (!req.session.userId) return res.status(401).send('Acesso negado');

    const user = await User.findByPk(req.session.userId);
    if (!user || !user.isAdmin) return res.status(403).send('Apenas admins podem criar ingressos');

    const ticket = await TicketType.create(req.body);
    res.json(ticket);
});




app.get('/', (req, res) => {
    res.render('Sistema de Venda de Ingressos');
});

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
