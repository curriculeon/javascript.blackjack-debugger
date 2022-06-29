// the purpose of this class is to manipulate the DOM by evaluating the `Game` state
class BlackJackGameControls {
    constructor() {
        this.blackJackGame = null;
        document.getElementById("winner").style.display = "none";
    }

    startblackjack() {        
        this.blackJackGame = new BlackJackGameLogger();
        this.blackJackGameView = new BlackJackGameView(this.blackJackGame);

        this.blackJackGameView.createPlayersView();
        this.blackJackGame.play();        
        this.blackJackGameView.setNumberOfCardsOnScreen();
        this.blackJackGameView.clearGameOptions();
    }

    hit() {
        // pop a card from the this.deck to the current player
        // check if current player new points are over 21
        this.blackJackGame.hit();
        this.blackJackGameView.updatePoints();
        this.blackJackGameView.setNumberOfCardsOnScreen();
        this.blackJackGameView.checkAndUpdateWinner();
    }

    stay() {
        // if the current player is the dealer
        if(this.blackJackGame.isCurrentPlayerDealer()) {            
            this.blackJackGameView.endGame();
        } else { 
            // switch current player to next player
            this.blackJackGameView.removeActiveOnCurrentPlayer();
            this.blackJackGame.setCurrentPlayer();
            this.blackJackGameView.setActiveOnCurrentPlayer();
        }
    }
}