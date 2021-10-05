<template>
  <Modal>
    <span slot = "close" id = 'closeSymbol' @click.prevent = "close">x</span><br>
    <h3 slot = "header">{{ username }}</h3>
    <div slot = "body">
      <button class="btn btn-primary" type = "button" @click.prevent = "changeImage">Change Image</button><br><br>
      <button class="btn btn-danger" type = "button" @click.prevent="logout">Logout</button>
    </div>
  </Modal>
</template>

<script>
  import Modal from './GenericModalStructure.vue';

  export default {
      name: 'ProfileModal',
      emits: ['logout', 'close'],
      props: {
        username: String
      },
      components: { Modal },
      methods: {
        changeImage() {
          // todo implement
        },
        close() {
          this.$emit('close');
        },
        logout() {
          this.$emit('logout');
        },
      },
  }
</script>
