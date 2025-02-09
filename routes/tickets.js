const express = require('express');
const router = express.Router();
const { TicketType, Users, Purchase } = require('../models');

router.post('/', async (req, res) => {
    if (!req.session.userId) return res.status(401).send('Acesso negado');

    const user = await Users.findByPk(req.session.userId);
    if (!user || !user.isAdmin) return res.status(403).send('Apenas admins podem criar ingressos');

    const ticket = await TicketType.create(req.body);
    res.json(ticket);
});

router.get('/', async (req, res) => {
    const tickets = await TicketType.findAll();
    res.render('tickets', { tickets });
});

router.get('/:id', async (req, res) => {
    const ticket = await TicketType.findByPk(req.params.id);
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).send('Ingresso não encontrado');
    }
});

router.put('/:id', async (req, res) => {
    if (!req.session.userId) return res.status(401).send('Acesso negado');

    const user = await Users.findByPk(req.session.userId);
    if (!user || !user.isAdmin) return res.status(403).send('Apenas admins podem editar ingressos');

    const ticket = await TicketType.findByPk(req.params.id);
    if (ticket) {
        await ticket.update(req.body);
        res.json(ticket);
    } else {
        res.status(404).send('Ingresso não encontrado');
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.session.userId) return res.status(401).send('Acesso negado');

    const user = await Users.findByPk(req.session.userId);
    if (!user || !user.isAdmin) return res.status(403).send('Apenas admins podem deletar ingressos');

    const ticket = await TicketType.findByPk(req.params.id);
    if (ticket) {
        await ticket.destroy();
        res.send('Ingresso deletado');
    } else {
        res.status(404).send('Ingresso não encontrado');
    }
});

router.post('/:id/purchase', async (req, res) => {
    if (!req.session.userId) return res.status(401).send('Acesso negado');

    const user = await Users.findByPk(req.session.userId);
    const ticket = await TicketType.findByPk(req.params.id);
    const quantity = req.body.quantity;

    if (ticket.quantity < quantity) {
        return res.status(400).send('Quantidade solicitada excede o estoque disponível');
    }

    await Purchase.create({
        userId: user.id,
        ticketTypeId: ticket.id,
        quantity: quantity
    });

    ticket.quantity -= quantity;
    await ticket.save();

    res.send('Compra realizada com sucesso');
});

router.get('/purchases', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Acesso negado');
    }
    const user = await User.findByPk(req.session.userId);

    if (!user) {
        return res.status(401).send('Acesso negado');
    }
    const purchases = await Purchase.findAll({
        where: { userId: req.session.userId },
        include: [TicketType]
    });
    res.render('purchases', { purchases });
});


module.exports = router;
