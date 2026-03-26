// the purpose of this class is to encapsulate data about the `Player`
class BlackJackPlayerState {
    // a blackjack player should receive a name when created
    // a black jack player's hand is empty until receiving cards from a dealer
    constructor(name) {
        this.name = name;
        this.cards = [];
        // when true the dealer's first (hole) card should be hidden from the view
        this.hideHoleCard = false;
    }

    // add card to hand
    hit(deck) {
        const incomingCard = deck.removeAndFetchTopMostCard();
        this.addCard(incomingCard);
    }
    
    addCard(cardToAddToHand) {
        this.cards.push(cardToAddToHand);
    }

    getHandTotal() {
        // Calculate total with proper Ace handling (Ace = 11 or 1)
        let total = 0;
        let aceCount = 0;
        this.cards.forEach(currentCard => {
            const value = currentCard.getValue();
            total += value;
            if (typeof currentCard.rank !== 'number' && currentCard.rank === 'ace') {
                aceCount += 1;
            }
        });

        // Reduce Ace(s) from 11 to 1 as necessary
        while (total > 21 && aceCount > 0) {
            total -= 10; // converting an Ace from 11 to 1 reduces total by 10
            aceCount -= 1;
        }

        return total;
    }

    toString() {
        return JSON.stringify(this);
    }
}