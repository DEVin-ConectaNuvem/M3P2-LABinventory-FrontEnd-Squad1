<template>
  <div class="container mt-3 ">
    <search-input :options="parameterSearch.options" @returnData="loadDataSearch">
    </search-input>
    <hr />
    <h4>Lista de Itens</h4>
    <paginate v-model="page" :page-count="totalPages" :page-range="3" :margin-pages="2" :prev-text="'Voltar'"
      :next-text="'Avançar'" :container-class="'pagination'" :page-class="'page-item'">
    </paginate>
    <div class="accordion animate__animated animate__fadeIn" v-for="item in itemsPaginateComputed" :key="item.id">
      <div class="accordion-item ">
        <div class="accordion-header " :data-testid="`item-${item.id}`" :id="item.id">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + item.id" aria-expanded="true" :aria-controls="'collapseOne' + item.id">
            <img class="img-fluid imgAccordion" :src="item.url" />
            <div class="flex-grow-1 ms-3 ">
              #{{ item.id }} - <span :data-testid="`item-${item.id}-title`">{{ item.title }}</span>
            </div>
            <div class="me-2 statusBadge">
              <p :data-testid="`item-${item.id}-status`" class="fw-bold" :class="item.collaborator ? 'badge text-bg-primary' : 'badge text-bg-success'"
                v-text="item.collaborator ? item.collaborator : 'Item disponível'"></p>
            </div>
          </button>
          <div class="me-2 d-md-none fs-5 text-center ">
            <p class="fw-bold" :class="item.collaborator ? 'badge text-bg-primary' : 'badge text-bg-success'"
              v-text="item.collaborator ? item.collaborator : 'Item disponível'"></p>
          </div>
        </div>
        <div :id="'collapse' + item.id" class="accordion-collapse collapse" :aria-labelledby="item.id">
          <div class="accordion-body">
            <div class="row">
              <div class="col-sm-12 col-md-6" :data-testid="`item-${item.id}-description`">
                <strong>Descrição: </strong> {{ item.description }}
                <br />
              </div>
              <div class="col-sm-12 col-md-6">
                <strong>Criado em: </strong>
                <span :data-testid="`item-${item.id}-created-at`">
                  {{ item.createdAt }}
                </span> 
                <br />
                <strong>Última modificação: </strong>
                <span :data-testid="`item-${item.id}-updated-at`">
                  {{ item.updatedAt }}
                </span>
                <br />
                <strong v-show="item.loanAt">Emprestado desde: </strong> 
                <span :data-testid="`item-${item.id}-loan-at`">
                  {{ item.loanAt }}
                </span>
                <hr>
              </div>
              <div class="text-md-end btn-group-sm ">
                <button
                  :data-testid="`item-${item.id}-borrow-or-return-button`"
                  class="btn" :class="item.collaborator ? 'btn-primary' : 'btn-success'"
                  @click="loanCollaborator(item.id, item.collaborator)"
                >
                  <i class="fa-solid" :class="item.collaborator ? 'fa-arrow-down' : 'fa-arrow-right-arrow-left'"></i>
                  <span v-text="item.collaborator ? ' Devolver Item' : ' Emprestar item '"> </span>
                </button>
                <button
                  :data-testid="`item-${item.id}-edit-button`"
                  class="btn btn-warning " @click="editItem(item.id)">
                  <i class="fa-solid fa-edit"></i> Editar item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-danger" v-show="itemsPaginateComputed.length === 0 && inputSearch">
      Não há itens cadastrados com este <strong>termo de pesquisa</strong> - <router-link :to="{ name: 'items' }">
        Realizar novo cadastro</router-link>
    </p>
    <p class="text-danger" v-show="!allItems">
      Não há itens cadastrados - <router-link :to="{ name: 'items' }">Realizar novo cadastro</router-link>
    </p>
    <m-dialog v-model="show" title="Empréstimo de itens">
      <hr>
      <p data-testid="item-dialog-title">{{ item.title }}</p>
      <img data-testid="img-dialog" :src="item.url" class="img-fluid imagemLoan" alt="imagem do item">
      <hr>
      <p>Colaborador:</p>
      <select data-testid="select-collaborators" class="form-select" v-model="item.collaborator">
        <optgroup label="Colaboradores">
          <option v-for="collab in collaborators" :key="collab.id" class="collaborators" v-text="collab.name">
          </option>
        </optgroup>
      </select>
      <template v-slot:footer>
        <div class="d-flex">
          <button class="btn btn-secondary me-2" @click="cancelEditItem()">Cancelar</button>
          <button
            data-testid="save-button"
            class="btn btn-success"
            @click="setLoan(item.id, item.collaborator)">Salvar</button>
        </div>
      </template>
    </m-dialog>
  </div>
</template>

