var index = {
  auth: 'session',
  handler:  function(request, reply)
  {
    reply.view('headquarters/index');
  }
};

module.exports.index = index;