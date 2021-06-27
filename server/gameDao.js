const cryptoRandomString = require('crypto-random-string');

const createGame = () => {
    const gameId = cryptoRandomString({length: 5, type: 'distinguishable'});
    const startToken = cryptoRandomString({length: 16, type: 'url-safe'});
    return { gameId: gameId, startToken: startToken };
};

module.exports = {
    createGame
};