class BlackJackGame {
    constructor() {
        this.player = new BlackJackPlayer("Leon");
        this.dealer = new BlackJackPlayer("Dealer");
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

    toString() {
        return JSON.stringify(this);
    }
}

