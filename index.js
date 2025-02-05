const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const sequelize = new Sequelize( {dialect: 'sqlite',
    storage: './database.sqlite'});

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Sistema de Venda de Ingressos');
});

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
