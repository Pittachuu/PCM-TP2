// Blackjack object
class Card {
    constructor(value) {
        this.value = value;
    }
}



/**
 * Class that represents the Blackjack game.
 */
class Blackjack {
    // Constant that defines the maximum points to avoid busting in Blackjack
    static MAX_POINTS = 25;
    // Constant that defines the point threshold at which the dealer must stand
    static DEALER_MAX_TURN_POINTS = 21;

    /**
     * Creates an instance of Blackjack and initializes the deck.
     */
    constructor() {
        this.dealerCards = []; // Array to hold the dealer's cards
        this.playerCards = []; // Array to hold the player's cards
        this.dealerTurn = false; // Flag to indicate if it's the dealer's turn to play

        // State of the game with information about the outcome
        this.state = {
            gameEnded: false, // Indicates whether the game has ended
            playerWon: false, // Indicates if the player has won
            dealerWon: false, // Indicates if the dealer has won
            playerBusted: false, // Indicates if the player has exceeded MAX_POINTS
            dealerBusted: false // Indicates if the dealer has exceeded MAX_POINTS
        };

        // Initialize the deck of cards
        this.deck = this.shuffle(this.newDeck()); // Create and shuffle a new deck
    }

    //TODO: Implement this method
    /**
     * Creates a new deck of cards.
     * @returns {Card[]} - An array of cards.
     */
    newDeck() {
        var deck = [];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 
            22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 
            44, 45, 46, 47, 48, 49, 50, 51, 52];
        
        for (let value of values) {
            deck.push(new Card(value));
        }
        return deck;
    }

    // for 1 ate cartas, math.random, shuffle pushdeck i-1
    /**
     * Shuffles the deck of cards.
     * @param {Card[]} deck - The deck of cards to be shuffled.
     * @returns {Card[]} - The shuffled deck.
     */
    shuffle(deck) { 
        for (let i = deck.length - 1; i > 0; i--) {
            let newC = deck[i];
            let oldC = deck[i-1];
            let temp = newC;
            newC = oldC;
            oldC = temp;
        }
        return deck;
    }

    /**
     * Returns the dealer's cards.
     * @returns {Card[]} - An array containing the dealer's cards.
     */
    getDealerCards() {
        return this.dealerCards.slice(); // Return a copy of the dealer's cards
    }

    /**
     * Returns the player's cards.
     * @returns {Card[]} - An array containing the player's cards.
     */
    getPlayerCards() {
        return this.playerCards.slice(); // Return a copy of the player's cards
    }

    /**
     * Sets whether it is the dealer's turn to play.
     * @param {boolean} val - Value indicating if it's the dealer's turn.
     */
    setDealerTurn(val) {
        this.dealerTurn = val; // Update the dealer's turn status
    }

    //TODO: Implement this method
    /**
     * Calculates the total value of the provided cards.
     * @param {Card[]} cards - Array of cards to be evaluated.
     * @returns {number} - The total value of the cards.
     */
    getCardsValue(cards) {
        let total = 0;
        for (let card of cards) {
            total += card.value;
        }
        return total;
    }

    //TODO: Implement this method
    /**
     * Executes the dealer's move by adding a card to the dealer's array.
     * @returns {Object} - The game state after the dealer's move.
     */
    dealerMove() {

    }

    //TODO: Implement this method
    /**
     * Executes the player's move by adding a card to the player's array.
     * @returns {Object} - The game state after the player's move.
     */
    playerMove() {

    }

    //TODO: Implement this method
    /**
     * Checks the game state based on the dealer's and player's cards.
     * @returns {Object} - The updated game state.
     */
    getGameState() {

    }
}