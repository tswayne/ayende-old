'use strict';
var db = require('./setup');


var provision = function() {
    db.Troops.create({type: 'Soldiers'}).then(function(troops){
        db.Resources.create({type: 'Gold'}).then(function(resources) {

        });
    });
};

module.exports.provision = provision;
