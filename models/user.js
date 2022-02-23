module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataType.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataType.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Performance, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });

    User.hasMany(models.Event, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    User.hasMany(models.Apply, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    User.hasMany(models.Donate, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
    User.hasMany(models.Audition, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };
  return User;
};
