class BlackJackGame {
    constructor() {
        this.player = new BlackJackPlayer("Leon");
        this.dealer = new BlackJackPlayer("Dealer");
        this.players = [this.player, this.dealer];
        this.currentPlayer = this.player;
        this.deck = new Deck();
        this.deck.shuffle();
    }

    isCurrentPlayerLastPlayer() {
        let numberOfPlayers = players.length;
        let lastPlayerIndex = numberOfPlayers - 1;
        let lastPlayer = this.players[lastPlayerIndex];        
        return this.currentPlayer == lastPlayer;
    }

    setCurrentPlayer() {
        if(this.currentPlayer == this.player) {
            this.currentPlayer = this.dealer;
        } else {
            this.currentPlayer = this.player;
        }
    }

    play() {
        let deck = this.deck;

        this.dealer.hit(deck);
        this.dealer.hit(deck);
        this.player.hit(deck);
        this.player.hit(deck);
    }
}

