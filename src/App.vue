<script setup>
import { RouterView } from 'vue-router'
import SidebarMain from './components/shared/SidebarMain.vue';
import HeaderMain from './components/shared/HeaderMain.vue';
import { useStore } from 'vuex';
import { computed } from 'vue'
import { ref } from 'vue'

const store = useStore();

const isVisible = computed(() => {
  return store.state.configModule.configs.sidebarVisible;
})

// define estado inicial de login via tokenconfirmPassword
store.dispatch('authModule/updateToken');

// verifica alterações no login
const statusLogin = computed(() => {
  return store.state.authModule.isLogged
})


</script>

<template>
  <div class="box">

    <div v-if="statusLogin">
      <HeaderMain></HeaderMain>
    </div>

    <main>
      <transition>
        <div id="left" class="bottom" v-if="isVisible">
          <SidebarMain></SidebarMain>
        </div>
      </transition>
      <div class="bottom">
        <RouterView />
      </div>
    </main>
  </div>

</template>

<style lang="scss">
@import url('./assets/css/base.css');

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#left {
  flex-shrink: 0;
  /* makes sure that content is not cut off in a smaller browser window */
  float: left;
}

.column {
  height: 100%;
  /* allows both columns to span the full height of the browser window */
  display: flex;
  flex-direction: column;
  /* stacks the left and right headers above the bottom content */
}

.bottom {
  flex-grow: 1;
  /* ensures that the container will take up the full height of the parent container */
  overflow-y: auto;
  /* adds scroll to this container */
}

a {
  cursor: pointer;
}
</style>
