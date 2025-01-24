<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IconLogo from './components/icons/IconLogo.vue';
</script>

<template>
  <header
    class="d-flex justify-content-between bg-dark border border-bottom border-dark p-3 align-items-baseline"
  >
    <h1><IconLogo/></h1>
    <nav class="d-flex justify-content-between">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
    </nav>
  </header>
  <div class = "router">
    <RouterView />
  </div>
</template>

<style scoped>
header{
  margin-bottom: 20px;
}
.router{
  padding: 20px;
}

.nav-link {
  margin-left: 10px;
  font-size: larger;
  margin-right: 10px;
}

</style>
