// seeders/20250216000200-demo-purchase.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tickets = await queryInterface.sequelize.query(
      `SELECT id FROM Tickets;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const user = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email = 'admin@admin.com';`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const userId = user[0].id;

    await queryInterface.bulkInsert("Purchases", [
      {
        userId: userId,
        ticketId: tickets[0].id, // ID do Ticket "Concerto de Rock"
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userId,
        ticketId: tickets[1].id, // ID do Ticket "Peça de Teatro"
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userId,
        ticketId: tickets[2].id, // ID do Ticket "Filme em 3D"
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Purchases", null, {});
  },
};
