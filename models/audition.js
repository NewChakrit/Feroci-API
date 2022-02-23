module.exports = (sequelize, DataType) => {
  const Audition = sequelize.define(
    "Audition",
    {
      title: {
        type: DataType.STRING,
        allowNull: false,
      },
      detail: {
        type: DataType.TEXT,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  Audition.associate = (models) => {
    Audition.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    Audition.hasMany(models.Apply, {
      foreignKey: {
        name: "audition_id",
        allowNull: false,
      },
    });
  };
  return Audition;
};
