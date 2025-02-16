// seeders/20250216000100-demo-ticket.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("Tickets", [
        {
          name: "Concerto de Rock",
          price: 150.00,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Peça de Teatro",
          price: 50.00,
          quantity: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Filme em 3D",
          price: 30.00,
          quantity: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("Tickets", null, {});
    },
  };
  