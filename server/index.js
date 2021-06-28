const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
});
const cors = require('cors');

// TODO: Allows all CORS.  Tighten this up later on.
app.use(cors());

const { InMemorySessionStore } = require("./sessionStore");
const { GameManager } = require("./gameManager");
const sessionStore = new InMemorySessionStore();
const gameManager = new GameManager();
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
const { createGame } = require("./gameDao");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/create", (req, res) => {
    var game = createGame();
    gameManager.createGame(game.gameId, game.startToken);
    res.end(JSON.stringify(game));
});

io.use((socket, next) => {
    // try to get session if it exists
    console.log("In middleware");
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

    gameManager.addPlayer(socket.gameId, socket.userName);

    socket.to(socket.gameId).emit("player joined", {
        userName: socket.userName,
    });

    socket.on("start game", (msg) => {
        const startToken = msg.startToken;

        gameManager.startGame(socket.gameId);

        io.in(socket.gameId).emit("game started", {});
    });

    socket.on("make move", (msg) => {
        io.in(socket.gameId).emit("update state", {});

        winner = false;
        if (winner) {
            io.in(socket.gameId).emit("game ended", {});
        }
    });

    // let new player know about current game state
    socket.emit("update state", gameManager.getGameState(socket.gameId));
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

function validateStartGameToken(startToken) {
    // TODO: Implement this by checking data store for generated start token
    return true;
}
