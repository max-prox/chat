const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route for the root URL
app.get('/', (req, res) => {
    console.log('Serving index.html to a client');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log(`A user connected with ID: ${socket.id}`);

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log(`Message received from ${socket.id}: ${msg}`);
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
        console.log(`Message broadcasted to all clients: ${msg}`);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log(`A user disconnected with ID: ${socket.id}`);
    });

    // Log any errors
    socket.on('error', (error) => {
        console.error(`Socket error from ${socket.id}:`, error);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Log server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});
