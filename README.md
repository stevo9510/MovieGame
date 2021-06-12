# Movie Game
Movie game is a fun game for all movie buffs, and easy to play with friends.

This version of the game is intended to be a progressive web application built on React and NodeJS, using Socket.IO for the turn-based connectivity.

## Rules

* The game is turned based.  
* The first player at the start of the game (or a new sequence) will name a movie or an actor.
  * If a movie is named, the next player has to name an actor in that Movie.
  * If an actor is named, the next player has to name a movie that actor is in.
  * This back-and-forth continues on until a player gets an incorrect answer or challenges their opponent.
* If the player is stumped, they can make a guess (an incorrect guess leads to a strike) or they can challenge the previous player to provide an answer to it.  
  * If the challenged player provides an answer, the challenging player receives a strike; otherwise, the challenged player receives the strike.  
  * A new sequence begins after this challenge starting with the player after the challenging player.
* Each player has three strikes until their out.  The last player remaining is the winner.
