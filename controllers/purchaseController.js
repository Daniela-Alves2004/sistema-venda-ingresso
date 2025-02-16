// purchaseController.js
const { Purchase, Ticket } = require("../models");

const getPurchaseHistory = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { userId: req.user.id },
      include: [Ticket],
    });

    const purchaseData = purchases.map((purchase) => ({
      ticketName: purchase.ticket.name,
      quantity: purchase.quantity,
      totalPrice: (purchase.quantity * purchase.ticket.price).toFixed(2),
    }));

    res.render("purchases", { purchases: purchaseData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar histórico de compras.");
  }
};

// Adicionar método de compra
const createPurchase = async (req, res) => {
  const { ticketId, quantity } = req.body;

  try {
    // Buscar o ingresso
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ingresso não encontrado." });
    }

    // Verificar se a quantidade solicitada é maior do que a disponível
    if (ticket.quantity < quantity) {
      return res.status(400).json({ message: "Quantidade de ingressos indisponível." });
    }

    // Criar a compra
    const purchase = await Purchase.create({
      userId: req.user.id, // Usuário logado
      ticketId,
      quantity,
    });

    // Atualizar a quantidade de ingressos disponíveis
    ticket.quantity -= quantity;
    await ticket.save();

    // Redirecionar para o histórico de compras ou enviar uma resposta de sucesso
    res.redirect("/purchases");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao realizar a compra.");
  }
};

module.exports = { getPurchaseHistory, createPurchase };