<script setup>
import SearchInput from '../../components/shared/SearchInput.vue';
import moment from "moment";
import { computed, onMounted, ref, watch, reactive } from "vue";
import { createMessageBox } from 'vue-m-dialog';
import { RouterLink, useRouter } from "vue-router";
import Paginate from "vuejs-paginate-next";
import { useStore } from "vuex";
import { useLoading } from "vue-loading-overlay";
import { useToast } from "vue-toastification";
import { useAxios, useLodash } from "../../hooks";

const { $_ } = useLodash();
const toast = useToast();
const $loading = useLoading();
const router = useRouter();
const store = useStore();
const { axios } = useAxios();
const show = ref(false)
const item = ref({})
const collaborators = ref([])
const allItems = ref([])
const inputSearch = ref(null);
const optionsPage = reactive({
  page: 1,
  limit: 5
})
const page = ref(1);
const perPage = ref(5);
const itemsPaginate = ref([]);
const parameterSearch = reactive({
  options: [
    { "text": "Código", "value": "id", "operatorSearch": "=" },
    { "text": "Título", "value": "title" },
    { "text": "Categoria", "value": "category" },
    { "text": "Descrição", "value": "description" },
    { "text": "Marca", "value": "brand" },
    { "text": "Modelo", "value": "model" },
    { "text": "Colaborador", "value": "collaborator" }

  ]
})
const inputConfig = reactive({
  searchText: '',
  searchField: 'id',
})

store.commit('configModule/SET_PAGE_NAME', 'Listagem de itens');

const totalPages = computed(() => {
  if (!inputConfig.searchText) {
    return Math.ceil(allItems.value.length / perPage.value);
  } else {
    return Math.ceil(itemsPaginate.value.length / perPage.value);
  }
})

async function loadDataPagination() {
  const loader = $loading.show()
  try {
    let url = ''
    if (inputConfig.searchText) {
      const operator = parameterSearch.options.find((opt) => opt.value === inputConfig.searchField).operatorSearch || '_like='
      url = `/items?${inputConfig.searchField}${operator}${inputConfig.searchText}&_limit=${perPage.value}&_page=${page.value}`
    } else {
      url = `/items?_limit=${perPage.value}&_page=${page.value}`
    }
    const response = await axios.get(url);
    itemsPaginate.value = response.data;
  } catch (error) {
    toast.error(error.message)
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

async function loadAllData() {
  const loader = $loading.show()
  try {
    const response = await axios.get('/items/');
    allItems.value = response.data || null;
  } catch (error) {
    toast.error("Erro ao carregar os dados")
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

async function loadCollaborators() {
  const loader = $loading.show()
  try {
    const response = await axios.get('/collaborators');
    const collabsUniques = $_.uniqBy(response.data, 'id')
    collaborators.value = collabsUniques;
  } catch (error) {
    toast.error("Erro ao carregar os dados")
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

const itemsPaginateComputed = computed(() => {
  return itemsPaginate.value
})

onMounted(async () => {
  await loadAllData()
  await loadDataPagination()
  await loadCollaborators()
});

watch(page, async () => {
  optionsPage.page = page.value;
  await loadDataPagination()
});

async function loadDataSearch(searchText, searchField) {
  if (searchText && searchField) {
    inputConfig.searchText = searchText;
    inputConfig.searchField = searchField;
  } else {
    inputConfig.searchText = '';
  }
  await loadDataPagination()
}

async function loanCollaborator(itemId, collaborator) {
  
  try {
    if (collaborator) {
      const choose = await createMessageBox({
        title: 'Confirmação de devolução',
        message: `Gostaria de confirmar a devolução do item código ${itemId} de ${collaborator} ?`,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        hasMask: true,
        draggable: true,
        isPointerEventsNone: true,
        isMiddle: true,
      })
      if (choose.ok) {
        await setLoan(itemId)
      }
    } else {
      item.value = itemsPaginate.value.find((item) => item.id === itemId)
      show.value = true
    }
  } catch (error) {
    toast.error(error.message, 1500);
  } 
}

async function setLoan(itemId, collaborator = null) {
  const loader = $loading.show()
  try {
    const payload = {
      collaborator: collaborator,
      loanAt: collaborator ? moment().format("DD/MM/YYYY hh:mm") : null,
      updatedAt: moment().format("DD/MM/YYYY hh:mm"),
    }
    const res = await axios.patch(
      `/items/${itemId.id || itemId}`, {
      collaborator: payload.collaborator,
      loanAt: payload.loanAt,
      updatedAt: payload.updatedAt,
    }
    );

    if (res.status === 200) {
      show.value = false
      await loadDataPagination()
    }
    return res.data;
  } catch (error) {
    throw new Error("Erro ao emprestar item");
  } finally {
    loader.hide()
  }
}

function editItem(id) {
  id = id + '-list'
  router.push({ name: 'items', params: { itemId: id } });
}

async function cancelEditItem() {
  await loadDataPagination()
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