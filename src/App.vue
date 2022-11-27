<template>
  <general-loading class="loading"></general-loading>
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

<script setup>
import GeneralLoading from './components/shared/GeneralLoading.vue'
import { RouterView } from 'vue-router'
import SidebarMain from './components/shared/SidebarMain.vue'
import HeaderMain from './components/shared/HeaderMain.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const storedToken = localStorage.getItem('token')
const store = useStore()

if (storedToken) {
  let token = JSON.parse(storedToken)
  const exp = token['exp']
  const now = new Date().getTime() / 1000
  if (exp > now) {
    store.dispatch('authModule/logIn', token)
  } else {
    store.dispatch('authModule/logOut')
  }
} else {
  store.dispatch('authModule/logOut')
}

const isVisible = computed(() => {
  return store.state.configModule.configs.sidebarVisible
})

const statusLogin = computed(() => {
  return store.state.authModule.isLogged
})
</script>

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
  float: left;
}

.column {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bottom {
  flex-grow: 1;
  overflow-y: auto;
}

a {
  cursor: pointer;
}
</style>
