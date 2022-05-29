<template>
  <aside v-if="isVisible" class="animate__animated animate__fadeInLeft">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white">
      <div class="brand mx-auto mb-1">
        <img src="../../assets/icons/logoInventary.svg" class="mx-auto " alt="DEVInventary">
      </div>
      <span class="fs-4 text-white mx-auto mt-2">DEVInventary</span>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <span>Geral</span>
        <li class="nav-item">
          <RouterLink to="/" class="nav-link">
            <i class="fa-solid fa-house-chimney"></i>
            <span> Inventário</span>
          </RouterLink>
        </li>
        <hr>
        <span>Colaboradores</span>
        <li>
          <RouterLink to="/colaboradores" class="nav-link">
            <i class="fa-solid fa-user-tie"></i>
            <span> Cadastrar</span>
          </RouterLink>
          <RouterLink to="/lista-colaboradores" class="nav-link">
            <i class="fa-solid fa-address-book"></i>
            <span> Listar</span>
          </RouterLink>
        </li>
        <hr>
        <span>Produtos</span>
        <li>
          <RouterLink to="/itens" class="nav-link">
            <i class="fa-solid fa-circle-plus"></i>
            <span> Cadastrar</span>
          </RouterLink>
          <RouterLink to="/lista-itens" class="nav-link">
            <i class="fa-solid fa-address-book"></i>
            <span> Empréstimo</span>
          </RouterLink>
        </li>
      </ul>
      <hr>
    </div>
  </aside>

</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore();

store.commit('configModule/UPDATE_CONFIGS_LOCAL_STORAGE')

const isVisible = computed(() => {
  return store.state.configModule.configs.sidebarVisible;
})

</script>

<style lang="scss" scoped>
aside {
  top: 0;
  left: 0;
  height: 100vh;
  color: var(--color-white);
  overflow-y: auto;
  z-index: 1;
  width: 200px;
  background-color: var(--color-dark);
  transition: all 1s ease-in-out;



  i {
    font-size: 1.5rem;
  }

  .toggleIcon {
    text-align: end;

    i {
      cursor: pointer;
    }
  }
}

.form-check {
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: var(--color-grey);
}

a:hover,
.router-link-exact-active {
  text-decoration: none;
  background: var(--color-secondary);
  background: -webkit-linear-gradient(to right, var(--color-secondary), #373B44);
  background: linear-gradient(to right, var(--color-secondary), #373B44);
  color: var(--color-white);
  border-right: 2px solid var(--color-primary);
}
</style>