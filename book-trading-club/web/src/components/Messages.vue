<template>
  <div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Messages',
    computed: {
      ...mapGetters([
        'getMessages',
      ])
    },
  }
</script>

<style scoped>

</style>
