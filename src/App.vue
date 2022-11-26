<script setup>
import { RouterView } from 'vue-router'
import SidebarMain from './components/shared/SidebarMain.vue'
import HeaderMain from './components/shared/HeaderMain.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const token = localStorage.getItem('token')

function checkIsParsed(json) {
  try {
    JSON.parse(json)
    return true
  } catch (e) {
    return false
  }
}
if (token && checkIsParsed(token)) {
  const tokenPased = JSON.parse(token)
  const exp = tokenPased.exp
  const now = new Date().getTime() / 1000
  if (exp > now) {
    const store = useStore()
    store.dispatch('authModule/logIn', tokenPased)
  } else {
    localStorage.removeItem('token')
  }
} else {
  localStorage.removeItem('token')
}
const store = useStore()
const isVisible = computed(() => {
  return store.state.configModule.configs.sidebarVisible
})

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
