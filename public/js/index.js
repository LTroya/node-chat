const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    const li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
    const a = $(`<a href="${message.url}" target="_blank">My current location</a>`);
    a.attr('href', message.url);

    const li = $('<li></li>');
    li.text(`${message.from}: `);
    li.append(a);

    $('#messages').append(li);
});

$('#message-form').on('submit', e => {
    e.preventDefault();

    const input = $('[name="message"]');
    socket.emit('createMessage', {
        from: 'Frank',
        text: input.val(),
    }, (data) => {
        console.log('Got it', data);
        input.val('');
    });
});

const locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, () => {
        alert('Unable to fetch location');
    });
});
