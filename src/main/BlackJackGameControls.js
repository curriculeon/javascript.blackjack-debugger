// the purpose of this class is to manipulate the DOM by evaluating the `Game` state
class BlackJackGameControls {
    constructor() {
        this.blackJackGame = null;
        document.getElementById("status").style.display = "none";
    }

    startblackjack() {
        this.blackJackGame = new BlackJackGame();
        this.blackJackGame.play();
        this.createPlayersView();
        this.setNumberOfCardsOnScreen();
        this.renderCardsInPlayerHand();
    }

    hitMe() {
        // pop a card from the this.deck to the current player
        // this.check if current player new points are over 21
        const currentPlayer = this.blackJackGame.currentPlayer;
        const topMostCard = this.blackJackGame.deck.removeAndFetchTopMostCard();
        currentPlayer.addCard(topMostCard);
        this.renderCardInPlayerHand(topMostCard, currentPlayer.name);
        this.updatePoints();
        this.setNumberOfCardsOnScreen();
        this.checkAndUpdateWinner();
    }

    stay() {
        // if the current player is the last player
        if(!this.blackJackGame.isCurrentPlayerLastPlayer()) {
            // remove active on current player
            const currentPlayer = this.blackJackGame.currentPlayer;
            const currentPlayerName = currentPlayer.name;
            const elementId = "player_" + currentPlayerName;        
            document.getElementById(elementId).classList.remove("active");

            // switch current player to next player
            this.blackJackGame.setCurrentPlayer();

            // add active on newly current player
            currentPlayer = this.blackJackGame.currentPlayer;
            currentPlayerName = currentPlayer.name;
            elementId = "player_" + currentPlayerName;
            document.getElementById(elementId).classList.add("active");
        } else {
            this.endGame();
        }
    }

    renderCardsInPlayerHand() {
        this.blackJackGame.players.forEach(player => {
            player.cards.forEach(card => {
                this.renderCardInPlayerHand(card, player.name);
            });
        });
    }

    createPlayersView() {
        document.getElementById("players").innerHTML = "";
        this.blackJackGame.players.forEach(player => {
            const playerName = player.name;
            
            // create new web-elements for Player's view
            const div_player = document.createElement("div");
            const div_playerid = document.createElement("div");
            const div_hand = document.createElement("div");
            const div_points = document.createElement("div");

            // modify the state of newly created web-elements
            div_player.className = "player";
            div_points.className = "points";
            div_player.id = "player_" + playerName;
            div_points.id = "points_" + playerName;		
            div_hand.id = "hand_" + playerName;
            div_playerid.innerHTML = "Player " + playerName;

            // inject new web-elements into the DOM
            div_player.appendChild(div_playerid);
            div_player.appendChild(div_hand);
            div_player.appendChild(div_points);
            document.getElementById("players").appendChild(div_player);
        });
    }

    renderCardInPlayerHand(card, playerName) {
        const playerHandId = "hand_" + playerName;
        const playerHandElement = document.getElementById(playerHandId);
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = card.getValue() + "<br/>" + card.getIcon();
        playerHandElement.appendChild(cardElement);
    }

    updatePoints() {
        this.blackJackGame.players.forEach(player => {
            const playerName = player.name;
            const points = player.getHandTotal();
            player.viewHand();
            document.getElementById("points_" + playerName).innerHTML = points;
        })
    }


    setNumberOfCardsOnScreen() {
        const deck = this.blackJackGame.deck;
        const cards = deck.cards;
        const numberOfCards = cards.length;

        document.getElementById("deckcount").innerHTML = numberOfCards;
    }

    checkAndUpdateWinner() {
        if (this.blackJackGame.currentPlayer.getHandTotal() > 21) {
            const statusElement = document.getElementById("status");
            statusElement.innerHTML = "Player: " + this.blackJackGame.currentPlayer.name + " LOST";			
            statusElement.style.display = "inline-block";
            this.endGame()
        }
    }

    endGame() {
        const winner = this.blackJackGame.dealer;
        const dealerScore = this.blackJackGame.dealer.getHandTotal();
        const playerScore = this.blackJackGame.player.getHandTotal();
        if (playerScore > dealerScore && playerScore < 22) {
            winner = player;
        }
        document.getElementById("status").innerHTML = "Winner: Player " + winner.name;
        document.getElementById("status").style.display = "inline-block";
    }
}