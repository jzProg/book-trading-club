<template>
  <div style = "border-style: solid; margin: 5%; padding: 5%">
    User
    <span class = 'userSpan'>{{ notification.requester }} </span>wants to trade your book
    <span class = 'bookSpan'>{{ getBookTitleById(notification.bookToTrade) }} </span>with the book
    <span class = 'bookSpan'>{{ getBookTitleById(notification.bookToOffer) }} </span><br>
    <i class = "fas fa-check"
       style = "color:green"
       @click.prevent = 'acceptTrade'
       @mouseover = "hover = true; currentTooltip = 'accept'"
       @mouseleave = "hover = false">
    </i>
    <i class = "fas fa-times"
       style = "color:red"
       @click.prevent = 'declineTrade'
       @mouseover = "hover = true; currentTooltip = 'decline'"
       @mouseleave = "hover = false">
    </i>
    <span class = "tooltiptext" v-if = "hover">{{ currentTooltip }}</span>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'TradeNotification',
    props: ['notification'],
    data() {
      return {
        hover: false,
        currentTooltip: ''
      }
    },
    mounted() {
      this.fetchAllBooks();
    },
    methods: {
      ...mapActions([
        'fetchAllBooks',
      ]),
      acceptTrade() {
        console.log('accept!');
      },
      declineTrade() {
        console.log('decline!');
      },
      getBookTitleById(bookId) {
        const book = this.getAllBooksPosted.find(item => { return item.bookId === bookId; });
        return book ? book.title : '';
      }
    },
    computed: {
      ...mapGetters([
        'getAllBooksPosted',
      ]),
    }
  }
</script>

<style scoped>
  .bookSpan {
    color: red;
  }
  .userSpan {
    color: green;
  }
  .fas:hover {
    cursor: pointer;
  }

  .tooltiptext {
    width: 30%;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 2% 0;
    border-radius: 10%;
    position: absolute;
    z-index: 1;
  }
</style>
