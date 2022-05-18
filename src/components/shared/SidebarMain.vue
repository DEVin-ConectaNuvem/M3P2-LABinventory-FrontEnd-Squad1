<template>
  <aside :class="isVisible ? 'isVisible' : ''">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white">
      <div class="brand">
        <img src="../../assets/icons/logoInventary.svg" alt="DEVInventary">
        <span class="fs-4">DEVInventary</span>
      </div>
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
        <span> Colaboradores</span>
        <li>
          <RouterLink to="/login" class="nav-link">
            <i class="fa-solid fa-user-tie"></i>
            <span> Cadastrar</span>
          </RouterLink>
          <RouterLink to="/users/listar" class="nav-link">
            <i class="fa-solid fa-address-book"></i>
            <span> Listar</span>
          </RouterLink>
        </li>
        <hr>
        <span>Produtos</span>
        <li>
          <RouterLink to="/produtos/cadastro" class="nav-link">
            <i class="fa-solid fa-circle-plus"></i>
            <span> Cadastrar</span>
          </RouterLink>
          <RouterLink to="/produtos/emprestimo" class="nav-link">
            <i class="fa-solid fa-address-book"></i>
            <span> Empréstimo</span>
          </RouterLink>
        </li>
      </ul>
      <hr>
      <div class="toggleIcon">
        <i class="fa-solid fa-angles-left text-end" @click="toggleVisibility"></i>
      </div>
    </div>
  </aside>

</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isVisible = ref(localStorage.getItem('isVisible') === 'true');

function toggleVisibility() {
  isVisible.value = !isVisible.value;
  localStorage.setItem('isVisible', isVisible.value);
}

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
  transition: 0.2s ease-out;

  .brand {
    margin: 0 auto;
    text-align: center;
  }

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