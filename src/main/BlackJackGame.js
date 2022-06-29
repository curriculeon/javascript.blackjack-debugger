class BlackJackGame {
    constructor() {
        const playerData = new BlackJackPlayerData("Leon");
        const dealerData = new BlackJackPlayerData("Dealer");
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

    setCurrentPlayer() {
        // remove active on current player
        let currentPlayer = this.getCurrentPlayer();
        let currentPlayerName = currentPlayer.name;
        let elementId = "player_" + currentPlayerName;        
        document.getElementById(elementId).classList.remove("active");

        // switch current player to next player
        if(this.currentPlayer == this.player) {
            this.currentPlayer = this.dealer;
        } else {
            this.currentPlayer = this.player;
        }

        // add active on newly current player
        currentPlayer = this.getCurrentPlayer();
        currentPlayerName = currentPlayer.name;
        elementId = "player_" + currentPlayerName;
        document.getElementById(elementId).classList.add("active");      
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

