const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).send("Usuário não encontrado");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(401).send("Senha incorreta");

  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/");
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = { login, logout };
