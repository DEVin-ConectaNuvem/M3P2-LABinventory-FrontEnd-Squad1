<template>
  <aside>
    <div class="d-flex flex-column flex-shrink-0 text-white">
      <div class="brand mx-auto mb-1">
        <img
          src="../../assets/icons/logoInventary.svg"
          class="mx-auto"
          alt="DEVInventary"
        />
      </div>
      <span class="fs-4 text-white mx-auto mt-2">DEVInventary</span>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <span>Geral</span>
        <li class="nav-item">
          <RouterLink to="/" @click="toggleVisibility" class="nav-link">
            <i class="fa-solid fa-house-chimney"></i>
            <span> Inventário</span>
          </RouterLink>
        </li>
        <hr />
        <span>Colaboradores</span>
        <li>
          <RouterLink
            to="/colaboradores"
            @click="toggleVisibility"
            class="nav-link"
          >
            <i class="fa-solid fa-user-tie"></i>
            <span> Cadastrar</span>
          </RouterLink>
          <RouterLink
            to="/lista-colaboradores"
            @click="toggleVisibility"
            class="nav-link"
          >
            <i class="fa-solid fa-address-book"></i>
            <span> Listar</span>
          </RouterLink>
        </li>
        <hr />
        <span>Produtos</span>
        <li>
          <RouterLink to="/itens" @click="toggleVisibility" class="nav-link">
            <i class="fa-solid fa-circle-plus"></i>
            <span> Cadastrar</span>
          </RouterLink>
          <RouterLink
            to="/lista-itens"
            @click="toggleVisibility"
            class="nav-link"
          >
            <i class="fa-solid fa-address-book"></i>
            <span> Empréstimo</span>
          </RouterLink>
        </li>
      </ul>
      <hr />
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.commit("configModule/UPDATE_CONFIGS_LOCAL_STORAGE");

const isVisible = computed(() => {
  return store.state.configModule.configs.sidebarVisible;
});

function toggleVisibility() {
  if (window.screen.width < 768) {
    store.dispatch("configModule/toggleSidebar");
  }
}
</script>

<style lang="scss" scoped>
aside {
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  color: var(--color-white);
  overflow-y: none;
  z-index: 500;
  width: 200px;
  background-color: var(--color-dark);

  span {
    padding-left: 10px;
  }
  i {
    font-size: 1.2rem;
    cursor: pointer;
    padding-left: 10px;
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
  background: var(--color-medium);
  color: var(--color-white);
  border-right: 10px solid var(--color-primary);
  transition: all 0.3s ease;
}

// Medium devices (tablets, 768px and up)
@media (max-width: 768px) {
  aside {
    width: 100vw;
    position: fixed;
  }
}
</style>
