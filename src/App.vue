<script setup>
import { RouterView } from 'vue-router'
import SidebarMain from './components/shared/SidebarMain.vue';
import HeaderMain from './components/shared/HeaderMain.vue';
import { useStore } from 'vuex';
import { computed } from 'vue'
import { ref } from 'vue'

const isVisible = ref(localStorage.getItem('isVisible') === 'true');



const store = useStore();

// define estado inicial de login via tokenconfirmPassword
store.dispatch('authModule/updateToken');

// verifica alterações no login
const statusLogin = computed(() => {
  return store.state.authModule.isLogged
})


</script>

<template>
  <div class="box">
    <transition>
      <div v-if="statusLogin">
        <HeaderMain></HeaderMain>
      </div>
    </transition>
    <main>
      <div id="left" class="bottom" :class="isVisible ? 'isVisible' : ''">
        <SidebarMain></SidebarMain>
      </div>
      <div class="bottom">
        <RouterView />
      </div>
    </main>
  </div>

</template>

<style lang="scss">
@import url('./assets/css/base.css');

.isVisible {
  width: 5rem;
  margin: 0;

  a {
    padding: 0.6rem;
    text-align: center;
    margin-bottom: 0.2rem;

    i {
      text-align: center;
    }
  }

  span {
    display: none;
  }

  .toggleIcon {
    transform: rotate(180deg);
    text-align: center;
  }

  img {
    width: 2rem;
  }

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
