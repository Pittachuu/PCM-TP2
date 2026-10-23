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
    let message = '';

    if (state.playerWon) {
        message = 'Player wins!';
    } else if (state.dealerWon) {
        message = 'Dealer wins!';
    } else {
        message = 'Draw!';
    }

    let playerPoints = game.getCardsValue(game.getPlayerCards());
    let dealerPoints = game.getCardsValue(game.getDealerCards());

    document.getElementById('dealer_title').innerHTML = 'Dealer - ' + dealerPoints;

    message = message + ' Player: ' + playerPoints + ' | Dealer: ' + dealerPoints;
    document.getElementById('game_status').innerHTML = message;
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

function shakeDeck() {
    const deck = document.querySelector('.card-deck');

    if (!deck) {
        return;
    }

    deck.classList.remove('deck-shake');

    void deck.offsetWidth;

    deck.classList.add('deck-shake');
}