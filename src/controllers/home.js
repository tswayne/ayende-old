var index = {
  handler:  function(request, reply)
  {
    reply.view('home/index');
  }
};

module.exports.index = index;