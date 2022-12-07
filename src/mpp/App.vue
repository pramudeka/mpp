<script>
// import { RouterView } from 'vue-router'
import HomeView from './view/Home.vue'
import LayananView from './view/Layanan.vue'
import NotFoundView from './view/NotFound.vue'

const routes = {
  '/': HomeView,
  '/layanan': LayananView,
  '/redirect/link':HomeView
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFoundView
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>
<template>
    <!-- <RouterView/> -->
    <component :is="currentView" />
</template>
