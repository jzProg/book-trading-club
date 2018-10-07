<template>


<div id='bookListContent' class="container">
  <div class="row">
    <Book v-for='(id,index) in ids' class="col-md-4" key=index>
    </Book>
  </div>

</div>


</template>


<script>
import Book from './Book.vue'

export default{
  name:'BookList',
  data(){
    return {
      ids : [1,2,3,4]
    }
  },
  components:{
    Book
  }

}


</script>

<style>

</style>
