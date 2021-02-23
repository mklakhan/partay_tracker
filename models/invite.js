module.exports = function(sequelize, DataTypes) {
  const Invite = sequelize.define("Invite", {
    attending: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    response: {
      type: DataTypes.STRING,
      allowNull: true
    },
    partay_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Invite;
};
