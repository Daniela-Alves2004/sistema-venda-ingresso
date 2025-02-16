// models/ticket.js
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("Ticket", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER
  });

  // Relacionamento de 1:N entre Ticket e Purchase
  Ticket.associate = function(models) {
    Ticket.hasMany(models.Purchase, { foreignKey: 'ticketId' });
  };

  return Ticket;
};
