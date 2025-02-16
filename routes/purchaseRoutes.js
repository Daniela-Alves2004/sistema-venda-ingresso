// purchaseRoutes.js
const express = require("express");
const { getPurchaseHistory, createPurchase } = require("../controllers/purchaseController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rota para visualizar o histórico de compras
router.get("/", authMiddleware, getPurchaseHistory);

// Rota para criar uma compra
router.post("/", authMiddleware, createPurchase);

module.exports = router;
