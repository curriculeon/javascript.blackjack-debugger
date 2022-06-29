// the purpose of this class is to log information about data about the `Player`
class BlackJackPlayerDataLogger {
    constructor(name) {
        console.log("Constructing a new BlackJackPlayerData.");
        const player = new BlackJackPlayerData(name);
        this.name = name;    
        this.cards = player.cards;
        this.playerData = player;
        console.log("BlackJackPlayerData construction complete.");
        console.log(player);
    }

    hit(deck) {
        console.log(this.playerData.name + " is hitting the deck.")
        this.playerData.hit(deck);
        console.log(this.playerData.name + " has hit the deck.")
    }
    
    addCard(cardToAddToHand) {
        console.log(this.playerData.name + " is adding a card.")
        this.playerData.addCard(cardToAddToHand);
        console.log(this.playerData.name + " has added a card.")
    }

    getHandTotal() {
        console.log(this.playerData.name + " is computing hand total.")
        const handTotal = this.playerData.getHandTotal();
        console.log(this.playerData.name + " has computed hand total.")
        return handTotal;
    }

    toString() {
        return this.playerData.toString();
    }
}