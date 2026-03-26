// the purpose of this class is to manipulate the DOM by evaluating the `Game` state
class BlackJackGameView {
    constructor(blackJackGameData) {
        this.blackJackGameData=blackJackGameData;
        document.getElementById("winner").style.display = "none";
    }

    clearGameOptions() {        
        // explicitly show the in-game controls
        document.getElementById("game-options").style.display = "block";
    }


    createPlayersView() {
        const playersView = document.getElementById("players");
        // clear player's view
        playersView.innerHTML = "";

        // generate each player's view
        this.blackJackGameData.getPlayers().forEach(player => {
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
            playersView.appendChild(div_player);
        });
    }

    updatePoints() {
        this.blackJackGameData.getPlayers().forEach(player => {
            const playerName = player.name;
            const points = player.getHandTotal();
            player.viewHand();
            document.getElementById("points_" + playerName).innerHTML = points;
        })
    }


    setNumberOfCardsOnScreen() {
        const deck = this.blackJackGameData.getDeck();
        const cards = deck.cards;
        const numberOfCards = cards.length;

        document.getElementById("deckcount").innerHTML = numberOfCards;
    }

    checkAndUpdateWinner() {
        if (this.blackJackGameData.getCurrentPlayer().getHandTotal() > 21) {
            // current player busted -> end the round and let endGame compute winner
            this.endGame();
        }
    }

    endGame() {
        // Reveal dealer hole card
        const dealer = this.blackJackGameData.getDealer();
        const player = this.blackJackGameData.getPlayer();
        try {
            // If using the logger wrapper, expose the underlying playerData hide flag
            if (dealer.blackJackPlayerData && dealer.blackJackPlayerData.playerData) {
                dealer.blackJackPlayerData.playerData.hideHoleCard = false;
            }
        } catch (e) {
            // ignore if structure differs
        }
        // if the dealer has a hole card element, animate a flip to reveal it
        const holeCardEl = document.querySelector('#hand_Dealer .card');
        const finalize = () => {
            const dealerScore = dealer.getHandTotal();
            const playerScore = player.getHandTotal();

            let resultText = "";
            if (playerScore > 21) {
                resultText = "Dealer wins (player bust)";
            } else if (dealerScore > 21) {
                resultText = "Player wins (dealer bust)";
            } else if (playerScore > dealerScore) {
                resultText = "Player wins";
            } else if (dealerScore > playerScore) {
                resultText = "Dealer wins";
            } else {
                resultText = "Draw";
            }

            // update UI
            document.getElementById("game-options").style.display = "none";
            // update points and deck count now that cards are revealed
            this.updatePoints();
            this.setNumberOfCardsOnScreen();

            const winnerElement = document.getElementById("winner");
            winnerElement.innerHTML = "Result: " + resultText + " (Player: " + playerScore + " vs Dealer: " + dealerScore + ")";
            winnerElement.style.display = "inline-block";
        };

        if (holeCardEl) {
            // remove flipped class to animate reveal (hole card was flipped showing back)
            holeCardEl.classList.remove('flipped');
            // Wait for the flip animation to finish (matching CSS transition 600ms) before finalizing
            setTimeout(finalize, 700);
        } else {
            // no DOM element found - just finalize immediately
            finalize();
        }
    }

    removeActiveOnCurrentPlayer() {
        // remove active on current player
        const currentPlayer = this.blackJackGameData.getCurrentPlayer();
        const currentPlayerName = currentPlayer.name;
        const elementId = "player_" + currentPlayerName;        
        document.getElementById(elementId).classList.remove("active");
    }

    setActiveOnCurrentPlayer() {
        // add active on newly current player
        const currentPlayer = this.blackJackGameData.getCurrentPlayer();
        const currentPlayerName = currentPlayer.name;
        const elementId = "player_" + currentPlayerName;
        document.getElementById(elementId).classList.add("active");
    }
}