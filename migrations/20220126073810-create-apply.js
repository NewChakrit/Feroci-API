"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "applys",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          reference: {
            model: {
              tableName: "users",
            },
            key: "id",
          },
        },
        audition_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          reference: {
            model: {
              tableName: "auditions",
            },
            key: "id",
          },
        },
      },
      { timestamps: false }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("applys");
  },
};
