const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  User.associate = function(models) {
    User.hasMany(models.Purchase, { foreignKey: 'userId' });
  };

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};
