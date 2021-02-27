module.exports = function(sequelize, DataTypes) {
  const Attend = sequelize.define("Invite", {
    attending: {
      type: DataTypes.BOOLEAN,
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
  return Attend;
};
