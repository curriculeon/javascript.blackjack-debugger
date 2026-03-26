// the purpose of this class is to mediate the behaviors of `GameData` and `GameView`
class BlackJackGame {
    startblackjack() {        
        this.blackJackGameData = new BlackJackGameStateLogger();
        this.blackJackGameDataView = new BlackJackGameView(this.blackJackGameData);

        this.blackJackGameDataView.createPlayersView();
        this.blackJackGameData.play();        
        this.blackJackGameDataView.clearGameOptions();
        this.blackJackGameDataView.setNumberOfCardsOnScreen();
        this.blackJackGameDataView.setActiveOnCurrentPlayer();
    }

    hit() {
        this.blackJackGameData.hit();
        this.blackJackGameDataView.updatePoints();
        this.blackJackGameDataView.setNumberOfCardsOnScreen();
        this.blackJackGameDataView.checkAndUpdateWinner();
        this.blackJackGameDataView.setActiveOnCurrentPlayer();
    }

    async stay() {
        // if the current player is the dealer
        if (this.blackJackGameData.isCurrentPlayerDealer()) {
            // if dealer pressed stay, simply end the round
            this.blackJackGameDataView.endGame();
            return;
        }

        // switch current player to next player (player -> dealer)
        this.blackJackGameDataView.removeActiveOnCurrentPlayer();
        this.blackJackGameData.setCurrentPlayer();
        this.blackJackGameDataView.setActiveOnCurrentPlayer();

        // if the new current player is the dealer, run dealer autoplay: hit until 17 or bust
        if (this.blackJackGameData.isCurrentPlayerDealer()) {
            // Dealer auto-play with visual delay between hits
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            while (this.blackJackGameData.getCurrentPlayer().getHandTotal() < 17) {
                this.blackJackGameData.hit();
                // update the UI after each hit
                this.blackJackGameDataView.updatePoints();
                this.blackJackGameDataView.setNumberOfCardsOnScreen();

                // if dealer busted, stop
                if (this.blackJackGameData.getCurrentPlayer().getHandTotal() > 21) {
                    break;
                }

                // small delay so the UI can visually show each dealer hit
                // adjustable delay (milliseconds)
                await sleep(600);
            }

            // small pause before revealing final result
            await sleep(250);

            // After dealer finishes, check/update winner and end the round
            this.blackJackGameDataView.checkAndUpdateWinner();
            this.blackJackGameDataView.endGame();
        }
    }
}