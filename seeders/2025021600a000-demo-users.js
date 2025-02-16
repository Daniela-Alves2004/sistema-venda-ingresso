"use strict";
// seeders/20250216000101-demo-user.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Users", // Nome da tabela Users
            [
              {
                email: "admin@admin.com",
                password: "$2b$10$sP.oMSDw.51TgaCyGCWULe962NRyUOuMMwqC9VGdIbii3X4O1rOfa", // O bcrypt será usado na autenticação, se necessário
                isAdmin: true, // Este usuário será administrador
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                email: "user@user.com",
                password: "$2b$10$sP.oMSDw.51TgaCyGCWULeJ.OfV8rcKntx/t0GO5vh7M0S7k5m/nO", // O bcrypt será usado na autenticação, se necessário
                isAdmin: false, // Usuário normal
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            {}
          );
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("Users", null, {});
    },
  };