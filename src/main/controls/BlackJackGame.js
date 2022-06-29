// the purpose of this class is to manipulate the DOM by evaluating the `Game` state
class BlackJackGame {
    constructor() {
        this.blackJackGameData = null;
        document.getElementById("winner").style.display = "none";
    }

    startblackjack() {        
        this.blackJackGameData = new BlackJackGameDataLogger();
        this.blackJackGameDataView = new BlackJackGameView(this.blackJackGameData);

        this.blackJackGameDataView.createPlayersView();
        this.blackJackGameData.play();        
        this.blackJackGameDataView.clearGameOptions();
        this.blackJackGameDataView.setNumberOfCardsOnScreen();
        this.blackJackGameDataView.setActiveOnCurrentPlayer();
    }

    hit() {
        // pop a card from the this.deck to the current player
        // check if current player new points are over 21
        this.blackJackGameData.hit();
        this.blackJackGameDataView.updatePoints();
        this.blackJackGameDataView.setNumberOfCardsOnScreen();
        this.blackJackGameDataView.checkAndUpdateWinner();
        this.blackJackGameDataView.setActiveOnCurrentPlayer();
    }

    stay() {
        // if the current player is the dealer
        if(this.blackJackGameData.isCurrentPlayerDealer()) {            
            this.blackJackGameDataView.endGame();
        } else { 
            // switch current player to next player
            this.blackJackGameDataView.removeActiveOnCurrentPlayer();
            this.blackJackGameData.setCurrentPlayer();
        }
        this.blackJackGameDataView.setActiveOnCurrentPlayer();
    }
}