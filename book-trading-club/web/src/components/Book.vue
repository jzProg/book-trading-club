<template>
  <div id = "bookContainer">
    <div id = 'bookContent'>
      <div v-show = 'copies >= 2' id = 'copiesSpan'>x{{ copies || 1 }}</div>
      <span v-if = 'isLoggedInPage()' id = 'close' @click.prevent = "deleteAction">x</span><br>
      <img :class = "'book' + bookId"
           id = "bookImg"
           :src = 'getImage()'
           alt = "book cover">
      <div>{{ title }}</div>
      <div>{{ author }} </div>
      <div v-if = "isUserLoggedIn()"
           id = "tradeBtn"
           class = "btn btn-success"
           style = "border-radius:50%; height:20%; width:14%; padding:2%; margin-top:2%"
           @click.prevent = "trade">
        <i class = "fas fa-exchange-alt"></i>
      </div>
      <div v-if = "isUserLoggedIn()"
           id = "likeBtn"
           class = "btn btn-danger"
           style = "border-radius:50%; height:20%; width:14%; padding:2%; margin-top:2%"
           @click.prevent = "like">
        <i class = "fas fa-heart"></i>
      </div>
    </div>
    <div id = "uploadedSection" v-if = "postedBy">uploaded by
      <a style = "color:deepskyblue" @click.prevent = "goToProfile">{{ postedBy }}</a>
    </div>
    <TradeModal v-if = "showTradeModal" @close="onTradeClose"></TradeModal>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import TradeModal from './modals/TradeModal.vue';

  export default {
    name: 'Book',
    props: ['bookId', 'title', 'author', 'image', 'postedBy', 'copies'],
    data() {
      return {
        showTradeModal: false,
      }
    },
    components: { TradeModal },
    methods: {
      ...mapActions([
          'deleteBook',
          'sendNotification',
      ]),
      onTradeClose(book) {
        this.showTradeModal = false;
        this.sendNotification({ trader: this.postedBy,
          requester: this.getLoginUsername,
          bookToTrade: this.bookId,
          bookToOffer: book.bookId
        });
      },
      isUserLoggedIn() {
        return localStorage.getItem('token');
      },
      like() {
        // todo implement
      },
      trade() {
        this.showTradeModal = true;
      },
      getImage() {
         return this.image || require('../assets/GenericBookCover.jpg');
      },
      deleteAction() {
        this.deleteBook({ bookId: this.bookId });
      },
      isLoggedInPage() {
        return this.$route.path === '/home';
      },
      goToProfile() {
        this.$router.push(`/profile?user=${this.postedBy}`);
      }
    },
    computed: {
      ...mapGetters([
          'getLoginUsername',
      ]),
    }
  }
</script>

<style>
  #bookContent{
    border-style: solid;
    min-height: 320px;
    padding: 5%;
    margin-top: 10%;
    margin-left: 10%;
    margin-right: 10%;
  }
  #copiesSpan {
    background-color: orange;
    color: white;
    width: 10%;
    float: left;
    border-radius: 40%;
  }
  #close {
    float:right;
    display:inline-block;
    padding:2px 5px;
    cursor:pointer;
  }
  #close:hover{
    color: red;
  }
  #uploadedSection {
    margin: 2%;
  }
  a:hover{
    text-decoration:none;
    cursor:pointer;
  }
  #bookImg {
    width: 40%;
    height: 40%;
    margin-bottom: 2%;
  }
</style>
