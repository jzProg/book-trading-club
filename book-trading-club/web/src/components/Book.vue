<template>
  <div id="bookContainer" @click.prevent="$emit('selectBook', bookId)">
    <div id='bookContent'>
      <span v-if='isLoggedInPage()' id='close' @click.prevent="deleteAction"><i class="fas fa-times"></i></span><br>
      <book-image :image="image"/>
      <div><b>{{ title }}</b></div>
      <div><i>{{ author }}</i></div>
      <div style="color: green">{{ publishYear }}</div>
      <div v-if="isUserLoggedIn()"
           id="likeBtn"
           disabled
           class="btn btn-danger"
           style="border-radius:50%; height:20%; width:14%; padding:2%; margin-top:2%"
           @click.prevent="like">
        <i class="fas fa-heart"></i>
      </div>
      <template v-if="category === 'Reading'">
        <book-progress :progress="parseInt(progress)" :total="parseInt(totalPages)"/>
        <div style="font-size: x-small; float: right">{{ progress }}/{{ totalPages }} pgs</div>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import uniqueIdGeneratorMixin from '@/common/helpers/uniqueIdsGenerator';
  import urlAuthMixin from "@/common/helpers/urlAuth";
  import BookImage from "@/components/shared/BookImage";
  import BookProgress from "@/components/shared/ProgressBar";

  export default {
    name: 'Book',
    props: ['bookId', 'title', 'author', 'image', 'category', 'publishYear', 'progress', 'totalPages'],
    components: {
      BookImage,
      BookProgress
    },
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
  #bookContainer {
    max-height: 356px;
  }
  #bookContent{
    border-radius: 15px;
    border-style: solid;
    min-height: 320px;
    max-height: 320px;
    padding: 1%;
    margin-bottom: 10%;
    margin-left: 10%;
    margin-right: 10%;
    cursor:pointer;
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
</style>
