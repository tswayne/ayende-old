var login = {
    handler:  function(request, reply)
    {
        reply.view('account/index');
    }
};

var create = {
  handler: function(request, reply)
  {
      var form = require('../lib/forms/account-form').toHTML();
      reply.view("account/create", {form: form});
  }
};

var save ={
    handler: function(request, reply)
    {
        reply.redirect('/');
    }
};

module.exports.login = login;
module.exports.create = create;
module.exports.save = save;