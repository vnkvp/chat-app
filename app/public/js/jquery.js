$(() => {
    var socket = io.connect();
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chat');

    $messageForm.submit((e) => {
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    socket.on('new message', (data)=>{
$chat.append('<div class="well">'+data.msg+'</div>');
    });
});