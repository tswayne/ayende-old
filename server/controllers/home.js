var accountForm = require('../config/forms/account-form');

var index = {
  handler:  function(request, reply)
  {
    reply.view('home/index', {form: accountForm.toHTML()});
  }
};

module.exports.index = index;