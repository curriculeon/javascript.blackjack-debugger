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
            console.log("\t" + card.toString());
        });
    }

    // add card to hand (presumably from deck or dealer)
    hit(deck) {
        const incomingCard = deck.removeAndFetchTopMostCard();
        this.addCard(incomingCard);
    }
    
    addCard(cardToAddToHand) {
        const playerName = this.name;
        const playerHandId = "hand_" + playerName;
        const playerHandElement = document.getElementById(playerHandId);
        playerHandElement.innerHTML = "";
        
        this.cards.push(cardToAddToHand);
        this.cards.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.innerHTML = card.getValue() + "<br/>" + card.getIcon();
            playerHandElement.appendChild(cardElement);
        });
    }

    getHandTotal() {
        let total = 0;
        this.cards.forEach(currentCard=> {
            let currentCardValue = currentCard.getValue();
            total += currentCardValue
        })
        return total;
    }

    toString() {
        return JSON.stringify(this);
    }
}