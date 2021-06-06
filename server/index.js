const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.use((socket, next) => {
    // try to get session if it exists
    const sessionId = socket.handshake.auth.sessionId;

    if (sessionId) {
        const session = sessionStore.findSession(sessionId);
        if (session) {
            socket.sessionId = session.sessionId;
            socket.gameId = session.gameId;
            socket.userName = session.userName;
            return next();
        }
    }

    // otherwise use gameId to create a new session.
    const gameId = socket.handshake.auth.gameId;
    const userName = socket.handshake.auth.userName;

    if (!gameId) {
        return next(new Error("Game ID was not provided"));
    }

    if (!userName) {
        return next(new Error("User name was not provided"));
    }

    if (!validateGameId(gameId)) {
        return next(
            new Error("Game ID provided is not valid or no longer active")
        );
    }

    if (!validateUserName(gameId, userName)) {
        return next(
            new Error("User name provided is already taken for this game")
        );
    }

    socket.sessionId = randomId();
    socket.userName = userName;
    socket.gameId = gameId;
    next();
});

io.on("connection", (socket) => {
    sessionStore.saveSession(socket.sessionId, {
        gameId: socket.gameId,
        userName: socket.userName,
        connected: true,
    });

    // Join the game (aka room) provided
    socket.join(socket.gameId);

    socket.to(socket.gameId).emit("player joined", {
        userName: socket.userName,
    });

    socket.on("start game", (msg) => {
        const startToken = msg.startToken;

        io.in(socket.gameId).emit("game started", {});
    });

    socket.on("make move", (msg) => {
        io.in(socket.gameId).emit("update state", {});

        winner = false;
        if (winner) {
            io.in(socket.gameId).emit("game ended", {});
        }
    });

    socket.emit("players list");
});

server.listen(3000, () => {
    console.log("listening on port 3000");
});

function validateGameId(gameId) {
    // TODO: Implement this by checking data store to see if game is valid, it is active,
    // etc.
    return true;
}

function validateUserName(gameId, userName) {
    // TODO: Implement whether username is used for this game
    return true;
}
