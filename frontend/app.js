function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userInput })
    })
    .then(response => response.json())
    .then(data => {
        chatLog.innerHTML += `<div><strong>ACS_Bot:</strong> ${data.response}</div>`;
        document.getElementById('user-input').value = '';
        chatLog.scrollTop = chatLog.scrollHeight;
    })
    .catch(error => console.error('Error:', error));
}
