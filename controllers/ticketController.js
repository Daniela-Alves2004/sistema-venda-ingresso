const { Ticket } = require("../models");

const createTicket = async (req, res) => {
  const { name, price, quantity } = req.body;
  const ticket = await Ticket.create({ name, price, quantity });
  res.status(201).json(ticket);
};

const getTickets = async (req, res) => {
  const tickets = await Ticket.findAll();
  res.render("home", { tickets, isAuthenticated: !!req.user });
};

module.exports = { createTicket, getTickets };
