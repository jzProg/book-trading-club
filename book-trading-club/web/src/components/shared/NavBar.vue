<template>
  <div class="NavHeader">
    <h3 id="logoDiv" @click.prevent="$emit('navigateToHome')">
        <b><span style="color: rgb(46, 109, 164)">B</span>ook <span style="color: rgb(46, 109, 164)">T</span>rack</b>
    </h3>
    <div class="container" v-if="username && isHome">
     <div class="row">
       <div :class="['col-md-4 categoryItem', { selected: category.name === getSelectedCategory }]"
            @click.prevent="$emit('categorySelected', category)"
            v-for="(category, index) in categories">
         <h3><i :class="category.icon"></i> <b>{{ category.name }}</b></h3><br>
       </div>
     </div>
    </div>
    <div id="profileDiv" v-if="username && isHome">
      <i class="fas fa-user-circle fa-5x" v-if="$route.meta.hasProfileHeader"></i>
      <h4 style="margin-left: 2%; color: white">
        <b>{{ username }}</b>
      </h4>
    </div>
    <div v-if="username" style="margin: 1%">
      <button class="btn btn-danger" @click.prevent="$emit('logout')">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import urlAuthMixin from '@/common/helpers/urlAuth';
import { mapGetters } from 'vuex';

export default {
  name: 'nav-bar',
  emits: ['categorySelected', 'navigateToHome', 'logout'],
  mixins: [urlAuthMixin],
  props: {
    categories: Array,
    username: String
  },
  computed: {
    ...mapGetters([
      'getSelectedCategory'
    ]),
  }
}
</script>

<style>
  .NavHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: black;
    align-content: space-between;
    margin-bottom: 2%;
  }

  .categoryItem {
   color: gray;
   cursor: pointer;
   flex: 1;
  }

  .categoryItem:hover {
     color: white;
  }

  .selected {
     color: white;
  }

  #logoDiv {
   color: white;
   cursor: pointer;
   margin-left: 2%;
   flex: 1;
  }

  #profileDiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: rgb(51, 122, 183);
  }
</style>
