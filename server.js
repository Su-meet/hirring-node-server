const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins (for local testing)
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// simple req, res
app.get("/", (req, res) => {
    res.send("WebRTC Socket Server");
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`); ``

    // Handle WebRTC offer
    socket.on("offer", (offer) => {
        console.log("Received offer from:", socket.id);
        socket.broadcast.emit("offer", offer);
    });

    // Handle WebRTC answer
    socket.on("answer", (answer) => {
        console.log("Received answer from:", socket.id);
        socket.broadcast.emit("answer", answer);
    });

    // Handle ICE candidates
    socket.on("iceCandidate", (candidate) => {
        console.log("Received ICE candidate from:", socket.id);
        socket.broadcast.emit("iceCandidate", candidate);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 8001;
server.listen(PORT, () => {
    console.log(`WebRTC Socket Server running on http://localhost:${8001}`);
});
