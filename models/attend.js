module.exports = function (sequelize, DataTypes) {
    const Attend = sequelize.define("Attend", {
        attending: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });
    Attend.associate = function(models) {
        Attend.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
        Attend.belongsTo(models.Partay, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Attend;
};
