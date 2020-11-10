const { createApp } = Vue;

function isMatch(card1, card2) {
  return card1.img === card2.img
}

function isCardListEmpty(cardlist) {
  return cardlist.length === 0 ? true : false
}

function isCardListFull(cardlist) {
  return cardlist.length === 2 ? true : false
}

function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
}

const App = {
   name: "App",
   data() {
      return {
         cards: shuffle(['10_tiger.png', '11_penguin.png', '12_racoon.png', '1_pig.png', '2_squirrel.png', '3_rabbit.png', '4_frog.png', '5_fox.png', '6_bear.png', '7_monkey.png', '8_panda.png', '9_chick.png', '10_tiger.png', '11_penguin.png', '12_racoon.png', '1_pig.png', '2_squirrel.png', '3_rabbit.png', '4_frog.png', '5_fox.png', '6_bear.png', '7_monkey.png', '8_panda.png', '9_chick.png']),
         flippedCards: [],
         pairs: 0,
         won: false
      };
   },
   computed: {
    totalPairs: function () {
      return this.cards.length / 2
    }
   },
   methods: {
     cardChecker(card) {
      if (isCardListFull(this.flippedCards)) {
        this.flippedCards.forEach(element => {
            element.flipped = false
          });
          this.flippedCards = []
      }
      if (isCardListEmpty(this.flippedCards) || !this.flippedCards.includes(card)) {
        card.flipped = !card.flipped
      }
      if (!this.flippedCards.includes(card)) {
        this.flippedCards.push(card)
      }
      if (this.flippedCards.length == 2 && isMatch(this.flippedCards[0], card)) {
        this.flippedCards[0].matched = true
        card.matched = true
        this.flippedCards = []
        this.pairs++

        if (this.pairs == this.totalPairs) {
          this.won = true
        }
      }
    }
   },
};

const app = createApp(App);

app.component('Card', {
   name: 'Card',
   props: ['img'],
   data() {
     return {
       flipped: false,
       matched: false
     }
   },
   methods: {
    onClick () {
      if (this.matched) {
        return false
      }
      this.$emit('clicked', this)
    },
   },
   template: `#card-template`
});

app.component('Item', {
   name: 'item',
   props: ['index'],
   data() {
      return {
         done: false
      }
   },
   template: `#item-template`
});

app.component('Win', {
   name: 'Win',
   template: `#win-template`
});

app.mount("#app");