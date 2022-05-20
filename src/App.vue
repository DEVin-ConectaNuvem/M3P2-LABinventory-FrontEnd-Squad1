<script setup>
import { RouterView } from 'vue-router'
import SidebarMain from './components/shared/SidebarMain.vue';
import HeaderMain from './components/shared/HeaderMain.vue';
import { useStore } from 'vuex';
import { computed } from 'vue'

const store = useStore();

// define estado inicial de login via token
store.dispatch('authModule/updateToken');



// verifica alterações no login
const statusLogin = computed(() => {
  return store.state.authModule.isLogged
})

</script>

<template>
  <div>
    <transition>
      <div v-if="statusLogin">
        <SidebarMain class="leftSide"></SidebarMain>
        <HeaderMain></HeaderMain>
      </div>
    </transition>
    <main>
      <RouterView />
    </main>
  </div>

</template>

<style>
@import url('./assets/css/base.css');

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

a {
  cursor: pointer;
}

.leftSide {
  float: left;

}
</style>
