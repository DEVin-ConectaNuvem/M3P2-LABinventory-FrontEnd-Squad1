<template>
  <div class="container mt-3 ">
    <search-input :options="parameterSearch.options" @returnData="loadDataSearch"
    data-testid="colab-list-inputSearch"
    >
    </search-input>
    <hr />
    <h4>Lista de colaboradores</h4>
    <paginate v-model="page" :page-count="totalPages" :page-range="3" :margin-pages="2" :prev-text="'Voltar'"
      :next-text="'Avançar'" :container-class="'pagination'" :page-class="'page-item'" v-show="collabsPaginateComputed.length > 0">
    </paginate>
    <div class="accordion animate__animated animate__fadeIn" v-for="collaborator in collabsPaginateComputed"
      :key="collaborator.id">
      <div class="accordion-item">
        <h2 class="accordion-header" :id="collaborator.id">
          <button class="accordion-button collapsed text-capitalize" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + collaborator.id" aria-expanded="true"
            :aria-controls="'collapseOne' + collaborator.id">
            <img v-if="collaborator.imageUser" :src="collaborator.imageUser" class="img-fluid imgAccordion"  
            :data-testid="`colab-list-imageUser-${collaborator.id}`">
            <vue-gravatar v-else class="img-fluid imgAccordion" :email="collaborator.email"/>
            <p v-text="collaborator.name" class="ms-2 nameCollab" :data-testid="`colab-list-name-${collaborator.id}`"></p>
            <p class="ms-2 text-center" v-text="'#' + collaborator.position"></p>
          </button>
        </h2>
        <div :id="'collapse' + collaborator.id" class="accordion-collapse collapse" :aria-labelledby="collaborator.id">
          <div class="accordion-body">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <strong>Email:</strong> <span :data-testid="`colab-list-email-${collaborator.id}`"> {{ collaborator.email }} </span>
                <br />
                <strong>Telefone:</strong><span :data-testid="`colab-list-phone-${collaborator.id}`"> {{ collaborator.phone }} </span>
                <br />
                <strong>Cargo:</strong><span :data-testid="`colab-list-position-${collaborator.id}`"> {{ collaborator.position }} </span>
                <br />
              </div>
              <div class="col-sm-12 col-md-6">
                <strong>Criado em:</strong><span :data-testid="`colab-list-createdAt-${collaborator.id}`"> {{ collaborator.createdAt }} </span>
                <br />
                <strong>última modificação:</strong><span data-testid="colab-list-updateAt"> {{ collaborator.updatedAt }} </span>
                <br />
              </div>
            </div>
            <div class="text-end">
              <button class="btn btn-primary mt-2" @click="editCollab(collaborator.id)" data-testid="colab-list-buttonEdit">
                <i class="fa-solid fa-user-pen"></i> Editar Colaborador
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-danger" v-show="collabsPaginateComputed.length === 0 && inputConfig.searchText" 
    data-testid="colab-list-not-found">
      Não há colaboradores cadastrados com este <strong>termo de pesquisa</strong> - <router-link
        data-testid="colab-list-router-link-new"
        :to="{ name: 'colaboradores' }">
        Realizar novo cadastro</router-link>
    </p>
    <p class="text-danger" v-show="!allCollabsCount">
      Não há colaboradores cadastrados - <router-link :to="{ name: 'colaboradores' }">Realizar novo cadastro
      </router-link>
    </p>
  </div>
</template>

<script setup>
import SearchInput from '../../components/shared/SearchInput.vue';
import { ref, computed, onMounted, watch, reactive } from "vue";
import { useStore } from "vuex";
import Paginate from "vuejs-paginate-next";
import { RouterLink, useRouter } from "vue-router";
import { useAxios, useLodash } from "../../hooks";
import { useLoading } from "vue-loading-overlay";
import { useToast } from "vue-toastification";

const $toast = useToast();
const $loading = useLoading();
const { $_ } = useLodash();
const { axios } = useAxios();
const allCollabs = ref([]);
const allCollabsCount = ref(0);
const router = useRouter();
const store = useStore();
const inputSearch = ref(null);
const page = ref(1);
const perPage = ref(5);
const collabsPaginate = ref([]);
const parameterSearch = reactive({
  options: [
    { "text": "Nome", "value": "name" },
    { "text": "Cargo", "value": "position" },
    { "text": "E-mail", "value": "email" }
  ]
})
const inputConfig = reactive({
  searchText: '',
  searchField: 'id',
})

store.commit('configModule/SET_PAGE_NAME', 'Listagem de colaboradores');

const totalPages = computed(() => {
  if (!inputConfig.searchText) {
    return Math.ceil(allCollabs.value.length / perPage.value);
  } else {
    return Math.ceil(collabsPaginate.value.length / perPage.value);
  }
})

async function loadData() {
  const loader = $loading.show()
  try {
    const res = await axios.get(`/employers`);
    allCollabs.value = res.data;
    allCollabsCount.value = res.data.length;
  } catch (error) {
    console.log(error.message)
    $toast.error("Erro ao carregar os colaboradores");
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

async function loadDataPagination() {
  const loader = $loading.show()
  try {
    let url = ''
    if (inputConfig.searchText) {
      const operator = parameterSearch.options.find((opt) => opt.value === inputConfig.searchField).operatorSearch || '_like='
      url = `/employers?${inputConfig.searchField}${operator}${inputConfig.searchText}&limit=${perPage.value}&page=${page.value}`
    } else {
      url = `/employers?limit=${perPage.value}&page=${page.value}`
    }
    const response = await axios.get(url);
    collabsPaginate.value = response.data.rows;
  } catch (error) {
    $toast.error(error.message)
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}
const collabsPaginateComputed = computed(() => {
  return collabsPaginate.value
})

onMounted(async () => {
  await loadDataPagination()
});

watch(page, async (newValue, oldValue) => {
  if (newValue != oldValue) {
    await loadDataPagination()
  }
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
