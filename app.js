var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8000);

app.get('/socket.js', function (req, res) {
  res.sendfile(__dirname + '/socket.io.js');
});

app.get('/index.html', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function (client) {
  client.on("join", function(name){
    client.set("nickname", name);
  });
  client.on('message', function (data) {
    console.log(data);
    client.get("nickname", function(err, name){
      client.broadcast.emit("message", "[ "+ name + " ] say: " + data);
    });

  });
});


