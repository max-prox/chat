const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const emojiBtn = document.getElementById('emoji-btn');
const shareBtn = document.getElementById('share-btn');

// Connect to the Socket.IO server
const socket = io('https://chat-xb5n.onrender.com');

// Initialize Emoji Button
const picker = new EmojiButton();
picker.on('emoji', emoji => {
    messageInput.value += emoji;
});

emojiBtn.addEventListener('click', () => {
    picker.togglePicker(emojiBtn);
});

// Send message to the server
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
});

// Receive messages from the server
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Share chat history (optional)
shareBtn.addEventListener('click', async () => {
    const chatText = Array.from(chatBox.children).map(el => el.textContent).join('\n');
    const BOT_TOKEN = '7028890340:AAFlpPYM-lCK2199W78hmX1CKvbz17Yu744'; // Replace with your Telegram bot token
    const CHAT_ID = '-1002466015591'; // Replace with your Telegram group chat ID
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(chatText)}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            alert('Chat history sent to Telegram!');
        } else {
            alert('Failed to send chat history.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});