module.exports = (sequelize, DataType) => {
  const Donate = sequelize.define(
    "Donate",
    {
      amount: {
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  Donate.associate = (models) => {
    Donate.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };
  return Donate;
};
