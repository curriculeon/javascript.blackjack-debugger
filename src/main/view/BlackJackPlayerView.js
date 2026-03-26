// the purpose of this class is to manipulate the DOM by evaluating the `Player` state
class BlackJackPlayerView {
    constructor(player) {
        this.playerData = player;
    }

    viewHand() {
        console.log("Printing the hand of player [" + this.playerData.name + "]");
        this.playerData.cards.forEach(card => {
            console.log("\t" + card.toString());
        });
    }

    getHandWebElement() {
        const playerName = this.playerData.name;
        const playerHandId = "hand_" + playerName;
        const playerHandElement = document.getElementById(playerHandId);
        return playerHandElement;
    }

    clearHand() {
        this.getHandWebElement().innerHTML = "";
    }

    renderHand() {
        const cards = this.playerData.cards;
        cards.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.className = "card";

            const inner = document.createElement('div');
            inner.className = 'card-inner';

            const front = document.createElement('div');
            front.className = 'card-front';
            const label = (typeof card.rank === 'number') ? card.rank : (card.rank.charAt(0).toUpperCase() + card.rank.slice(1));
            front.innerHTML = label + "<br/>" + card.getIcon();

            const back = document.createElement('div');
            back.className = 'card-back';
            back.innerHTML = '&#x1F0A0;'; // decorative back symbol

            inner.appendChild(front);
            inner.appendChild(back);
            cardElement.appendChild(inner);

            // If this is the dealer and the hole card is hidden, show the back face by default
            if (this.playerData.hideHoleCard && this.playerData.name === "Dealer" && index === 0) {
                cardElement.classList.add('flipped');
            }

            this.getHandWebElement().appendChild(cardElement);
        });
    }    
}