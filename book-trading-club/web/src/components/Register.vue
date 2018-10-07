<template>
<div id='container'>
  <h1 class='text-center'>register</h1>
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
         <button id = 'submitBtn' type='submit' class='btn btn-primary'>Sign Up</button>
         <router-link :to="{ path:'/' }"> Already an account? Sign in here</router-link>
       </div>
    </form>
</div>
</template>

<script>

export default {
  name: 'Register',
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
