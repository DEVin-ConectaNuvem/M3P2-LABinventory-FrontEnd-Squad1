<template>
  <div class="container mt-3">
    <search-input
      :options="parameterSearch.options"
      @returnData="loadDataSearch"
    >
    </search-input>
    <hr />
    <h4>Lista de Itens</h4>
    <paginate
      v-model="page"
      :page-count="totalPages"
      :page-range="3"
      :margin-pages="2"
      :prev-text="'Voltar'"
      :next-text="'Avançar'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      v-show="itemsPaginateComputed.length > 0"
    >
    </paginate>
    <div
      class="accordion animate__animated animate__fadeIn"
      v-for="item in itemsPaginateComputed"
      :key="item.id"
    >
      <div class="accordion-item">
        <div
          class="accordion-header"
          :data-testid="`item-${item.id}`"
          :id="item.id"
        >
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + item.id"
            aria-expanded="true"
            :aria-controls="'collapseOne' + item.id"
          >
            <img class="img-fluid imgAccordion" :src="item.url || item.imageItem" />
            <div class="flex-grow-1 ms-3">
              #{{ item.codPatrimonio }} -
              <span :data-testid="`item-${item.id}-title`">{{
                item.title
              }}</span>
            </div>
            <div class="me-2 statusBadge">
              <p
                :data-testid="`item-${item.id}-status`"
                class="fw-bold"
                :class="
                  item.collaborator
                    ? 'badge text-bg-primary'
                    : 'badge text-bg-success'
                "
                v-text="
                  item.collaborator ? item.collaborator : 'Item disponível'
                "
              ></p>
            </div>
          </button>
          <div class="me-2 d-md-none fs-5 text-center">
            <p
              class="fw-bold"
              :class="
                item.collaborator
                  ? 'badge text-bg-primary'
                  : 'badge text-bg-success'
              "
              v-text="item.collaborator ? item.collaborator : 'Item disponível'"
            ></p>
          </div>
        </div>
        <div
          :id="'collapse' + item.id"
          class="accordion-collapse collapse"
          :aria-labelledby="item.id"
        >
          <div class="accordion-body">
            <div class="row">
              <div
                class="col-sm-12 col-md-6"
                :data-testid="`item-${item.id}-description`"
              >
                <strong>Descrição: </strong> {{ item.description }}
                <br />
              </div>
              <div class="col-sm-12 col-md-6">
                <strong>Criado em: </strong>
                <span :data-testid="`item-${item.id}-created-at`">
                  {{ formatDate(item.createdAt, 'DD/MM/yyyy hh:mm') }}
                </span>
                <br />
                <strong>Última modificação: </strong>
                <span :data-testid="`item-${item.id}-updated-at`">
                  {{ formatDate(item.updatedAt, 'DD/MM/yyyy hh:mm') }}
                </span>
                <br />
                <strong v-show="item.loanAt">Emprestado desde: </strong>
                <span :data-testid="`item-${item.id}-loan-at`">
                  {{ formatDate(item.loanAt, 'DD/MM/yyyy hh:mm') }}
                </span>
                <hr />
              </div>
              <div class="text-md-end btn-group-sm">
                <button
                  :data-testid="`item-${item.id}-borrow-or-return-button`"
                  class="btn"
                  :class="item.collaborator ? 'btn-primary' : 'btn-success'"
                  @click="
                    loanCollaborator(
                      item.id,
                      item.collaborator,
                      item.codPatrimonio,
                      item.title
                    )
                  "
                >
                  <i
                    class="fa-solid"
                    :class="
                      item.collaborator
                        ? 'fa-arrow-down'
                        : 'fa-arrow-right-arrow-left'
                    "
                  ></i>
                  <span
                    v-text="
                      item.collaborator ? ' Devolver Item' : ' Emprestar item '
                    "
                  >
                  </span>
                </button>
                <button
                  :data-testid="`item-${item.id}-edit-button`"
                  class="btn btn-warning"
                  @click="editItem(item.id)"
                >
                  <i class="fa-solid fa-edit"></i> Editar item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p
      class="text-danger"
      v-show="itemsPaginateComputed.length === 0 && inputConfig.searchText"
    >
      Não há itens cadastrados com este <strong>termo de pesquisa</strong> -
      <router-link :to="{ name: 'items' }"> Realizar novo cadastro</router-link>
    </p>
    <p
      class="text-danger"
      v-show="itemsPaginateComputed.length === 0 && !inputConfig.searchText"
    >
      Não há itens cadastrados -
      <router-link :to="{ name: 'items' }">Realizar novo cadastro</router-link>
    </p>
    <m-dialog v-model="show" title="Empréstimo de itens">
      <hr />
      <p data-testid="item-dialog-title">{{ item.title }}</p>
      <img
        data-testid="img-dialog"
        :src="item.url"
        class="img-fluid imagemLoan"
        alt="imagem do item"
      />
      <hr />
      <p>Colaborador:</p>
      <select
        data-testid="select-collaborators"
        class="form-select"
        v-model="item.collaborator"
      >
        <optgroup label="Colaboradores">
          <option
            v-for="collab in collaborators"
            :key="collab.id"
            :value="collab.name"
            class="collaborators"
            v-text="collab.name + ' - ' + collab.email"
          ></option>
        </optgroup>
      </select>
      <template v-slot:footer>
        <div class="d-flex">
          <button class="btn btn-secondary me-2" @click="cancelEditItem()">
            Cancelar
          </button>
          <button
            data-testid="save-button"
            class="btn btn-success"
            @click="setLoan(item.id, item.collaborator)"
          >
            Salvar
          </button>
        </div>
      </template>
    </m-dialog>
  </div>
