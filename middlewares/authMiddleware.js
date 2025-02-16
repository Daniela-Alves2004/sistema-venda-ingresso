const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    // Se não houver token, redireciona para a página de login
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);  // Log para verificar o conteúdo do token

    req.user = await User.findByPk(decoded.id);  // Usar 'id' para buscar o usuário

    if (!req.user) {
      console.log("Usuário não encontrado com o ID:", decoded.id);
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Se o usuário for encontrado, prossiga para a próxima função (a rota)
    next();
  } catch (error) {
    console.error(error);  // Exibir o erro completo no console
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado.' });
    }
    // Se o token for inválido ou ocorrer qualquer outro erro, redireciona para o login
    return res.redirect('/login');
  }
};

module.exports = authMiddleware;
