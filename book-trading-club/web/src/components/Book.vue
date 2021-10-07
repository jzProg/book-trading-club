<template>
  <div id="bookContainer" @click.prevent="$emit('selectBook', bookId)">
    <div id='bookContent'>
      <span v-if='isLoggedInPage()' id='close' @click.prevent="deleteAction">x</span><br>
      <img :class="'book' + bookId"
           id="bookImg"
           :src='getImage()'
           @load="getAlternativeImage($event)"
           alt="book cover">
      <div><b>{{ title }}</b></div>
      <div><i>{{ author }}</i></div>
      <div style="color: green">{{ publishYear }}</div>
      <div v-if="isUserLoggedIn()"
           id="likeBtn"
           class="btn btn-danger"
           style="border-radius:50%; height:20%; width:14%; padding:2%; margin-top:2%"
           @click.prevent="like">
        <i class="fas fa-heart"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import uniqueIdGeneratorMixin from '@/common/helpers/uniqueIdsGenerator';
  import urlAuthMixin from "@/common/helpers/urlAuth";

  export default {
    name: 'Book',
    props: ['bookId', 'title', 'author', 'image', 'publishYear'],
    mixins: [uniqueIdGeneratorMixin, urlAuthMixin],
    methods: {
      ...mapActions([
          'deleteBook'
      ]),
      isUserLoggedIn() {
        return localStorage.getItem('token');
      },
      like() {
        // todo implement
      },
      getImage() {
         return this.image || require('@/assets/GenericBookCover.jpg');
      },
      getAlternativeImage (event) {
        if (event.target.naturalWidth === 1 || event.target.naturalHeight === 1) {
            event.target.src = require('@/assets/GenericBookCover.jpg');
        }
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
  #bookContent:hover{
    border-color: gray;
    cursor:pointer;
  }
  #bookImg {
    width: 40%;
    height: 40%;
    margin-bottom: 2%;
  }
</style>
