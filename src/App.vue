<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div>
   

    <div class="">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>

  </div>

  <RouterView />
</template>

<style>

</style>
