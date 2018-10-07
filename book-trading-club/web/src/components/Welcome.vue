<template>
 <div>
   <h1 class = 'text-center'>{{ title }} </h1>
   <!--<button type = 'button' class = 'btn btn-primary' @click.prevent = 'showAllBooks'>All Books</button> <!-- sendName(Math.random()) -->
   <router-link :to = "{ path:'all' }"> See All Available for Trade Books</router-link>
   <Login></Login>
 </div>
</template>

<script>
  import  Login  from './Login.vue';
  import { mapActions } from 'vuex';
  import bus from "@/common/eventBus";

  export default {
    name: 'Welcome',
    data () {
      return {
        title: 'Welcome to JZ Book Club',
        stompClient : null,
        socket : null
      }
    },
    components:{
      Login
    },
    created(){
      bus.$on('login', (username) => {
        this.storeUsername(username).then(() => {
          this.$router.push('home');
        });
      });
      /* this.socket = new SockJS('http://localhost:8080/gs-guide-websocket');
       this.stompClient = Stomp.over(this.socket);
       this.stompClient.connect({}, (frame) => {
       console.log('Connected: ' + frame);
       this.subscribe('/topic/greetings', (greeting) => {
       this.title =  JSON.parse(greeting.body).content;
       //console.log(JSON.parse(greeting.body).content)
       });
       }); */

      /*  this.axios.get('http://localhost:8080/greeting').then((response) => {
       console.log(response.data);
       this.title = response.data;
       console.log(this.title);
       })*/
    },
    methods: {
      ...mapActions([
          'storeUsername',
      ]),
      showAllBooks() {
        this.$router.push('/all');
      },
      sendName(name) {
        this.stompClient.send("/app/hello", {}, JSON.stringify({'name': name}))
      }
    },
  }
</script>

<style scoped>
</style>
