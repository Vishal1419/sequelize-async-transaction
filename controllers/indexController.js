var async = require('async');
var models = require('../models');

module.exports = {

    saveNewUserAndNewLanguage: function(req, res) {

        models.sequelize.transaction({autocommit: false}).then(function(t){

            var saveNewUser = function(parallelCallback) {

                console.log("..........");

                var fullname_new = req.body.lastName + " " + req.body.firstName;

                models.users.findAll({}).then(function(users) {

                    var userAlreadyExists = false;
                    users.forEach(function(user) {
                        var fullname = user.LastName + " " + user.FirstName;
                        if(fullname === fullname_new) {
                            //user already exists.
                            userAlreadyExists = true;
                            parallelCallback({error: "Duplicate Result in User"})
                        }
                    }, this);

                    if(!userAlreadyExists) {

                        var newUser = {
                            LastName: req.body.lastName,
                            FirstName: req.body.firstName
                        };

                        models.users.create(newUser, {transaction: t})
                            .then(function (result) {
                                parallelCallback(null, result);
                            })
                            .catch(function (err) {
                                parallelCallback(err);
                            });

                    }

                });

            };

            var saveNewLanguage = function(parallelCallback) {

                models.languages.findAll({}).then(function(languages) {

                    var languageAlreadyExists = false;
                    languages.forEach(function(language) {
                        if(language.Name === req.body.languageName) {
                            //language already exists.
                            languageAlreadyExists = true;
                            parallelCallback({error: "Duplicate Result in Language"})
                        }
                    }, this);

                    if(!languageAlreadyExists) {

                        var newLanguage = {
                            Name: req.body.languageName
                        };

                        models.languages.create(newLanguage, {transaction: t})
                            .then(function (result) {
                                parallelCallback(null, result);
                            })
                            .catch(function (err) {
                                parallelCallback(err);
                            });

                    }

                });

            };

            async.parallel({
                user: saveNewUser,
                language: saveNewLanguage
            }, function(err, results) {
                if(err) {
                    t.rollback();
                    res.send(err);
                }
                else {
                    t.commit();
                    res.send(results);
                }
            });

        });
    }
};