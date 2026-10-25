// Blackjack OOP

let game = null; // Stores the current instance of the game

/**
 * Function to debug and display the state of the game object.
 * @param {Object} obj - The object to be debugged.
 */
function debug(obj) {
    document.getElementById('debug').innerHTML = JSON.stringify(obj); // Displays the state of the object as JSON
}

/**
 * Initializes the game buttons.
 */
function buttonsInitialization() {
    document.getElementById('card').disabled = false; // Enables the button to draw a card
    document.getElementById('stand').disabled = false; // Enables the button to stand
    document.getElementById('new_game').disabled = true; // Disables the button for a new game
}

/**
 * Finalizes the buttons after the game ends.
 */
function finalizeButtons() {
    printCard(document.getElementById('dealer'), game.getDealerCards()[1], true);

    document.getElementById('card').disabled = true; // Disables the button to draw a card
    document.getElementById('stand').disabled = true; // Disables the button to stand
    document.getElementById('new_game').disabled = false; // Enables the button for a new game
}

/**
 * Clears the page to start a new game.
 */
function clearPage() {
    document.getElementById('dealer').innerHTML = '';
    document.getElementById('player').innerHTML = '';
    document.getElementById('game_status').innerHTML = '';
}

/**
 * Starts a new game of Blackjack.
 */
function newGame() {
    const overlay = document.getElementById('result_overlay');

    overlay.hidden = true;
    game = new Blackjack(); // Creates a new instance of the Blackjack game
    debug(game); // Displays the current state of the game for debugging
    clearPage();

    dealerNewCard();
    dealerNewCard();
    document.getElementById('dealer').children[1].src = 'img/svg/card_back.svg';
    playerNewCard();

    buttonsInitialization();
}

/**
 * Calculates and displays the final score of the game.
 * @param {Object} state - The current state of the game.
 */
function finalScore(state) {

    const overlay = document.getElementById('result_overlay');
    const title = document.getElementById('result_title');
    const icon = document.getElementById('result_icon');
    const message = document.getElementById('result_message');
    const playerPoints = game.getCardsValue(game.getPlayerCards());
    const dealerPoints = game.getCardsValue(game.getDealerCards());

    document.getElementById('result_player_score').textContent = playerPoints;
    document.getElementById('result_dealer_score').textContent = dealerPoints;

    document.getElementById('dealer_title').textContent = 'Dealer - ' + dealerPoints;

    if (state.playerBusted) {

        overlay.className = 'result-overlay bust';

        title.textContent = 'BUST!';
        message.textContent = 'You went over 25!';
        icon.className = 'fa-solid fa-explosion result-icon';

    } else if (state.playerWon) {

        overlay.className = 'result-overlay victory';

        title.textContent = 'VICTORY!';
        icon.className = 'fa-solid fa-trophy result-icon';

        if (playerPoints === 25) {
            message.textContent = 'Perfect score! You reached 25!';
        } else if (state.dealerBusted) {
            message.textContent = 'The dealer went over 25!';
        } else {
            message.textContent = 'You beat the dealer!';
        }

    } else if (state.dealerWon) {

        overlay.className = 'result-overlay defeat';

        title.textContent = 'DEALER WINS!';
        message.textContent = 'Better luck next round!';
        icon.className = 'fa-solid fa-crown result-icon';

    } else {

        overlay.className = 'result-overlay draw';

        title.textContent = 'DRAW!';
        message.textContent = 'Both player and dealer have the same score!';
        icon.className = 'fa-solid fa-scale-balanced result-icon';
    }

    document.getElementById('game_status').textContent = '';

    overlay.hidden = false;
}

/**
 * Updates the dealer's state in the game.
 * @param {Object} state - The current state of the game.
 */
function updateDealer(state) {
    let cards = game.getDealerCards();
    let lastCard = cards[cards.length - 1];

    printCard(document.getElementById('dealer'), lastCard);
    document.getElementById('dealer_title').innerHTML = 'Dealer - ' + game.getCardsValue([cards[0]]) + ' + ?';
}

/**
 * Updates the player's state in the game.
 * @param {Object} state - The current state of the game.
 */
function updatePlayer(state) {
    let cards = game.getPlayerCards();
    let lastCard = cards[cards.length - 1];

    printCard(document.getElementById('player'), lastCard);
    document.getElementById('player_title').innerHTML = 'Player - ' + game.getCardsValue(cards);
}

/**
 * Causes the dealer to draw a new card.
 * @returns {Object} - The game state after the dealer's move.
 */
function dealerNewCard() {
    let state = game.dealerMove();

    updateDealer(state);
    debug(game);

    return state;
}

/**
 * Causes the player to draw a new card.
 * @returns {Object} - The game state after the player's move.
 */
function playerNewCard() {
    let state = game.playerMove();

    updatePlayer(state);
    debug(game);

    if (state.gameEnded) {
        finalScore(state);
        finalizeButtons();
    }

    return state;
}

/**
 * Finishes the dealer's turn.
 */

function dealerFinish() {
    if (!game || game.state.gameEnded || game.dealerTurn) {
        return;
    }
    game.setDealerTurn(true);
    let state = game.getGameState();

    while (!state.gameEnded) {
        state = dealerNewCard();
    }

    debug(game)

    finalScore(state);
    finalizeButtons();
}


/**
 * Prints the card in the graphical interface.
 * @param {HTMLElement} element - The element where the card will be displayed.
 * @param {Card} card - The card to be displayed.
 * @param {boolean} [replace=false] - Indicates whether to replace the existing image.
 */
function printCard(element, card, replace = false) {
    let img = document.createElement('img');

    let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
    let suits = ['clubs', 'diamonds', 'hearts', 'spades'];

    img.src = 'img/svg/' + ranks[card.getRank() - 1] + '_of_' + suits[card.getSuit()] + '.svg';

    if (replace) {
        element.replaceChild(img, element.children[1]);
    } else {
        element.appendChild(img);
        shakeDeck();
    }
}

/**
 * Makes the card deck "shake" using a CSS animation.
 * Looks for the element with the "card-deck" class; if it does not exist,
 * nothing happens. To be able to replay the animation, it first removes it
 * and then applies it again after 30 ms.
 *
 * @function shakeDeck
 * @returns {void} Does not return a value.
 */
function shakeDeck() {
    const deck = document.querySelector('.card-deck');

    if (!deck) {
        return;
    }

    deck.style.animation = 'none';

    setTimeout(function() { deck.style.animation = 'deckShake 0.5s ease-in-out';}, 30);
}

/**
 * Closes the result screen by hiding the element with the id "result_overlay".
 *
 * @function closeResult
 * @returns {void} Does not return a value.
 */
function closeResult() {
    document.getElementById('result_overlay').hidden = true;
}