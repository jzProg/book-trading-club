<template>
  <Modal>
    <span slot = "close" id = 'closeSymbol' @click.prevent = "close">x</span><br>
    <h3 slot = "header">Choose A Book To Trade</h3>
    <div slot = "body">
      <div v-for="(book, index) in getFilteredBooks">
        <a @click.prevent = 'chooseBook(index)'>
          <img style = "width: 20px;height: 20px" :src = "book.image">
        </a>
      </div>
    </div>
  </Modal>
</template>

<script>
  import Modal from './GenericModalStructure.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'TradeModal',
    components: { Modal },
    methods: {
      chooseBook(index) {
        this.$emit('close', this.getFilteredBooks[index]);
      },
      close() {
        this.$emit('close');
      },
    },
    computed: {
      getFilteredBooks() {
        return this.getAllBooksPosted.filter((book) => { return book.postedBy === this.getLoginUsername; });
      },
      ...mapGetters([
          'getAllBooksPosted',
          'getLoginUsername',
      ]),
    }
  }
</script>
