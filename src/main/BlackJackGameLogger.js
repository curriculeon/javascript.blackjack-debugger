const log = (prompt) => console.log(prompt);

class BlackJackGameLogger {
    constructor() {
        this.blackJackGame = new BlackJackGame();
    }

    isCurrentPlayerDealer() {
        log("Checking if current player is last player.");
        const outcome = this.blackJackGame.isCurrentPlayerDealer();
        log("Current player is " + (outcome ? "" : "not") + " last player.")
    }

    getPlayer() {
        log("Player is " + this.blackJackGame.getPlayer())
        return this.blackJackGame.getPlayer();
    }

    getDealer() {
        log("BlackJackDealer is " + this.blackJackGame.getDealer())
        return this.blackJackGame.getDealer();
    }

    getPlayers() {
        log("Players are " + this.blackJackGame.getPlayers())
        return this.blackJackGame.getPlayers();
    }

    getDeck() {
        log("Deck is " + this.blackJackGame.getDeck())
        return this.blackJackGame.getDeck();
    }
    
    getCurrentPlayer() {
        log("Current player is " + this.blackJackGame.currentPlayer)
        return this.blackJackGame.currentPlayer;
    }

    setCurrentPlayer() {
        this.getCurrentPlayer();
        log("Setting new current player")
        this.blackJackGame.setCurrentPlayer();
        this.getCurrentPlayer();
    }

    play() {
        log("Playing initial hand")
        this.blackJackGame.play();
        log("Initial hand played")
    }
}

