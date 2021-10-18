<template>
  <Modal>
    <span slot = "close" id = 'closeSymbol' @click.prevent = "close">x</span><br>
    <h3 slot = "header">{{ bookInfo.title }}</h3>
    <div slot = "body">
      <p>{{ bookInfo.author }}</p>
      <book-image :image="bookInfo.image"/>
      <p>{{ bookInfo.subject }}</p>
      <p>{{ bookInfo.description }}</p>
      <p>publisher <i>{{ bookInfo.publisher }}</i></p>
      <button type="button"
              @click.prevent="changeStatus(status.type)"
              v-for="status in statuses"
              :class="[status.color, { deselected: status.type !== bookInfo.category }]">
        {{ status.text }}
      </button>
      <br><br>
      <div v-if="bookInfo.category === statuses[0].type">
        <template v-if="editable">
          <input type="number" v-model="currentProgress">
          <i class="fas fa-check" style="cursor: pointer" @click.prevent="onChangeProgress"></i>
         </template>
         <span style="cursor: pointer" v-else @click.prevent="editable = true">{{ currentProgress }}</span>
          / <span style="color: green">{{ bookInfo.pages }}</span> pages
      </div>
    </div>
  </Modal>
</template>

<script>
  import  { mapActions } from 'vuex';
  import Modal from './GenericModalStructure.vue';
  import BookImage from "@/components/shared/BookImage";

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
      components: { Modal, BookImage },
      methods: {
        ...mapActions([
          'updateBookStatus',
          'updateBookProgress'
        ]),
        onChangeProgress() {
          this.updateBookProgress({ bookId: this.bookInfo.bookId, progress: this.currentProgress });
          this.editable = false;
        },
        changeStatus(status) {
          this.updateBookStatus({ bookId: this.bookInfo.bookId, status });
        },
        close() {
          this.$emit('close');
        }
      },
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
    width: 40px;
  }
</style>
