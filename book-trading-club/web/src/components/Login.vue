<template>
  <div id='container'>
    <form>
        <div class='form-group'>
          <label for="mail">Email: </label>
          <input id = 'mail'type='email' class='form-control' placeholder='enter mail here'></input>
        </div>
        <div class='form-group'>
          <label for="pass">Password: </label>
          <input id = 'pass' type='password' class='form-control' placeholder='enter password here'></input>
        </div>
        <div id='buttonDiv'>
         <button id = 'submitBtn' type='submit' class='btn btn-primary'>Sign In</button>
         <router-link :to="{ path:'register' }"> Not registered? Sign up here</router-link>
       </div>
    </form>
  </div>
</template>

<script>


export default {
  name: 'Login',
  data () {
    return {

    }
  }
}
</script>

<style scoped>

#container{
  padding-left:30%;
  padding-right:30%;
  margin-top:5%;
}

#submitBtn{
  margin-right:2%;
}

#buttonDiv{
  margin-top:4%;
}
</style>
