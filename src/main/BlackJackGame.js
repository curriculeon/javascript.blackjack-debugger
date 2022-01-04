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
        const numberOfPlayers = players.length;
        const lastPlayerIndex = numberOfPlayers - 1;
        const lastPlayer = this.players[lastPlayerIndex];        
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
        const deck = this.deck;

        this.dealer.hit(deck);
        this.dealer.hit(deck);
        this.player.hit(deck);
        this.player.hit(deck);
    }
}

