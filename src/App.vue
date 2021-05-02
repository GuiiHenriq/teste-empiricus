<template>
  <div id="app">
    <Header />
    
    <div id="content">
      <div id="grid">
        <div class="container">
          <transition mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style lang="scss">
/* ============= Imports ============= */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import '@/style/global.scss';

body {
  background: $black;
  color: $white;
}
</style>
