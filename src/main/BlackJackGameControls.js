// the purpose of this class is to manipulate the DOM by evaluating the `Game` state
class BlackJackGameControls {
    constructor() {
        this.blackJackGame = null;
        document.getElementById("winner").style.display = "none";
    }

    startblackjack() {        
        this.blackJackGame = new BlackJackGameLogger();
        this.createPlayersView();
        this.blackJackGame.play();        
        this.setNumberOfCardsOnScreen();
        document.getElementById("game-options").style.display = "";
    }

    hit() {
        // pop a card from the this.deck to the current player
        // check if current player new points are over 21
        const currentPlayer = this.blackJackGame.getCurrentPlayer();
        const topMostCard = this.blackJackGame.getDeck().removeAndFetchTopMostCard();
        currentPlayer.addCard(topMostCard);
        this.updatePoints();
        this.setNumberOfCardsOnScreen();
        this.checkAndUpdateWinner();
    }

    stay() {
        // if the current player is the dealer
        if(this.blackJackGame.isCurrentPlayerDealer()) {
            this.endGame();
        } else { 
            // switch current player to next player
            this.blackJackGame.setCurrentPlayer();
        }
    }

    createPlayersView() {
        const playersView = document.getElementById("players");
        // clear player's view
        playersView.innerHTML = "";

        // generate each player's view
        this.blackJackGame.getPlayers().forEach(player => {
            const playerName = player.name;
            console.log("creating view for " + playerName);
            
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
            playersView.appendChild(div_player);
            console.log("created hand-view with id of " + div_hand.id);
        });
    }

    updatePoints() {
        this.blackJackGame.getPlayers().forEach(player => {
            const playerName = player.name;
            const points = player.getHandTotal();
            player.viewHand();
            document.getElementById("points_" + playerName).innerHTML = points;
        })
    }


    setNumberOfCardsOnScreen() {
        const deck = this.blackJackGame.getDeck();
        const cards = deck.cards;
        const numberOfCards = cards.length;

        document.getElementById("deckcount").innerHTML = numberOfCards;
    }

    checkAndUpdateWinner() {
        if (this.blackJackGame.getCurrentPlayer().getHandTotal() > 21) {
            const winnerElement = document.getElementById("winner");
            winnerElement.innerHTML = "Player: " + this.blackJackGame.getCurrentPlayer().name + " LOST";			
            winnerElement.style.display = "inline-block";
            this.endGame()
        }
    }

    endGame() {
        let winner = this.blackJackGame.getDealer();
        const dealerScore = this.blackJackGame.getDealer().getHandTotal();
        const playerScore = this.blackJackGame.getPlayer().getHandTotal();
        if (playerScore > dealerScore && playerScore < 22) {
            winner = player;
        }
        document.getElementById("game-options").style.display = "none";
        document.getElementById("winner").innerHTML = "Winner: Player " + winner.name;
        document.getElementById("winner").style.display = "inline-block";
    }
}