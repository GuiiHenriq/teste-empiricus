<template>
  <header class="header pt-3 pb-3">
    <div class="container text-center">
      <router-link class="header__link text-white mb-0" to="/" title="Go to Homepage">
        Teste Técnico - Empiricus
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="scss">
/* ============= Imports ============= */
@import '@/style/global.scss';

.header {
  background: $green;
}
</style>