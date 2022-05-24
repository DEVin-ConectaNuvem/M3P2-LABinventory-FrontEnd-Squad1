<template>
  <div class="container">
    <div class="row height d-flex justify-content-center align-items-center">
      <div class="form">
        <i class="fa fa-search"></i>
        <input v-model="inputSearch" type="text" class="form-control form-input"
          placeholder="Digite o código de patrimonio do item" />
        <span class="left-pan d-none d-md-block">Buscar item</span>
      </div>
    </div>
    <hr />
    <h4>Lista de Items</h4>

    <paginate v-model="page" :page-count="totalPages" :page-range="3" :margin-pages="2" :prev-text="'Voltar'"
      :next-text="'Avançar'" :container-class="'pagination'" :page-class="'page-item'">
    </paginate>

    <div class="accordion" v-for="item in items" :key="item.codPatrimonio">
      <div class="accordion-item ">
        <h2 class="accordion-header  " :id="item.codPatrimonio">
          <button class="accordion-button collapsed text-capitalize" :class="item.collaborator ? 'collaborator' : ''"
            type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + item.codPatrimonio"
            aria-expanded="true" :aria-controls="'collapseOne' + item.codPatrimonio">
            <img class="img-fluid imgAccordion" :src="item.url" />
            <p v-text="item.codPatrimonio" class="ms-2 nameCollab fs-5 me-2"></p>
            <p class="fs-5" v-text="' - ' + item.title"></p>
          </button>
        </h2>

        <div :id="'collapse' + item.codPatrimonio" class="accordion-collapse collapse"
          :aria-labelledby="item.codPatrimonio">
          <div class="accordion-body">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <strong>Descrição:</strong> {{ item.description }}
                <br />
              </div>
              <div class="col-sm-12 col-md-6">
                <strong>Criado em:</strong> {{ item.createdAt }}
                <br />
                <strong>última modificação:</strong> {{ item.updatedAt }}
                <br />
                <strong>Empréstimo: </strong>
                <select class="label-form">
                  <optgroup label="Colaboradores">
                    <option v-for="collab in collaborators" v-text="collab.name"></option>
                  </optgroup>
                </select>
              </div>
            </div>
            <button class="btn btn-warning mt-2" @click="editItem(item.codPatrimonio)">
              <i class="fa-solid fa-user-pen"></i> Editar
            </button>
          </div>
        </div>
      </div>
    </div>
    <p class="text-danger" v-show="items.length === 0 && inputSearch">
      Não há colaboradores cadastrados com este <strong>nome</strong> - <router-link :to="{name: 'items'}">Realizar novo cadastro</router-link> 
    </p>
    <p class="text-danger" v-show="items.length === 0 && !inputSearch">
      Não há colaboradores cadastrados - <router-link :to="{name: 'items'}">Realizar novo cadastro</router-link> 
    </p>
  </div>
</template>

<script setup>
import Paginate from "vuejs-paginate-next";
import { RouterLink, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";




const router = useRouter();

const store = useStore();
const inputSearch = ref("");
store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");
store.commit("itemsModule/UPDATE_ITEMS_LOCAL_STORAGE");
const page = ref(1);
const perPage = ref(5);

const totalPages = computed(() => {
  if (inputSearch.value) {
    return Math.ceil(
      store.state.itemsModule.items.filter((collaborator) =>
        collaborator.name
          .toLowerCase()
          .includes(inputSearch.value.toLowerCase())
      ).length / perPage.value
    );
  } else {
    return Math.ceil(
      store.state.itemsModule.items.length / perPage.value
    );
  }
});

const items = computed(() => {
  if (inputSearch.value) {
    let total = store.state.itemsModule.items.filter(
      (item) =>
        item.name
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
    return store.state.itemsModule.items.slice(
      (page.value - 1) * perPage.value,
      page.value * perPage.value
    );
  }
});

const collaborators = computed(() => {
  return store.state.collaboratorModule.collaborators
});



function editItem(id) {
  console.log(id)
  router.push({ name: 'itens', params: { itemId: id } });
} 
</script>


<style lang="scss" scoped>
.card {
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