module.exports = (sequelize, DataType) => {
  const Apply = sequelize.define("Apply", {});
  Apply.associate = (models) => {
    Apply.belongsTo(
      models.User,
      {
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
      },
      {
        underscored: true,
      }
    );
    Apply.belongsTo(
      models.Audition,
      {
        foreignKey: {
          name: "audition_id",
          allowNull: false,
        },
      },
      { underscored: true, timestamps: false }
    );
  };
  return Apply;
};
