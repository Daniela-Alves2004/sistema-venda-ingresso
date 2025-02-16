const express = require("express");
const { Ticket, Purchase, User } = require("../models");
const authMiddleware = require("../middlewares/authMiddleware");
const { login } = require("../controllers/loginController"); // Controlador de login
const { register } = require("../controllers/registerController"); // Controlador de registro
const router = express.Router();

// Página inicial (listagem de ingressos)
router.get("/", authMiddleware,  async (req, res) => {
    const tickets = await Ticket.findAll();
    // Passamos o isAuthenticated aqui
    const isAuthenticated = req.user ? true : false;
    res.render("home", { tickets, isAuthenticated, user: req.user });
});

// Página de login
router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

// Processo de login
router.post("/login", login); // Redireciona para o controlador de login

router.get("/register", (req, res) => {
    res.render("register"); // Certifique-se de ter um arquivo "register.mustache" na pasta views
});


router.post("/register", register);


// Histórico de compras
router.get("/purchases", authMiddleware, async (req, res) => {
    try {
        const purchases = await Purchase.findAll({
            where: { userId: req.user.id }, // Apenas compras do usuário autenticado
            include: [
                {
                    model: Ticket, // Não use alias, apenas o modelo Ticket
                    attributes: ["name", "price"], // Definindo os atributos a serem incluídos
                },
            ],
        });

        // Organizando os dados de cada compra
        const purchaseData = purchases.map((purchase) => ({
            ticketName: purchase.Ticket.name, // Acessando Ticket diretamente, sem alias
            quantity: purchase.quantity,
            totalPrice: (purchase.quantity * purchase.Ticket.price).toFixed(2),
        }));

        // Renderizando a página de compras
        res.render("purchases", { purchases: purchaseData });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao carregar histórico de compras");
    }
});

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = router;
