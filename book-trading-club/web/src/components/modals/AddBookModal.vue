<template>
  <Modal>
    <span slot = "close" id = 'closeSymbol' @click.prevent = "close">x</span><br>
    <h3 slot = "header">Add New Book</h3>
    <div slot = "body">
      <label>Title: </label><br>
      <input type = "text" v-model = "enteredTitle">
      <label>Author: </label><br>
      <input type = "text" v-model = "enteredAuthor"><br>
      <button type = "button"
              class = "btn btn-primary"
              style = "margin-top: 5%; margin-bottom:5%;"
              @click.prevent = "searchForBook">
        Search
      </button>
      <SuggestionsModal v-if = "showSuggestions"
                        :suggestions = "suggestions"
                        @close = "setChosenBook">
      </SuggestionsModal>
      <div slot = "footer">
        <span v-if = "successfullAddition" style = "color: green">
          <i class = "fas fa-check"></i> Book added!
        </span>
        <button class = "modal-default-button" @click.prevent = "sendInfo">OK</button>
      </div>
    </div>
</Modal>
</template>

<script>
import Modal from './GenericModalStructure.vue';
import SuggestionsModal from './SuggestionsModal.vue';

export default {
   name: 'AddBookModal',
   components: { Modal, SuggestionsModal },
   data() {
       return {
           enteredTitle: '',
           enteredAuthor: '',
           showSuggestions: false,
           suggestions: [],
           chosenBook: {},
           successfullAddition: false,
       }
   },
   methods: {
     setChosenBook(res) {
       this.choosenBook = res;
       if (res && Object.keys(res).length) this.successfullAddition = true;
       else this.successfullAddition = false;
       this.showSuggestions = false;
     },
     searchForBook() {
       this.axios.get(`http://openlibrary.org/search.json?title=${this.enteredTitle}&author=${this.enteredAuthor}`).then((response)=>{
           this.suggestions = response.data.docs.slice(0, 4);
           this.showSuggestions = true;
       });
     },
     close() {
       this.$emit('close');
     },
     sendInfo() {
       this.$emit('close', this.choosenBook);
     },
   }
}
</script>


