const SUITS = ["S", "C", "H", "D"]
const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export default class Deck {
    constructor(cards = freshDeck()) {
      this.cards = cards
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = this.cards[newIndex]
        this.cards[newIndex] = this.cards[i]
        this.cards[i] = oldValue
      }
    }
  }
  
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
        this.frontUp = false
    }

    turnCard() {
      if (this.frontUp == false) {
        this.frontUp = true
      } else {
        this.frontUp = false
      }
    }

    getSuit() {
      return this.suit
    }

    getValue() {
      return this.value
    }
}

function freshDeck() {
 return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })

}