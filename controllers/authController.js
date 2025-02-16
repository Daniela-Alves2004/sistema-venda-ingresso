const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || password !== user.password) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token);
  return res.status(200).json({ message: 'Login bem-sucedido', token });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout realizado com sucesso.' });
};

module.exports = { login, logout };
