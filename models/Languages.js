
module.exports = function(sequelize, DataTypes) {

    const Languages = sequelize.define('languages', {
        ID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        Name: {type: DataTypes.STRING, allowNull: false}
    }, { tableName: 'Languages', timestamps: false });

    return Languages;

};