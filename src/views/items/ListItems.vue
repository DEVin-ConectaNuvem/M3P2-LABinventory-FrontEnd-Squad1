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

    <div class="accordion animate__animated animate__fadeIn" v-for="item in allItems" :key="item.id">
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
                <strong>Descrição:</strong> {{ item.description }}
                <br />
              </div>
              <div class="col-sm-12 col-md-6">
                <strong>Criado em:</strong>
                <span :data-testid="`item-${item.id}-created-at`">
                  {{ item.createdAt }}
                </span> 
                <br />
                <strong>Última modificação:</strong>
                <span :data-testid="`item-${item.id}-updated-at`">
                  {{ item.updatedAt }}
                </span>
                <br />
                <strong>Emprestado desde:</strong> 
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
    <p class="text-danger" v-show="allItems.length === 0 && inputSearch">
      Não há itens cadastrados com este <strong>código de patrimônio</strong> - <router-link :to="{ name: 'items' }">
        Realizar novo cadastro</router-link>
    </p>
    <p class="text-danger" v-show="allItems.length === 0 && !inputSearch">
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
          <option v-for="collab in collaborators">
            <span class="collaborators">{{ collab.name }}</span>
          </option>
        </optgroup>
      </select>
      <template v-slot:footer>
        <div class="d-flex">
          <button class="btn btn-secondary me-2" @click="cancelEditItem()">Cancelar</button>
          <button
            data-testid="save-button"
            class="btn btn-success"
            @click="show = false">Salvar</button>
        </div>
      </template>
    </m-dialog>
  </div>
</template>

<script setup>
import Paginate from "vuejs-paginate-next";
import { useAxios } from "../../hooks";
import { RouterLink, useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { createMessageBox } from 'vue-m-dialog'

const router = useRouter();
const store = useStore();
const { axios } = useAxios();
const inputSearch = ref(null);
const page = ref(1);
const perPage = ref(5);
const findBy = ref("id");
const show = ref(false)
const item = ref({})
const collaborators = ref([])
const allItems = ref([])
const allItensCount = ref(0)

store.commit('configModule/SET_PAGE_NAME', 'Listagem de itens');

const totalPages = computed(() => {
  if (inputSearch.value) {
    return Math.ceil(
      allItems.value.filter((item) =>
        findBy.value === 'id'
          ? item[findBy.value] === Number(inputSearch.value)
          : item[findBy.value]?.toLowerCase().includes(inputSearch.value.toLowerCase())

      ).length / perPage.value
    );
  } else {
    return Math.ceil(
      allItensCount.value / perPage.value
    );
  }
});

const items = computed(() => {
  if (inputSearch.value) {
    page.value = 1;
    let total = allItems.value.filter(
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
    return allItems.value.slice(
      (page.value - 1) * perPage.value,
      page.value * perPage.value
    );
  }
});

async function loadData() {
  try {
    const itemsPaginate = await axios.get(`/items?_limit=${perPage.value}&_page=${page.value}`);
    const itemsDataCount = await axios.get(`/items`);
    const collabs = await axios.get("/collaborators");
    allItems.value = itemsPaginate.data;
    allItensCount.value = itemsDataCount.data.length
    collaborators.value = collabs.data;
  } catch (error) {
    console.log(error.message)
  }
}


onMounted(async () => {
  await loadData()
});

watch(page, async () => {
  await loadData()
});

async function loanCollaborator(itemId, collaborator) {
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
      await setLoan(itemId, collaborator)
    }

  } else {
    item.value = allItems.value.find((item) => item.id === itemId)
    show.value = true
  }
}

async function setLoan(itemId, collaborator = null) {
  try {
    console.log(itemId.id, itemId.collaborator)
    const payload = {
      collaborator: itemId?.collaborator ? itemId.collaborator : null,
      loanAt: itemId?.collaborator ? moment().format("DD/MM/YYYY hh:mm") : null,
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
      await loadData()
    }
    return res.data;
  } catch (error) {
    throw new Error('Erro ao emprestar item');
  }
}

function editItem(id) {
  id = id + '-list'
  router.push({ name: 'items', params: { itemId: id } });
}

async function cancelEditItem() {
  await loadData()
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