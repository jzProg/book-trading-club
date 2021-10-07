<template>
  <div>
    <span class="navArrow" @click.prevent="$emit('prev')" :disabled="!hasPrev">
      <i class="fas fa-caret-left fa-3x"/>
    </span>
    <span class="navArrow" @click.prevent="$emit('next')" :disabled="!hasNext">
      <i class="fas fa-caret-right fa-3x" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  emits: ['next', 'prev'],
  props: {
    hasNext: Boolean,
    hasPrev: Boolean
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
