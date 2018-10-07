<template>
  <Modal>
    <span slot = "close" id = 'closeSymbol' @click.prevent = "close">x</span><br>
    <h3 v-if="suggestions.length" slot = "header">Choose A book</h3>
    <h3 v-else slot = "header">Bad Search</h3>
    <div slot = "body" style = "max-height: 500px;overflow-y: auto">
      <div v-if="suggestions.length">
        <div v-for = "(book, index) in suggestions"
             @click.prevent="chooseBook(index)"
             :class = "[ getClass(index) ]"
             style = "margin-top:5%;border-style: solid;padding: 2%;cursor: pointer;">
          <img v-if = "book.isbn" :src = "`http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg`"><br>
          <label>{{ book.title }}</label><br>
          <label>{{ book.author_name[0] }}</label>
        </div>
      </div>
      <div v-else>
        No results :(
      </div>
    </div>
    <div slot = "footer">
      <button class = "modal-default-button" @click.prevent = "sendInfo">OK</button>
    </div>
  </Modal>
</template>

<script>
  import Modal from './GenericModalStructure.vue';

  export default {
    name: 'SuggestionsModal',
    components: { Modal },
    props: ['suggestions'],
    data() {
      return {
        chosenSuggestion: {},
        selectedIndex: -1,
      }
    },
    methods: {
      getClass(index) {
        return this.selectedIndex === index ? 'selected' : ''
      },
      chooseBook(index) {
        this.chosenSuggestion = this.suggestions[index];
        this.selectedIndex = index;
      },
      close() {
        this.$emit('close');
      },
      sendInfo() {
        this.$emit('close', this.chosenSuggestion);
      },
    }
  }
</script>

<style scoped>
  .selected {
    border-color: green;
  }
</style>
