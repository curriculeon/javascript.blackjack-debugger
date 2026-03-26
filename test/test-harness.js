(function(){
    console.log('Running Blackjack test harness...');

    function assert(cond, msg) {
        if (!cond) {
            console.error('ASSERT FAILED:', msg);
            throw new Error('Test failed: ' + msg);
        } else {
            console.log('PASS:', msg);
        }
    }

    // Test 1: Ace scoring
    try {
        const pstate = new BlackJackPlayerState('T');
        pstate.addCard(new Card('ace','hearts'));
        pstate.addCard(new Card(9,'spades'));
        assert(pstate.getHandTotal() === 20, 'Ace + 9 should be 20');
        pstate.addCard(new Card('ace','clubs'));
        // Ace(11) + 9 + Ace(1) should be 21
        assert(pstate.getHandTotal() === 21, 'Ace + 9 + Ace should be 21');
    } catch (e) {
        console.error('Error during Ace scoring tests', e);
    }

    // Test 2: Dealer autoplay and round resolution
    try {
        // create a small DOM for the game view
        const container = document.createElement('div');
        container.innerHTML = `
            <div id="winner"></div>
            <div id="deck"><div id="deckcount">52</div></div>
            <div id="players"></div>
            <div id="game-options"></div>
        `;
        document.body.appendChild(container);

        const controls = new BlackJackGame();
        controls.startblackjack();

        // player stands immediately; dealer should autoplay and the round should resolve
        // stay() is now async (provides visual delays) so wait a bit before asserting
        controls.stay();

        // wait enough time for autoplay to complete (dealer hits up to ~3 times max with 600ms each)
        setTimeout(() => {
            try {
                const winnerEl = document.getElementById('winner');
                assert(winnerEl && winnerEl.style.display !== 'none', 'Winner element should be visible after dealer autoplay');

                // check that dealer hole card is revealed after endGame
                const dealer = controls.blackJackGameData.getDealer();
                // try accessing underlying playerData hide flag if available
                let hideFlag = null;
                try {
                    hideFlag = dealer.blackJackPlayerData.playerData.hideHoleCard;
                } catch (e) {
                    // may not exist depending on wrapper, fallback to null
                    hideFlag = null;
                }
                assert(hideFlag === false, 'Dealer hole card should be revealed at round end');

                console.log('Winner text:', winnerEl.innerText || winnerEl.textContent);
            } catch (e) {
                console.error('Error during delayed dealer autoplay assertions', e);
            }
        }, 2000);

    } catch (e) {
        console.error('Error during dealer autoplay tests', e);
    }

    console.log('All tests in harness completed.');
})();