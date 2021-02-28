module.exports = function (sequelize, DataTypes) {
    const Item = sequelize.define("Item", {
        bring: {
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
    return Item;
};