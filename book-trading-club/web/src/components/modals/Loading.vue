<template>
  <div id="loading-container">
    <i class = "fas fa-book fa-10x rotate mask spin_img"
       style = "color:green">
    </i>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>

.spin_img{
  width:100px;
  height:100px;
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;

}
#loading-container{
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.rotate {
  animation: rotation 1s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);

  }
  to {
    transform: rotate(359deg);
  }
}
</style>
