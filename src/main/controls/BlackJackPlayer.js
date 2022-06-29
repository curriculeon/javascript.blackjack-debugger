class BlackJackPlayer {
    // a blackjack player should receive a name when created
    // a black jack player's hand is empty until receiving cards from a dealer
    constructor(name) {
        this.name = name;
        this.blackJackPlayerData = new BlackJackPlayerData(name);
        this.blackJackPlayerView = new BlackJackPlayerView(this.blackJackPlayerData);
    }

    // prints the cards of the current BlackJackPlayerData
    viewHand() {
        this.blackJackPlayerView.viewHand();
    }

    // add card to hand (presumably from deck or dealer)
    hit(deck) {
        this.addCard(deck.removeAndFetchTopMostCard());
    }
    
    addCard(cardToAddToHand) {
        this.blackJackPlayerView.clearHand();    
        this.blackJackPlayerData.addCard(cardToAddToHand);
        this.blackJackPlayerView.renderHand();
    }

    getHandTotal() {
        return this.blackJackPlayerData.getHandTotal();
    }

    toString() {
        return this.blackJackPlayerData.toString();
    }
}