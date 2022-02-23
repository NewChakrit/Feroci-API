"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("auditions", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      detail: {
        allowNull: false,
        type: Sequelize.TEXT,
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
      // created_at: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      // },
      // updated_at: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      // },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("auditions");
  },
};
