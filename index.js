require("dotenv").config();
const express = require("express");
const mustacheExpress = require("mustache-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models");
const router = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuração do Mustache
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// Rotas
app.use("/", router);

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
