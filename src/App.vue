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
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'
import GeneralLoading from './components/shared/GeneralLoading.vue'
import HeaderMain from './components/shared/HeaderMain.vue'
import jwt_decode from "jwt-decode"
import SidebarMain from './components/shared/SidebarMain.vue'

const storedToken = localStorage.getItem('token')

const store = useStore()

const params = (new URL(window.location)).searchParams
const jwtGoogle = params.get('jwt')

if (jwtGoogle) {
  const { email, exp } = jwt_decode(jwtGoogle);
  store.dispatch('authModule/logIn', { email, exp, token: jwtGoogle });
} else if (storedToken) {
  const token = JSON.parse(storedToken)
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
