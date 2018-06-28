var socket = io();
var n;
function name(){
    n = prompt('Enter your name', n);
    socket.emit('change_username', {username: n});
}
$(function () {
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.emit('change_username', {username: n});
    socket.on('chat message', function(data){
        var msg = data.msg;
        var user = data.username;
        $('#messages').append($('<li>').text(user+': '+msg));
    });
    $('#m').bind("keypress", function(){
        socket.emit('typing');
    });
    socket.on('typing', function(data){
        $('#type').html("<p><i>" + data.username + " is typing a message..." + "</i><p>");
    });
});