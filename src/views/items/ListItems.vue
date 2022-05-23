<template>
  <div class="container">
    <div class="row height d-flex justify-content-center align-items-center">
      <div class="form">
        <i class="fa fa-search"></i>
        <input
          type="text"
          class="form-control form-input"
          placeholder="Digite o código de patrimonio do item"
        />
        <span class="left-pan d-none d-md-block">Buscar item</span>
      </div>
    </div>
    <hr />
    <h4>Lista de Items</h4>

    <paginate
      v-model="page"
      :page-count="totalPages"
      :page-range="3"
      :margin-pages="2"
      :prev-text="'Voltar'"
      :next-text="'Avançar'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
    
    <div class=" row   d-flex text-center flex-wrap gap-2 ">
    <div class="card ms-3 ">
      <img class="card-img-top" src="../../assets/icons/account-avatar-profile-user-13-svgrepo-com.svg" height="80" alt="">
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Body</p>
      </div>
    </div>
    </div>
    <!-- <p class="text-danger" v-show="collaborators.length === 0 && inputSearch">
      Não há colaboradores cadastrados com este <strong>nome</strong> - <router-link :to="{name: 'colaboradores'}">Realizar novo cadastro</router-link> 
    </p>
    <p class="text-danger" v-show="collaborators.length === 0 && !inputSearch">
      Não há colaboradores cadastrados - <router-link :to="{name: 'colaboradores'}">Realizar novo cadastro</router-link> 
    </p> -->
  </div>
</template>

<script setup>
import Paginate from "vuejs-paginate-next";
import { RouterLink, useRouter } from "vue-router";

/* import { ref, computed } from "vue";
import { useStore } from "vuex";




const router = useRouter();

const store = useStore();
const inputSearch = ref("");
store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");
const page = ref(1);
const perPage = ref(5);

const totalPages = computed(() => {
  if (inputSearch.value) {
    return Math.ceil(
      store.state.collaboratorModule.collaborators.filter((collaborator) =>
        collaborator.name
          .toLowerCase()
          .includes(inputSearch.value.toLowerCase())
      ).length / perPage.value
    );
  } else {
    return Math.ceil(
      store.state.collaboratorModule.collaborators.length / perPage.value
    );
  }
});

const collaborators = computed(() => {
  if (inputSearch.value) {
    let total = store.state.collaboratorModule.collaborators.filter(
      (collaborator) =>
        collaborator.name
          .toLowerCase()
          .includes(inputSearch.value.toLowerCase())
    );
    total = total.slice(
      (page.value - 1) * perPage.value,
      page.value * perPage.value
    );
    console.log(total);
    return total;
  } else {
    return store.state.collaboratorModule.collaborators.slice(
      (page.value - 1) * perPage.value,
      page.value * perPage.value
    );
  }
});

function editCollab(id) {
  console.log(id)
  router.push({ name: 'colaboradores', params:{userId: id} });
} */
</script>


<style lang="scss" scoped>

.card{
    margin-bottom: 10px;
    padding: 20px;
    width: 200px;
    height: 200px;
}

.card-main {
  width: 15rem;
  height: 10rem;
  border: 2px solid red;
  background-color: var(--color-dark);
}

.imgAccordion {
  border-radius: 50%;
  width: 3rem;
}

.nameCollab {
  color: var(--color-secondary);
}

.form {
  position: relative;
}

.form .fa-search {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #9ca3af;
}

.form span {
  position: absolute;
  right: 17px;
  top: 13px;
  padding: 2px;
  border-left: 1px solid #d1d5db;
}

.left-pan {
  padding-left: 7px;
}

.left-pan {
  color: var(--color-secondary);
}

.form-input {
  height: 55px;
  text-indent: 33px;
  border-radius: 10px;
}

.form-input:focus {
  border: 1px solid var(--color-secondary);
}
</style>