class BlackJackPlayerView {
    constructor(player) {
        this.player = player;
    }

    viewHand() {
        console.log("Printing the hand of player [" + this.name + "]");
        this.player.cards.forEach(card => {
            console.log("\t" + card.toString());
        });
    }

    getHandWebElement() {
        const playerName = this.player.name;
        const playerHandId = "hand_" + playerName;
        const playerHandElement = document.getElementById(playerHandId);
        return playerHandElement;
    }

    clearHand() {
        this.getHandWebElement().innerHTML = "";
    }

    renderHand() {
        this.player.cards.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.innerHTML = card.getValue() + "<br/>" + card.getIcon();
            this.getHandWebElement().appendChild(cardElement);
        });
    }    
}