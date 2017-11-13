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

    const messageTextBox = $('[name="message"]');

    socket.emit('createMessage', {
        from: 'Frank',
        text: messageTextBox.val(),
    }, (data) => {
        messageTextBox.val('');
    });
});

const locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, () => {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});
