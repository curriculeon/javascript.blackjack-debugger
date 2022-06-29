const log = (prompt) => console.log(prompt);

class BlackJackGameDataLogger {
    constructor() {
        this.blackJackGameData = new BlackJackGameData();
    }

    isCurrentPlayerDealer() {
        log("Checking if current player is last player.");
        const outcome = this.blackJackGameData.isCurrentPlayerDealer();
        log("Current player is " + (outcome ? "" : "not") + " last player.")
    }

    getPlayer() {
        log("Player is " + this.blackJackGameData.getPlayer())
        return this.blackJackGameData.getPlayer();
    }

    getDealer() {
        log("BlackJackDealer is " + this.blackJackGameData.getDealer())
        return this.blackJackGameData.getDealer();
    }

    getPlayers() {
        log("Players are " + this.blackJackGameData.getPlayers())
        return this.blackJackGameData.getPlayers();
    }

    getDeck() {
        log("Deck is " + this.blackJackGameData.getDeck())
        return this.blackJackGameData.getDeck();
    }
    
    getCurrentPlayer() {
        log("Current player is " + this.blackJackGameData.currentPlayer)
        return this.blackJackGameData.currentPlayer;
    }

    setCurrentPlayer() {
        this.getCurrentPlayer();
        log("Setting new current player")
        this.blackJackGameData.setCurrentPlayer();
        this.getCurrentPlayer();
    }

    hit() {
        this.blackJackGameData.hit();
    }

    play() {
        log("Playing initial hand")
        this.blackJackGameData.play();
        log("Initial hand played")
    }
}

