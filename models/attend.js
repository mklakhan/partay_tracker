module.exports = function (sequelize, DataTypes) {
    const Attend = sequelize.define("Attend", {
        attending: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        underscored: true
    });
    Attend.associate = function(models) {
        Attend.belongsTo(models.User, {
            foreignKey: { allowNull: false, name: "user_id" }
        });
        Attend.belongsTo(models.Partay, {
            foreignKey: { allowNull: false, name: "partay_id" }
        });
    };
    return Attend;
};
