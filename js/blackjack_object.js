// Blackjack object
class Card {
    constructor(value) {
        this.value = value;
    }
    
    getSuit() {
        return Math.floor((this.value - 1) / 13); // Naipe: 0, 1, 2 ou 3
    }
    
    getRank() {
        return ((this.value - 1) % 13) + 1; // Posição dentro do naipe: 1 (Ás) a 13 (Rei)
    }
    
    getPoints() {
        return Math.min(this.getRank(), 10);
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

    /**
     * Creates a new deck of cards.
     * @returns {Card[]} - An array of cards.
     */
    newDeck() {
        var deck = [];

        for (let value = 1; value <= 52; value++) {
            deck.push(new Card(value));
        }
        return deck;
    }

    /**
     * Shuffles the deck of cards.
     * @param {Card[]} deck - The deck of cards to be shuffled.
     * @returns {Card[]} - The shuffled deck.
     */
    shuffle(deck) { 
        let indexes = [];
        for (let i = 0; i < deck.length; i++) {
            indexes.push(i);
        }

        let shuffled = [];
        for (let i = 0; i < deck.length; i++) {
            let r = Math.floor(Math.random() * indexes.length);
            let index = indexes[r];
            shuffled.push(deck[index]);
            indexes.splice(r, 1);
        }
        return shuffled;
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

    /**
     * Calculates the total value of the provided cards.
     * @param {Card[]} cards - Array of cards to be evaluated.
     * @returns {number} - The total value of the cards.
     */
    getCardsValue(cards) {
        let total = 0;
        let aces = 0;

        for (let card of cards) {
            total += card.getPoints();
            if (card.getRank() === 1) {
                aces++;
            }
        }

        while (aces > 0 && total + 10 <= Blackjack.MAX_POINTS) {
            total += 10;
            aces--;
        }
        return total;
    }

    /**
     * Executes the dealer's move by adding a card to the dealer's array.
     * @returns {Object} - The game state after the dealer's move.
     */
    dealerMove() {
        let card = this.deck.pop();
        this.dealerCards.push(card);
        return this.getGameState();
    }

    /**
     * Executes the player's move by adding a card to the player's array.
     * @returns {Object} - The game state after the player's move.
     */
    playerMove() {
        let card = this.deck.pop();
        this.playerCards.push(card);
        return this.getGameState();
    }

    /**
     * Checks the game state based on the dealer's and player's cards.
     * @returns {Object} - The updated game state.
     */
    getGameState() {
        let playerPoints = this.getCardsValue(this.playerCards);
        let dealerPoints = this.getCardsValue(this.dealerCards);

        this.state.gameEnded = false;
        this.state.playerWon = false;
        this.state.dealerWon = false;
        this.state.playerBusted = false;
        this.state.dealerBusted = false;

        if (playerPoints > Blackjack.MAX_POINTS) {
            this.state.playerBusted = true;
            this.state.dealerWon = true;
            this.state.gameEnded = true;
        } else if (playerPoints === Blackjack.MAX_POINTS) {
            this.state.playerWon = true;
            this.state.gameEnded = true;
        } else if (this.dealerTurn) {
            if (dealerPoints > Blackjack.MAX_POINTS) {
                this.state.dealerBusted = true;
                this.state.playerWon = true;
                this.state.gameEnded = true;
            } else if (dealerPoints > playerPoints) {
                this.state.dealerWon = true;
                this.state.gameEnded = true;
            } else if (dealerPoints === playerPoints) {
                this.state.gameEnded = true;
            } else if (dealerPoints >= Blackjack.DEALER_MAX_TURN_POINTS) {
                this.state.playerWon = true;
                this.state.gameEnded = true;
            }
        }
        return this.state;
    }
}