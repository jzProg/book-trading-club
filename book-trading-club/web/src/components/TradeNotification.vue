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
  import uniqueIdGeneratorMixin from '@/common/helpers/uniqueIdsGenerator';

  export default {
    name: 'TradeNotification',
    props: ['notification'],
    mixins: [uniqueIdGeneratorMixin],
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
        'sendTradeMessage',
        'removeNotification',
        'trade',
      ]),
      acceptTrade() {
        this.trade({ requester: this.notification.requester,
                     bookToTrade:  this.notification.bookToTrade,
                     bookToOffer: this.notification.bookToOffer,
                     tradeId: this.guid(),
        }).then(() => {
          this.sendTradeMessage({ sendTo: this.notification.requester,
                                  message: `Trade accepted by ${this.getLoginUsername}! You obtained ${this.getBookTitleById(this.notification.bookToTrade)}! :)`,
                                  messageId: this.guid(),
                                  isPositive: true,
          });
          this.removeNotification({ notificationId: this.notification.tradeId});
        });
      },
      declineTrade() {
        this.sendTradeMessage({ sendTo: this.notification.requester,
                                message: `Trade rejected by ${this.getLoginUsername} for book ${this.getBookTitleById(this.notification.bookToTrade)} :(`,
                                messageId: this.guid(),
                                isPositive: false,
        });
        this.removeNotification({ notificationId: this.notification.tradeId});
      },
      getBookTitleById(bookId) {
        const book = this.getAllBooksPosted.find(item => { return item.bookId === bookId; });
        return book ? book.title : '';
      }
    },
    computed: {
      ...mapGetters([
        'getAllBooksPosted',
        'getLoginUsername',
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
