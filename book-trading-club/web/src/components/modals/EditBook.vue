<template>
  <Modal>
    <span slot = "close" id = 'closeSymbol' @click.prevent = "close"><i class="fas fa-times"></i></span><br>
    <h3 slot = "header">{{ bookInfo.title }}</h3>
    <div slot = "body">
      <p>{{ bookInfo.author }}</p>
      <book-image :image="bookInfo.image"/>
      <rating :rates="getBookRating()"/>
      <p>{{ bookInfo.subject }}</p>
      <p>{{ bookInfo.description }}</p>
      <heart :liked="bookInfo.liked" @clicked="toggleLike"/>
      <p>publisher <i style="color:blue">{{ bookInfo.publisher }}</i></p>
      <button type="button"
              @click.prevent="changeStatus(status.type)"
              v-for="status in statuses"
              :class="[status.color, { deselected: status.type !== bookInfo.category }]">
        {{ status.text }}
      </button>
      <br><br>
      <div v-if="bookInfo.category === statuses[0].type">
        <template v-if="editable">
          <input type="number" v-model="currentProgress" min="0" :max="bookInfo.pages">
          <i class="fas fa-check" style="cursor: pointer" @click.prevent="onChangeProgress"></i>
         </template>
         <span style="cursor: pointer" v-else @click.prevent="editable = true">{{ currentProgress }}</span>
          / <span style="color: green">{{ bookInfo.pages }}</span> pages
      </div>
    </div>
  </Modal>
</template>

<script>
  import  { mapGetters, mapActions } from 'vuex';
  import Modal from './GenericModalStructure.vue';
  import BookImage from "@/components/shared/BookImage";
  import Heart from '@/components/shared/Heart';
  import Rating from '@/components/shared/Rating';

  export default {
      name: 'EditBook',
      emits: ['close'],
      props: {
        bookInfo: Object
      },
      created () {
        this.currentProgress = this.bookInfo.progress;
      },
      data () {
        return {
          editable: false,
          currentProgress: 0,
          statuses: [
            { text: 'Read', type: 'Reading', color: 'btn btn-primary status' },
            { text: 'Completd', type: 'Completed', color: 'btn btn-success status'},
            { text: 'Plan', type: 'Plan to Read', color: 'btn btn-warning status'}
          ]
        }
      },
      components: { Modal, BookImage, Heart, Rating },
      methods: {
        ...mapActions([
          'updateBookStatus',
          'updateBookProgress',
          'toggleLiked'
        ]),
        getBookRating() {
          const matchingBook =  this.getRatings[this.bookInfo.bookId];
          return matchingBook ? matchingBook.rating : 0;
        },
        onChangeProgress() {
          if (this.currentProgress < 0 || this.currentProgress > this.bookInfo.pages) return;
          this.updateBookProgress({ bookId: this.bookInfo.bookId, progress: this.currentProgress });
          this.editable = false;
        },
        changeStatus(status) {
          this.updateBookStatus({ bookId: this.bookInfo.bookId, status });
        },
        toggleLike() {
          this.toggleLiked({ bookId: this.bookInfo.bookId });
        },
        close() {
          this.$emit('close');
        }
      },
      computed: {
        ...mapGetters([
          'getRatings'
        ])
      }
  }
</script>

<style scoped>
 .status {
   margin-right: 1%
 }

 .deselected {
   opacity: 0.5
 }

 input[type='number']{
    width: 50px;
  }
</style>
