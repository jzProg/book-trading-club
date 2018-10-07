<template>
 <div>
   <h1 class='text-center'>{{ title }} </h1>
   <button type='button' @click='sendName(Math.random())'>send name</button>
   <Login></Login>
 </div>
</template>

<script>
import  Login  from './Login.vue'

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
  created: function(){
    var self = this;
    this.socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        this.subscribe('/topic/greetings', function (greeting) {
          self.title =  JSON.parse(greeting.body).content;
          //console.log(JSON.parse(greeting.body).content)
        });
    });

  /*  this.axios.get('http://localhost:8080/greeting').then((response) => {
  console.log(response.data);
   this.title = response.data;
   console.log(this.title);
})*/
  },
  methods : {
    sendName(name) {
    this.stompClient.send("/app/hello", {}, JSON.stringify({'name': name}))
}
  }
}
</script>

<style scoped>
</style>
