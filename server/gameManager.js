class GameManager {
    constructor() {
        this.gameState = new Map();
        this.startToken = "";
    }

    createGame(gameId, startToken) {
        this.gameState.set(gameId, { 
            gameStarted : false,
            players : [],
            currentTurn : {
                prevPlayer : null,
                player : null,
                challenge : false,
                // one of these will be non-null in game to denote what player is trying to solve (whether it be a movie or actor)
                movie : {
                    movieId : null,
                    movieName : null,
                    movieImgUrl : null
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
        this.startToken = startToken;
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
                strikes : 0,
                isOut : false
            };
            game.players.push(player);
        }
    }

    getPlayers(gameId) {
        return this.gameState.get(gameId).players;
    }

    getGameState(gameId) {
        return this.gameState.get(gameId);
    }

    challenge(gameId, userName) {
        var game = this.gameState.get(gameId);
        var currentTurn = game.currentTurn;

        if(currentTurn.userName === userName && prevPlayer !== null){ 
            currentTurn.challenge = true;
        }
        else {
            // Throw exception... invalid state
        }
    }

    makeMove(gameId, userName, moveInfo){
        var game = this.gameState.get(gameId);
        var currentTurn = game.currentTurn;

        if(!moveInfo.actorId && !moveInfo.movieId){
            // Throw an error... bad data passed... one should be not null...
        }

        // Case 1: Player is answering a challenge
        if(currentTurn.challenge) {
            if(currentTurn.prevPlayer != userName) {
                // TODO: Throw an error... person issuing challenge is not correct
            }

            const correct = null;
            if(currentTurn.movie) {
                correct = this.verifyActorIsInMovie(moveInfo.actorId, currentTurn.movie.movieId);
            }
            else if(currentTurn.actor) {
                correct = this.verifyMovieHasActorInIt(moveInfo.movieId, currentTurn.actor.actorId);
            }

            if(correct === true) {
                this.giveStrike(game, currentTurn.userName);
            }
            else if(correct === false){
                this.giveStrike(game, currentTurn.prevPlayer);
            }
            else {
                // TODO: is this possible to be hit? 
            }

        }
        else {
            // shared error check...
            if(currentTurn.userName !== userName) {
                // throw an error... not correct player making move
            }

            const correct = null;

            // Case 2: Player has to pick an Actor
            if(currentTurn.movie !== null) {
                correct = this.verifyActorIsInMovie(moveInfo.actorId, currentTurn.movie.movieId);

            }         
            // Case 3: Player has to pick a Movie
            else if(currentTurn.actor !== null) {
                correct = this.verifyMovieHasActorInIt(moveInfo.movieId, currentTurn.actor.actorId);
            }
            // Case 4: First Move of Game/Sequence... Can be Movie or Actor
            else {
                if(moveInfo.actorId && moveInfo.movieId) {
                    // throw exception... bad data sent... one should be null
                }

                // verify non-bogus move is sent
                if(moveInfo.actorId) {
                    correct = verifyActorExists(moveInfo.actorId);
                } else {
                    correct = verifyMovieExists(moveInfo.movieId);
                }
                
            }
        
            if(correct === false) {
                this.giveStrike(game, currentTurn.userName);
                this.currentSequence.length = 0;
            } 
            else {
                this.currentSequence.Push(this.currentTurn);
            }
        }
    }

    verifyActorExists(actorId) {
        return true;
    }

    verifyMovieExists(movieId) {
        return true;
    }

    verifyActorIsInMovie(actorId, movieId){

        if(!actorId) {
            // TODO: Throw exception
        }
        
        return true;
    }

    verifyMovieHasActorInIt(movieId, actorId){

        return true;
    }

    getPlayer(game, userName) {
        game.players.forEach(player => {
            if(player.userName === userName){
                return player;
            }
        });

        return null;
    }

    // give strike and return if player is out
    giveStrike(game, userName) {
        var player = getPlayer(game, userName);
        player.strikes++;
        if(player.strikes == 3) {
            player.isOut = true;
        }
    }
}

module.exports = {
    GameManager
};