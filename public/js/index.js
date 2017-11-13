const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    const li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});


$('#message-form').on('submit', e => {
    e.preventDefault();

    const input = $('[name="message"]');
    socket.emit('createMessage', {
        from: 'Frank',
        text: input.val()
    }, (data) => {
        console.log('Got it', data);
        input.val('');
    });
});
