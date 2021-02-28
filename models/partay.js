module.exports = function (sequelize, DataTypes) {
  const Partay = sequelize.define("Partay", {
    partay_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    partay_summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    partay_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    partay_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    partay_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    partay_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    host_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true
  });
  Partay.associate = (models) => {
    Partay.belongsTo(models.User, {
      foreignKey: { allowNull: false, name: 'host_user_id' }
    });
    Partay.hasMany(models.Attend, {
      foreignKey: { allowNull: false}
    });
  };
  return Partay;
};