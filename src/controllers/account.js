var accountForm = require('../lib/forms/account-form');
var db = require('../lib/database/mysqlDatabase');

var login = {
    handler:  function(request, reply)
    {
        accountForm.handle(request.payload, {
            success: function (form) {
                db.User.findOne({username: request.payload.username}).then(function(user) {
                    if (user && request.payload.password == user.password) {
                        request.auth.session.set(user);
                        reply.redirect('/headquarters');
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
                db.User.create(request.payload).then(function(user){
                    request.auth.session.set(request.payload);
                    reply.redirect('/headquarters');
                })
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