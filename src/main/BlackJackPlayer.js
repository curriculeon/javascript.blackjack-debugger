class BlackJackPlayer {
    // a blackjack player should receive a name when created
    // a black jack player's hand is empty until receiving cards from a dealer
    constructor(name) {
        this.name = name;
        this.cards = [];
    }

    // prints the cards of the current BlackJackPlayer
    viewHand() {
        console.log("Printing the hand of player [" + this.name + "]");
        this.cards.forEach(card => {
            console.log(card.toString());
        });
    }

    // add card to hand (presumably from deck or dealer)
    hit(deck) {
        let incomingCard = deck.removeAndFetchTopMostCard();
        this.addCard(incomingCard);
    }
    
    addCard(cardToAddToHand) {
        this.cards.push(cardToAddToHand);
    }

    getHandTotal() {
        let total = 0;
        this.cards.forEach(currentCard=> {
            let currentCardValue = currentCard.getValue();
            total += currentCardValue
        })
        return total;
    }
}