</template>

<script setup>
import SearchInput from '../../components/shared/SearchInput.vue'
import { computed, ref, watch, reactive } from 'vue'
import { createMessageBox } from 'vue-m-dialog'
import { RouterLink, useRouter } from 'vue-router'
import Paginate from 'vuejs-paginate-next'
import { useStore } from 'vuex'
import { useLoading } from 'vue-loading-overlay'
import { useToast } from 'vue-toastification'
import { useAxios } from '../../hooks'
import { formatDate } from '../../utils'

const toast = useToast()
const $loading = useLoading()
const router = useRouter()
const store = useStore()
const { axios } = useAxios()
const show = ref(false)
const item = ref({})
const collaborators = ref([])
const allItems = ref([])
const allItemsCount = ref(0)
const optionsPage = reactive({
  page: 1,
  limit: 5
})
const page = ref(1)
const perPage = ref(5)
const itemsPaginate = ref([])
const parameterSearch = reactive({
  options: [
    { text: 'Código', value: 'codPatrimonio', operatorSearch: '=' },
    { text: 'Título', value: 'title', operatorSearch: 'like' },
    { text: 'Categoria', value: 'category', operatorSearch: 'like' },
    { text: 'Descrição', value: 'description', operatorSearch: 'like' },
    { text: 'Marca', value: 'brand', operatorSearch: 'like' },
    { text: 'Modelo', value: 'model', operatorSearch: 'like' },
    { text: 'Colaborador', value: 'collaborator', operatorSearch: 'like' }
  ]
})
const inputConfig = reactive({
  searchText: '',
  searchField: 'codPatrimonio'
})

store.commit('configModule/SET_PAGE_NAME', 'Listagem de itens')

const totalPages = computed(() => {
  return Math.ceil(allItemsCount.value / perPage.value) || 1
})

async function loadDataPagination() {
  const loader = $loading.show()
  try {
    const url = `/inventory/list?limit=${perPage.value}&page=${page.value}`
    let payload = {}
    let response = []

    const operatorToSearch = parameterSearch.options.find(item => {
      return item.value === inputConfig.searchField
    }).operatorSearch

    inputConfig.searchText
      ? (payload = {
          searchField: inputConfig.searchField,
          searchValue: inputConfig.searchText,
          operatorSearch: operatorToSearch
        })
      : (payload = {})

    response = await axios.get(url, { params: payload })
    collaborators.value = response.data.employees
    allItemsCount.value = response.data.totalRows
    if (Array.isArray(response?.data?.rows)) {
      itemsPaginate.value = response.data.rows
    } else {
      itemsPaginate.value = []
    }
  } catch (error) {
    toast.error(error.message)
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500)
  }
}

const itemsPaginateComputed = computed(() => {
  return itemsPaginate.value
})

watch(page, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    optionsPage.page = page.value
    await loadDataPagination()
  }
})

async function loadDataSearch(searchText, searchField) {
  if (searchText && searchField) {
    inputConfig.searchText = searchText
    inputConfig.searchField = searchField
    await loadDataPagination()
  } else if (!searchText) {
    inputConfig.searchText = ''
    inputConfig.searchField = searchField
    await loadDataPagination()
  } else {
    inputConfig.searchText = ''
    inputConfig.searchField = searchField
  }
}

async function loanCollaborator(itemId, collaborator, codPatrimonio, title) {
  try {
    if (collaborator) {
      const choose = await createMessageBox({
        title: 'Confirmação de devolução',
        message: `Gostaria de confirmar a devolução do item código '${title}' de ${collaborator} ?`,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        hasMask: true,
        draggable: true,
        isPointerEventsNone: true,
        isMiddle: true
      })
      if (choose.ok) {
        await setLoan(itemId)
      }
    } else {
      item.value = itemsPaginate.value.find(item => item.id === itemId)
      show.value = true
    }
  } catch (error) {
    toast.error(error.message, 1500)
  }
}

async function setLoan(itemId, collaborator = null) {
  const loader = $loading.show()
  try {
    const payload = {
      id: itemId,
      dataset: {
        collaborator: collaborator ? collaborator : null
      }
    }
    const res = await axios.patch(`/inventory/update`, payload)

    if (res.status === 200) {
      show.value = false
      await loadDataPagination()
    }
    return res.data
  } catch (error) {
    throw new Error('Erro ao emprestar item')
  } finally {
    loader.hide()
  }
}

function editItem(id) {
  id = id + '-list'
  router.push({ name: 'items', params: { itemId: id } })
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
