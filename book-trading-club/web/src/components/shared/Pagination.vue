<template>
  <div>
    <span class="navArrow" @click.prevent="$emit('prev')" :disabled="!hasPrev()">
      <i class="fas fa-caret-left fa-3x"/>
    </span>
    <span class="navArrow" @click.prevent="$emit('next')" :disabled="!hasNext()">
      <i class="fas fa-caret-right fa-3x" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  emits: ['next', 'prev'],
  props: {
    page: Number,
    pageLimit: Number,
    listSize: Number
  },
  methods: {
    hasPrev() {
      return this.page > 1;
    },
    hasNext() {
      return this.page * this.pageLimit < this.listSize;
    },
  }
}
</script>

<style scoped>
  .navArrow {
    cursor: pointer;
    font-weight: bold;
  }

  span[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
