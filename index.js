var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = 0;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('static'));


app.get('/', function(req, res){
 	res.render('chat');
});

io.on('connection', function(socket){
	users += 1;
  	console.log('a user connected');
  	console.log(users+" are online");
 	socket.on('disconnect', function(){
    	users -=1;
    	console.log('user disconnected');
    	console.log(users+" are online");
  	});

 	var username = "";
	socket.on('change_username', function(data){
    	username = data.username;
	})

  	socket.on('chat message', function(msg){
    	io.emit('chat message', {msg: msg, username: username});
  	});

  	socket.on('typing', function(data){
    	socket.broadcast.emit('typing', {username : username});
    });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});