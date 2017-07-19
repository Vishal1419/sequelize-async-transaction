/**
 * Created by ravimodha on 20/08/16.
 */

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var sequelize = new Sequelize('vishal_test_db', 'vishal', '12345678', {
    host: "192.168.100.204", //on this ip our database server is available
    port: 3306, //I don't know but it does not work on other ports
    dialect: 'mysql' //we should pass the database that we are using in dialect
});

var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
  });

// Object.keys(db).forEach(function(modelName) {
//     if ("associate" in db[modelName]) {
//         db[modelName].associate(db);
//     }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;