class Deck {
    
    // upon construction, create 52 cards: 13 ranks x 4 suits
    constructor() {        
        const suits = ["hearts", "diamonds", "spades", "clubs"]
        const ranks =  ["ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"]
        this.cards = []
        suits.forEach(suit => {
            ranks.forEach(rank => {
                let newCardObject = new Card(rank, suit);
                this.cards.push(newCardObject);
            });
        });
    }

    // simulates getting a card from the deck
    removeAndFetchTopMostCard() {
        let topMostCard = this.cards.pop();
        return topMostCard;
    }
    
    // simulates shuffling a deck
    shuffle() {
        for (let i = this.cards.length - 1; i > 1; i--) {
            let x = Math.floor(Math.random() * i);
            let temp = this.cards[i];
            this.cards[i]  = this.cards[x];
            this.cards[x] = (temp);
          }
    }
}