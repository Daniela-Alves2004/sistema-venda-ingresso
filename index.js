const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const path = require('path');
const { sequelize, User } = require('./models');
const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');
const adminRouter = require('./routes/admin');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'chave-secreta', resave: false, saveUninitialized: false }));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);
app.use('/admin', adminRouter);

// Criação manual de um usuário administrador
(async () => {
    const adminUser = await User.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
        await User.create({ 
            username: 'admin', 
            password: 'admin123', 
            isAdmin: true 
        });
        console.log('Usuário administrador criado: admin/admin123');
    }
})();

app.get('/', (req, res) => {
    res.send('Sistema de Venda de Ingressos');
});

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
