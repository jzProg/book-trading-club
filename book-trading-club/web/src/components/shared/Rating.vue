<template>
  <div>
    <i v-for="index in 5" :class="[index > rating ? 'far' : 'fas', 'fa-star']" style="color: #FFD700"></i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'rating',
  props: {
    rates: Number
  },
  computed: {
    ...mapGetters([
      'getNumberOfUsers'
    ]),
    rating() {
      return this.rates / this.getNumberOfUsers * 5;
    }
  }
}
</script>
