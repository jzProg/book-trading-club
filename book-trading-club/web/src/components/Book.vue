<template>

<div id='bookContent'>
  {{id}},{{title}},{{author}}
</div>



</template>


<script>

export default {
 name : 'Book',
 data(){
   return{
     id : 1,
     title: 'testBook',
     author: 'someAuthor'
   }
 }
}

</script>

<style>
#bookContent{
  border-style: solid;
}
</style>
