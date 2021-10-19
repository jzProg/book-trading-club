<template functional>
  <i :class="[props.liked ? 'fas' : 'far', 'fa-heart', props.small ? 'fa-1x' : 'fa-2x']"
     @click.prevent="listeners['clicked']()"
     style="color: red; cursor: pointer">
  </i>
</template>
