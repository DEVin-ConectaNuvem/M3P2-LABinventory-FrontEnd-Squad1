<template>


  <aside class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">

    <span class="fs-4">DEVInventary</span>

    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      Geral
      <li class="nav-item">
        <RouterLink to="/" class="nav-link">
          <i class="fa-solid fa-house-chimney"></i>
          Inventário
        </RouterLink>
      </li>
      <hr>
      Colaboradores
      <li>
        <RouterLink to="/about" class="nav-link">
          <i class="fa-solid fa-user-tie"></i>
          Cadastrar
        </RouterLink>
        <RouterLink to="/" class="nav-link">
          <i class="fa-solid fa-address-book"></i>
          Listar
        </RouterLink>
      </li>
      <hr>
      Produtos
      <li>
        <RouterLink to="/" class="nav-link">
          <i class="fa-solid fa-circle-plus"></i>
          Cadastrar
        </RouterLink>
        <RouterLink to="/" class="nav-link">
          <i class="fa-solid fa-address-book"></i>
          Empréstimo
        </RouterLink>
      </li>
    </ul>
    <hr>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked>
      <label class="form-check-label" for="flexSwitchCheckDefault">Mostrar</label>
    </div>
  </aside>

</template>

<script setup>
import { RouterLink } from 'vue-router'


</script>

<style lang="scss" scoped>
aside {
  top: 0;
  left: 0;
  height: 100vh;
  color: #fff;
  overflow-y: auto;
  z-index: 1;
  width: 200px;
}

.form-check {
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: rgb(190, 221, 229)
}

a:hover {
  text-decoration: none;
  background: #373B44;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4286f4, #373B44);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4286f4, #373B44);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  color: #fff;
}
</style>