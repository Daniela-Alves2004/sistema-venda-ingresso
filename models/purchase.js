// models/purchase.js
module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define("Purchase", {
    userId: DataTypes.INTEGER,
    ticketId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  });

  // Relacionamentos de N:1 entre Purchase e Ticket e Purchase e User
  Purchase.associate = function(models) {
    Purchase.belongsTo(models.User, { foreignKey: 'userId' });
    Purchase.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
  };

  return Purchase;
};
