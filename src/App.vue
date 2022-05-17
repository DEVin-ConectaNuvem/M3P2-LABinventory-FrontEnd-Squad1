<script setup>
import { RouterView } from 'vue-router'
import SidebarMain from './components/shared/SidebarMain.vue';
import HeaderMain from './components/shared/HeaderMain.vue';
</script>

<template>
  <div>

      <SidebarMain class="leftSide"></SidebarMain>
      <HeaderMain></HeaderMain>

    <main>
      <RouterView/>
    </main>


  </div>


</template>

<style>

.leftSide {
    float:left;
}

</style>
