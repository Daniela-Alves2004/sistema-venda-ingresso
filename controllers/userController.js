const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Cadastro de novo usuário
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar se o email já está em uso
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'E-mail já está em uso.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário.', error });
  }
};

// Login de usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verifica se o usuário existe
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  // Verifica a senha
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  // Gerar token JWT
  const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login bem-sucedido', token });
};

// Atualização de dados do usuário (caso deseje permitir atualização)
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  // Verifica se o usuário existe
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  // Atualizar dados do usuário
  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();
  res.status(200).json({ message: 'Usuário atualizado com sucesso.', user });
};

module.exports = { register, login, updateUser };
