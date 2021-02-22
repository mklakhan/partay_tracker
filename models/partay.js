module.exports = function(sequelize, DataTypes) {
  const Partay = sequelize.define("Partay", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    host_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Partay;
};
