// the purpose of this class is to manipulate the DOM by evaluating the `Game` state
class BlackJackGame {
    constructor() {
        this.blackJackGame = null;
        document.getElementById("winner").style.display = "none";
    }

    startblackjack() {        
        this.blackJackGame = new BlackJackGameDataLogger();
        this.blackJackGameView = new BlackJackGameView(this.blackJackGame);

        this.blackJackGameView.createPlayersView();
        this.blackJackGame.play();        
        this.blackJackGameView.clearGameOptions();
        this.blackJackGameView.setNumberOfCardsOnScreen();
        this.blackJackGameView.setActiveOnCurrentPlayer();
    }

    hit() {
        // pop a card from the this.deck to the current player
        // check if current player new points are over 21
        this.blackJackGame.hit();
        this.blackJackGameView.updatePoints();
        this.blackJackGameView.setNumberOfCardsOnScreen();
        this.blackJackGameView.checkAndUpdateWinner();
        this.blackJackGameView.setActiveOnCurrentPlayer();
    }

    stay() {
        // if the current player is the dealer
        if(this.blackJackGame.isCurrentPlayerDealer()) {            
            this.blackJackGameView.endGame();
        } else { 
            // switch current player to next player
            this.blackJackGameView.removeActiveOnCurrentPlayer();
            this.blackJackGame.setCurrentPlayer();
        }
        this.blackJackGameView.setActiveOnCurrentPlayer();
    }
}