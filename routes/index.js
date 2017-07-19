var utility = require('../utility');
var validationSchema = require('../validation/validation_schema');
var indexController = require('../controllers/indexController');

module.exports = function (server) {

    server.post('/', utility.validateRequest(validationSchema.user), function(req, res){
        indexController.saveNewUserAndNewLanguage(req, res);
    });

    return this;

};