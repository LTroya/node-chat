const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'address@gmail.com',
        text: 'Hey, this is Luis Troya'
    });

    socket.emit('createMessage', {
        from: 'Luis Troya',
        text: 'Hello World!'
    })
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    console.log('New message', message);
});
