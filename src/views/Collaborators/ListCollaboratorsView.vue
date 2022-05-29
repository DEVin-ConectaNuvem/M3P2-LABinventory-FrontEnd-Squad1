<template>
  <div class="container mt-3 ">
      <div class="content input-group">
            <input type="text" class="w-75 form-control animate__animated animate__flipInX"
                placeholder="✍️ Buscar colabodorador..." v-model="inputSearch">
            <select class="badge bg-dark text-white text-center" v-model="findBy">
                <option value="name" selected>Nome</option>
                <option value="position">Cargo</option>
                <option value="email">E-mail</option>
            </select>
        </div>
    <hr />
    <h4>Lista de colaboradores</h4>

    <paginate v-model="page" :page-count="totalPages" :page-range="3" :margin-pages="2" :prev-text="'Voltar'"
      :next-text="'Avançar'" :container-class="'pagination'" :page-class="'page-item'">
    </paginate>

    <div class="accordion animate__animated animate__fadeIn" v-for="collaborator in collaborators" :key="collaborator.id">
      <div class="accordion-item">
        <h2 class="accordion-header" :id="collaborator.id">
          <button class="accordion-button collapsed text-capitalize" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + collaborator.id" aria-expanded="true"
            :aria-controls="'collapseOne' + collaborator.id">
            <vue-gravatar class="img-fluid imgAccordion" :email="collaborator.email" />
            <p v-text="collaborator.name" class="ms-2 nameCollab"></p>
            <p class="ms-2 text-center" v-text="'#' + collaborator.position"></p>
          </button>
        </h2>
        <div :id="'collapse' + collaborator.id" class="accordion-collapse collapse" :aria-labelledby="collaborator.id">
          <div class="accordion-body">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <strong>Email:</strong> {{ collaborator.email }}
                <br />
                <strong>Telefone:</strong> {{ collaborator.phone }}
                <br />
                <strong>Cargo:</strong> {{ collaborator.position }}
                <br />
              </div>
              <div class="col-sm-12 col-md-6">
                <strong>Criado em:</strong> {{ collaborator.createdAt }}
                <br />
                <strong>última modificação:</strong> {{ collaborator.updatedAt }}
                <br />
              </div>
            </div>
            <div class="text-end">
              <button class="btn btn-primary mt-2" @click="editCollab(collaborator.id)">
                <i class="fa-solid fa-user-pen"></i> Editar Colaborador
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-danger" v-show="collaborators.length === 0 && inputSearch">
      Não há colaboradores cadastrados com este <strong>nome</strong> - <router-link :to="{ name: 'colaboradores' }">
        Realizar novo cadastro</router-link>
    </p>
    <p class="text-danger" v-show="collaborators.length === 0 && !inputSearch">
      Não há colaboradores cadastrados - <router-link :to="{ name: 'colaboradores' }">Realizar novo cadastro
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Paginate from "vuejs-paginate-next";
import { RouterLink, useRouter } from "vue-router";


const router = useRouter();
const store = useStore();
const inputSearch = ref("");
const page = ref(1);
const perPage = ref(5);
const findBy = ref("name");

store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");
store.commit('configModule/SET_PAGE_NAME', 'Listagem de colaboradores');

const totalPages = computed(() => {
  if (inputSearch.value) {
    return Math.ceil(
      store.state.collaboratorModule.collaborators.filter((collaborator) =>
        collaborator[findBy.value].toLowerCase().includes(inputSearch.value.toLowerCase())
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
    page.value = 1;
    let total = store.state.collaboratorModule.collaborators.filter(
      (collaborator) =>
        collaborator[findBy.value]
          .toLowerCase()
          .includes(inputSearch.value.toLowerCase())
    );
    total = total.slice(
      (page.value - 1) * perPage.value,
      page.value * perPage.value
    );
    return total;
  } else {
    return store.state.collaboratorModule.collaborators.slice(
      (page.value - 1) * perPage.value,
      page.value * perPage.value
    );
  }
});

const itemsLoaned = computed(() => {
  return store.state.itemsModule.items.filter(
    (item) => item.collaborator
  );
});


function editCollab(id) {
  router.push({ name: 'colaboradores', params: { userId: id } });
}
</script>

<style lang="scss" scoped>
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


</style>
