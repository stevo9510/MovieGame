class GameManager {
    
    constructor() {
        this.gameState = new Map();
    }

    createGame(gameId) {
        this.gameState.set(gameId, { 
            gameStarted : false,
            players : [],
            currentTurn : {
                player : null,
                challengePlayer : null,
                // one of these will be non-null in game to denote what player is trying to solve (whether it be a movie or actor)
                movie : {
                    movieId : null,
                    movieName : null,
                    movieImgUrl = null
                },
                actor : {
                    actorId : null,
                    actorName : null,
                    actorCharacterName : null,
                    actorImgUrl : null,
                }
            },
            // history of turns that have taken place in current sequence (i.e., since the last 'strike' occurred, 
            // or the start of the game if no strikes yet)
            currentSequence : [],
            gameEnded : false,
            winner : null,
        });
    }

    startGame(gameId) {
        var game = this.gameState.get(gameId);
        game.active = true;
    }

    addPlayer(gameId, userName) {
        const maxPlayers = 8;

        var game = this.gameState.get(gameId);
        if(game.players.length < maxPlayers){
            var player = {
                userName : userName,
                strikes : 0
            };
            players.push(player);
        }
    }

    getPlayers(gameId) {
        return this.gameState.get(gameId).players;
    }

}

module.exports = {
    GameManager
};