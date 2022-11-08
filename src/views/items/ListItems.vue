<template>
  <div class="container mt-3 ">
    <div class="content input-group">
      <input type="text" class="w-75 form-control animate__animated animate__flipInX" placeholder="✍️ Buscar item... "
        v-model="inputSearch">
      <select class="badge bg-dark text-white text-center" id="" v-model="findBy">
        <option value="id" selected>Código de Patrimonio</option>
        <option value="title">Pelo título</option>
        <option value="category">Pela Categoria</option>
        <option value="collaborator">Pelo Colaborador</option>
      </select>
    </div>

    <hr />
    <h4>Lista de Itens</h4>

    <paginate v-model="page" :page-count="totalPages" :page-range="3" :margin-pages="2" :prev-text="'Voltar'"
      :next-text="'Avançar'" :container-class="'pagination'" :page-class="'page-item'">
    </paginate>

    <div class="accordion animate__animated animate__fadeIn" v-for="item in items" :key="item.id">
      <div class="accordion-item ">
        <div class="accordion-header " :id="item.id">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + item.id" aria-expanded="true"
            :aria-controls="'collapseOne' + item.id">
            <img class="img-fluid imgAccordion" :src="item.url" />
            <div class="flex-grow-1 ms-3 ">
              #{{ item.id }} - {{ item.title }}
            </div>
            <div class="me-2 statusBadge">
              <p class="fw-bold" :class="item.collaborator ? 'badge text-bg-primary' : 'badge text-bg-success'"
                v-text="item.collaborator ? item.collaborator : 'Item disponível'"></p>
            </div>
          </button>
          <div class="me-2 d-md-none fs-5 text-center ">
              <p class="fw-bold" :class="item.collaborator ? 'badge text-bg-primary' : 'badge text-bg-success'"
                v-text="item.collaborator ? item.collaborator : 'Item disponível'"></p>
            </div>
        </div>

        <div :id="'collapse' + item.id" class="accordion-collapse collapse"
          :aria-labelledby="item.id">
          <div class="accordion-body">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <strong>Descrição:</strong> {{ item.description }}
                <br />
              </div>
              <div class="col-sm-12 col-md-6 ">
                <strong>Criado em:</strong> {{ item.createdAt }}
                <br />
                <strong>Última modificação:</strong> {{ item.updatedAt }}
                <br />
                <strong>Emprestado desde:</strong> {{ item.loanAt }}
                <hr>
              </div>
              <div class="text-md-end btn-group-sm ">
                <button class="btn" :class="item.collaborator ? 'btn-primary' : 'btn-success'"
                  @click="loanCollaborator(item.id, item.collaborator)">
                  <i class="fa-solid" :class="item.collaborator ? 'fa-arrow-down' : 'fa-arrow-right-arrow-left'"></i>
                  <span v-text="item.collaborator ? ' Devolver Item' : ' Emprestar item '"> </span>
                </button>

                <button class="btn btn-warning " @click="editItem(item.id)">
                  <i class="fa-solid fa-edit"></i> Editar item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-danger" v-show="items.length === 0 && inputSearch">
      Não há itens cadastrados com este <strong>código de patrimônio</strong> - <router-link :to="{ name: 'items' }">
        Realizar novo cadastro</router-link>
    </p>
    <p class="text-danger" v-show="items.length === 0 && !inputSearch">
      Não há itens cadastrados - <router-link :to="{ name: 'items' }">Realizar novo cadastro</router-link>
    </p>

    <m-dialog v-model="show" title="Empréstimo de itens">
      <hr>
      <p v-text="item.title"></p>
      <img :src="item.url" class="img-fluid imagemLoan" alt="imagem do item">
      <hr>
      <p>Colaborador:</p>
      <select class="form-select" v-model="item.collaborator">
        <optgroup label="Colaboradores">
          <option v-for="collab in collaborators" v-text="collab.name"></option>
        </optgroup>
      </select>
      <template v-slot:footer>
        <div class="d-flex">
          <button class="btn btn-secondary me-2" @click="cancelEditItem()">Cancelar</button>
          <button class="btn btn-success"
            @click="setLoan({ id: item.id, collaborator: item.collaborator })">Salvar</button>
        </div>
      </template>
    </m-dialog>
  </div>
</template>

<script setup>
import Paginate from "vuejs-paginate-next";
import { RouterLink, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { createMessageBox } from 'vue-m-dialog'

const router = useRouter();
const store = useStore();
const inputSearch = ref(null);
const page = ref(1);
const perPage = ref(5);
const findBy = ref("id");
const show = ref(false)
const item = ref({})

store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");
store.commit("itemsModule/UPDATE_ITEMS_LOCAL_STORAGE");
store.commit('configModule/SET_PAGE_NAME', 'Listagem de itens');

const totalPages = computed(() => {
  if (inputSearch.value) {
    return Math.ceil(
      store.state.itemsModule.items.filter((item) =>
        findBy.value === 'id'
          ? item[findBy.value] === Number(inputSearch.value)
          : item[findBy.value]?.toLowerCase().includes(inputSearch.value.toLowerCase())

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
    page.value = 1;
    let total = store.state.itemsModule.items.filter(
      (item) =>
        findBy.value === 'id'
          ? item[findBy.value] === Number(inputSearch.value)
          : item[findBy.value]?.toLowerCase().includes(inputSearch.value.toLowerCase())
    )
    total = total.slice(
      (page.value - 1) * perPage.value,
      page.value * perPage.value
    );

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

function loanCollaborator(id, collaborator) {
  if (collaborator) {
    createMessageBox({
      title: 'Confirmação de devolução',
      message: `Gostaria de confirmar a devolução do item código ${id} de ${collaborator} ?`,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      hasMask: true,
      draggable: true,
      isPointerEventsNone: true,
      isMiddle: true,
    }).then(res => {
      if (res.ok) {
        setLoan({ id, collaborator: null })
      }
    })
  } else {
    item.value = store.state.itemsModule.items.find((item) => item.id === id)
    show.value = true
  }
}

function setLoan(item) {
  const data = {
    id: item.id,
    collaborator: item.collaborator ? item.collaborator : null,
    loanAt: item.collaborator ? moment().format("DD/MM/YYYY hh:mm") : null
  }
  const setLoan = store.dispatch("itemsModule/setLoanItem", data);
  show.value = false
}

function editItem(id) {
  id = id + '-list'
  router.push({ name: 'items', params: { itemId: id } });
}

function cancelEditItem() {
  store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");
  store.commit("itemsModule/UPDATE_ITEMS_LOCAL_STORAGE");
  show.value = false
}

</script>


<style lang="scss" scoped>
.imagemLoan {
  max-height: 10rem;
}

.imgAccordion {
  border-radius: 10%;
  width: 3rem;
}

.btn-group-sm {
  .btn {
    text-align: center;
    width: 150px;
    padding: 7px;
    margin-left: 5px;
  }
}
.statusBadge {
    font-size: 18px;

  .badge {
    min-width: 130px;
    margin: 0 auto;
    padding: 7px;
    margin-left: 5px;
  }
}
.badgeGroup {
  .badge {
    min-width: 130px;
    padding: 5px;
    margin: 0 auto;
  }
}


@media (max-width: 576px) {
  .btn-group-sm {
    display: grid;
    row-gap: 0.5rem;
    align-items: center;
    justify-content: center;

    .btn {
      text-align: center;
      width: 200px;
      padding: 15px;
    }

    .imgAccordion {
      border-radius: 10%;
      width: 1rem;
    }

  }

  .statusBadge {
    display: none;
  }
}
</style>