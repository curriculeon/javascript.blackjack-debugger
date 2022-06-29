class BlackJackPlayerDataLogger {
    // a blackjack player should receive a name when created
    // a black jack player's hand is empty until receiving cards from a dealer
    constructor(name) {
        console.log("Constructing a new BlackJackPlayerData.");
        const player = new BlackJackPlayerData(name);
        this.name = name;    
        this.cards = player.cards;
        this.player = player;
        console.log("BlackJackPlayerData construction complete.");
        console.log(player);
    }

    // add card to hand (presumably from deck or dealer)
    hit(deck) {
        console.log(this.player.name + " is hitting the deck.")
        this.player.hit(deck);
        console.log(this.player.name + " has hit the deck.")
    }
    
    addCard(cardToAddToHand) {
        console.log(this.player.name + " is adding a card.")
        this.player.addCard(cardToAddToHand);
        console.log(this.player.name + " has added a card.")
    }

    getHandTotal() {
        console.log(this.player.name + " is computing hand total.")
        const handTotal = this.player.getHandTotal();
        console.log(this.player.name + " has computed hand total.")
        return handTotal;
    }

    toString() {
        return this.player.toString();
    }
}