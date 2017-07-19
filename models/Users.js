
module.exports = function(sequelize, DataTypes) {

    //first parameter will define the table name in singular if table name is not explicitly defined in third parameter's property
    //timestamps is set to false so that addedOn and updatedOn values are not automatically passed to the database when using CRUD operations
    const Users = sequelize.define('users', {
        ID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        LastName: {type: DataTypes.STRING, allowNull: false},
        FirstName: {type: DataTypes.STRING}
    }, { tableName: 'Users', timestamps: false });

    return Users;

};