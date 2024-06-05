$(document).ready(function() {
    $('#user-input').keypress(function(event) {
        if (event.keyCode === 13) {
            sendMessage();
        }
    });

    $('#darkModeToggle').change(function() {
        if ($(this).is(':checked')) {
            $('body').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode');
        }
    });
});

function sendMessage() {
    const userInput = $('#user-input').val();
    if (userInput.trim() === '') return;

    const chatLog = $('#chat-log');
    chatLog.append(`<div><strong>You:</strong> ${userInput}</div>`);
    $('#user-input').val('');

    const thinkingIndicator = $('<div class="thinking"><img src="3dots.gif" alt="Thinking..."></div>');
    chatLog.append(thinkingIndicator);
    chatLog.scrollTop(chatLog.prop("scrollHeight"));

    setTimeout(() => {
        fetch('http://127.0.0.1:5000/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: userInput })
        })
        .then(response => response.json())
        .then(data => {
            thinkingIndicator.remove();
            chatLog.append(`<div><strong>Bot:</strong> ${data.response}</div>`);
            chatLog.scrollTop(chatLog.prop("scrollHeight"));
        })
        .catch(error => console.error('Error:', error));
    }, 2000); // Simulate thinking time
}
