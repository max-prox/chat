const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const emojiBtn = document.getElementById('emoji-btn');
const shareBtn = document.getElementById('share-btn');

let chatHistory = [];

// Initialize Emoji Button
const picker = new EmojiButton();
picker.on('emoji', emoji => {
    messageInput.value += emoji;
});

emojiBtn.addEventListener('click', () => {
    picker.togglePicker(emojiBtn);
});

sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        chatHistory.push(message);
        chatBox.innerHTML += `<div>${message}</div>`;
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

shareBtn.addEventListener('click', async () => {
    const BOT_TOKEN = '7028890340:AAFlpPYM-lCK2199W78hmX1CKvbz17Yu744'; // Replace with your Telegram bot token
    const CHAT_ID = '-1002466015591'; // Replace with your Telegram group chat ID
    const chatText = chatHistory.join('\n');
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
