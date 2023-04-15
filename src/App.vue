<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/deals">Deals</RouterLink>
        <RouterLink to="/documents">Documents</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  margin: 24px;
  display: flex;
  gap: 24px
}
</style>
