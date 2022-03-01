module.exports = (sequelize, DataType) => {
  const Event = sequelize.define(
    "Event",
    {
      title: {
        type: DataType.STRING,
        allowNull: false,
      },
      img: {
        type: DataType.STRING,
        allowNull: false,
      },
      date: {
        type: DataType.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataType.TIME,
        allowNull: false,
      },
      location: {
        type: DataType.TEXT,
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
  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };
  return Event;
};
