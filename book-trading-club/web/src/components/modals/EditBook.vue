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
         {{ bookInfo.progress }} / <span style="color: green">{{ bookInfo.pages }}</span> pages
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
      data () {
        return {
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
          'updateBookStatus'
        ]),
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
</style>
