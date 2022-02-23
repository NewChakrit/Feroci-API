module.exports = (sequelize, DataType) => {
  const Performance = sequelize.define(
    "Performance",
    {
      title: {
        type: DataType.STRING,
        allowNull: false,
      },
      img: {
        type: DataType.STRING,
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
  Performance.associate = (models) => {
    Performance.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };
  return Performance;
};
