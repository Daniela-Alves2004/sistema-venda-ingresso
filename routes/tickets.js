const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    if (!req.session.userId) return res.status(401).send('Acesso negado');

    const user = await User.findByPk(req.session.userId);
    if (!user || !user.isAdmin) return res.status(403).send('Apenas admins podem criar ingressos');

    const ticket = await TicketType.create(req.body);
    res.json(ticket);
});

router.get('/', async (req, res) => {
    const tickets = await TicketType.findAll();
    res.json(tickets);
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

    const user = await User.findByPk(req.session.userId);
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

    const user = await User.findByPk(req.session.userId);
    if (!user || !user.isAdmin) return res.status(403).send('Apenas admins podem deletar ingressos');

    const ticket = await TicketType.findByPk(req.params.id);
    if (ticket) {
        await ticket.destroy();
        res.send('Ingresso deletado');
    } else {
        res.status(404).send('Ingresso não encontrado');
    }
});

module.exports = router;
