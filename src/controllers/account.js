var accountForm = require('../lib/forms/account-form');
var service = require('../lib/service/account');

var login = {
    handler:  function(request, reply)
    {
        accountForm.handle(request.payload, {
            success: function (form) {
                service.validate(request.payload, function(isValid) {
                   if (isValid) {
                       request.auth.session.set(request.payload);
                       reply.redirect('/headquarters')
                   } else {
                       reply.redirect('/');
                   }
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

var logout = {
    handler:  function(request, reply)
    {
        request.auth.session.clear();
        return reply.redirect('/');
    }
};

var create = {
  handler: function(request, reply)
  {
      reply.view("account/create", {form: accountForm.toHTML()});
  }
};

var save ={
    handler: function(request, reply)
    {
        accountForm.handle(request.payload, {
            success: function (form) {
                service.initializeAccount(request.payload, function(){
                  request.auth.session.set(request.payload);
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

module.exports.login = login;
module.exports.create = create;
module.exports.save = save;
module.exports.logout = logout;