'use strict';
var troopForm = require('../config/forms/troop-form').purchaseTroops;

module.exports.purchaseTroops = {
  auth: 'session',
  handler: function(request, reply) {
    troopForm.handle(request.payload, {
      success: function (form) {
        service.initializeAccount(request.payload, function(user){
          request.auth.session.set(request.payload);
          request.session.set('user', {id: user.id});
          reply.redirect('/headquarters');
        });
      },
      error: function (form) {
        reply.view("account/create", {form: form.toHTML()})
      },
      empty: function (form) {
        reply.view("account/create", {form: form.toHTML()})
      }
    });
  }
};

