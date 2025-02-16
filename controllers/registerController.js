const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
    const {email, password } = req.body;
    console.log("Recebendo dados:", {email, password });

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log("E-mail já está em uso.");
            return res.status(400).json({ message: "E-mail já está em uso." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        console.log("Usuário criado:", user);
        res.status(201).json({ message: "Usuário criado com sucesso!", user });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: "Erro ao criar usuário.", error });
    }
};
module.exports = { register };