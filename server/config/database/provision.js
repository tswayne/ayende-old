'use strict';
var db = require('./setup');


var provision = function() {
    db.Troops.create({type: 0}).then(function(troops){
        db.Resources.create({type: 0}).then(function(resources) {

        });
    });
};

module.exports.provision = provision;