"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "donate",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        donate_amount: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          reference: {
            model: {
              tableName: "users",
            },
            key: "id",
          },
        },
      },
      { timestamps: false }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("donate");
  },
};
