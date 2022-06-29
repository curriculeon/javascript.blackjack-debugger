class BlackJackGameData {
    constructor() {
        const playerData = new BlackJackPlayerDataLogger("Leon");
        const dealerData = new BlackJackPlayerDataLogger("Dealer");
        this.player = new BlackJackPlayer(playerData);
        this.dealer = new BlackJackPlayer(dealerData);
        this.players = [this.player, this.dealer];
        this.currentPlayer = this.player;
        this.deck = new Deck();
        this.deck.shuffle();
    }

    isCurrentPlayerDealer() {
        return this.currentPlayer == this.dealer;
    }

    getDealer() {
        return this.dealer;
    }

    getPlayers() {
        return this.players;
    }
    
    getPlayer() {
        return this.player;
    }

    getDeck() {
        return this.deck;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    
    hit() {
        // pop a card from the this.deck to the current player
        // check if current player new points are over 21
        const currentPlayer = this.getCurrentPlayer();
        const topMostCard = this.getDeck().removeAndFetchTopMostCard();
        currentPlayer.addCard(topMostCard);
    }

    setCurrentPlayer() {
        // switch current player to next player
        if(this.currentPlayer == this.player) {
            this.currentPlayer = this.dealer;
        } else {
            this.currentPlayer = this.player;
        }
    }

    play() {
        const deck = this.deck;

        this.dealer.hit(deck);
        this.dealer.hit(deck);
        this.player.hit(deck);
        this.player.hit(deck);
    }

    toString() {
        return JSON.stringify(this);
    }
}
