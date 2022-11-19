<template>
    <div class="container mt-3">
        <section class="row cards">
            <cards-dashboard :class="card.class" v-for="card in infoDashboard" :key="card.title" @click="card.link">
                <template v-slot:icon><i :class="card.icon"></i></template>
                <template v-slot:count>{{ card.count }}</template>
                <template v-slot:title>{{ card.title }}</template>
                <template v-slot:infos>{{ card.infos }}</template>
            </cards-dashboard>
        </section>
        <h4>Busca de itens</h4>
        <search-input :options="parameterSearch.options" @returnData="loadDataSearch">
        </search-input>
        <section class="row">
            <cards-products :data-testid="`item-${item.id}`"
                class="col-sm-12 col-md-6 col-lg-3 col-xxl-3 animate__animated animate__fadeIn"
                v-for="item in itemsPaginateComputed" :key="item.id" @click="itemInfos(item.id)">
                <template v-slot="card"></template>
                <template v-slot:title>
                    <p class="text-center" :class="item.collaborator ? 'loaned' : 'avaliable'"
                        :data-testid="`item-${item.id}-title`">
                        {{ item.codPatrimonio + ' - ' + item.title }}
                    </p>
                </template>
                <template v-slot:img><img :src="item.url" class="imageBg "></template>
                <template v-slot:collab>
                    <p :data-testid="`item-${item.id}-status`"
                        :class="item.collaborator ? 'text-bg-primary' : 'text-bg-success'"
                        v-text="item.collaborator ? item.collaborator : 'Disponível'"></p>
                </template>

                <template v-slot:category><button class="btn btn-primary w-100 btndetails bg-dark">Mais
                        detalhes</button></template>
            </cards-products>
            <paginate v-model="page" :page-count="totalPages" :page-range="3" :margin-pages="2" :prev-text="'Voltar'"
                :next-text="'Avançar'" :container-class="'pagination'" :page-class="'page-item'" v-show="totalPages > 1"
                class="justify-content-center">
            </paginate>
        </section>
        <div class="mt-3">
            <p class="text-danger" v-if="itemsPaginateComputed.length === 0">
                Ainda não há itens cadastrados com este <strong>termo de pesquisa</strong> - <router-link
                    :to="{ name: 'items' }">
                    Realizar novo cadastro</router-link>
            </p>
            <p class="text-danger" v-if="!itemsDashboard.itemsCount">
                Ainda não há items cadastrados no sistema - <router-link :to="{ name: 'items' }">Realizar novo
                    cadastro
                </router-link>
            </p>
        </div>
        <dialog-dashboard :item="item" :show="show" @closeModal="toggleModal" @editItem="editItem">
        </dialog-dashboard>

    </div>
</template>

<script setup>
import CardsDashboard from './components/CardsDashboard.vue';
import CardsProducts from './components/CardsProducts.vue';
import DialogDashboard from './components/DialogDashboard.vue';
import SearchInput from '../../components/shared/SearchInput.vue';
import Paginate from "vuejs-paginate-next";
import { ref, computed, watch, onMounted, nextTick, reactive } from 'vue'
import { useStore } from "vuex";
import { RouterLink, useRouter } from "vue-router";
import { createMessageBox } from 'vue-m-dialog'
import { useAxios } from '../../hooks';
import { useLoading } from "vue-loading-overlay";
import { useToast } from "vue-toastification";

const toast = useToast();
const $loading = useLoading();
const { axios } = useAxios();
const router = useRouter();
const store = useStore();
const show = ref(false);
const item = ref({});
const allItems = ref([]);
const itemsDashboard = ref({
    itemsCount: 0,
    collabsCount: 0,
    valueTotalItems: 0,
    itemsLoaned: 0
})
const optionsPage = reactive({
    page: 1,
    limit: 8
})
const page = ref(1);
const perPage = ref(8);
const itemsPaginate = ref([]);
const infoDashboard = ref([])
const parameterSearch = reactive({
    options: [
        { "text": "Código", "value": "codPatrimonio", "operatorSearch": "=" },
        { "text": "Título", "value": "title" },
        { "text": "Categoria", "value": "category" },
        { "text": "Descrição", "value": "description" },
        { "text": "Marca", "value": "brand" },
        { "text": "Modelo", "value": "model" },
        { "text": "Colaborador", "value": "collaborator" }

    ],
    findBy: "codPatrimonio"
})
const inputConfig = reactive({
    searchText: '',
    searchField: 'codPatrimonio',
})

const totalPages = computed(() => {
    if (!inputConfig.searchText) {
        return Math.ceil(itemsDashboard.value.itemsCount / perPage.value);
    } else {
        return Math.ceil(itemsPaginate.value.length / perPage.value);
    }
})

store.commit('configModule/SET_PAGE_NAME', 'Dashboard')

onMounted(async () => {
    await loadDataDashboard();
    nextTick(() => {
        infoDashboard.value.push(
            {
                title: "Total colaboradores",
                icon: "widgets-icons-2 bg-gradient-scooter fa-solid fa-users",
                count: itemsDashboard.value.collabsCount.toFixed(0),
                infos: "Colaboradores",
                link: () => infoDashRoute('colaboradores', 'ListCollaborators'),
                class: "col-sm-12 col-md-6 col-lg-3 border-info"
            },
            {
                title: "Números de itens",
                icon: "widgets-icons-2 bg-gradient-bloody fa-solid fa-boxes-stacked",
                count: itemsDashboard.value.itemsCount.toFixed(0),
                infos: "Itens",
                link: () => infoDashRoute('itens', 'listItems'),
                class: "col-sm-12 col-md-6 col-lg-3 border-danger"
            },
            {
                title: "Valor total de items",
                icon: "widgets-icons-2 bg-gradient-ohhappiness  fa-solid fa-sack-dollar",
                count: itemsDashboard.value.valueTotalItems,
                infos: "Valores",
                link: () => infoDashRoute('itens', 'listItems'),
                class: "col-sm-12 col-md-6 col-lg-3 border-success"
            },
            {
                title: "Empréstimos",
                icon: "widgets-icons-2 bg-gradient-blooker fa-solid fa-arrow-right-arrow-left",
                count: itemsDashboard.value.itemsLoaned.toFixed(0),
                infos: "Nº de empréstimos",
                link: () => infoDashRoute('itens', 'listItems'),
                class: "col-sm-12 col-md-6 col-lg-3 border-warning"
            }
        )
    })
})

async function loadDataDashboard() {
    try {
        const resAnalytics = await axios.get('/inventory/analytics')
        const resItems = await axios.get(`/inventory/?limit=${perPage.value}&page=${page.value}`)
        const allAnalytics = resAnalytics.data;
        allItems.value = resItems.data

        itemsDashboard.value = {
            itemsCount: allAnalytics.total_items,
            collabsCount: allAnalytics.total_collabs,
            valueTotalItems: allAnalytics.total_value.toFixed(2),
            itemsLoaned: allAnalytics.total_borrowed
        }
    } catch (error) {
        toast.error(error.message)
    }
}

async function loadDataPagination() {
    const loader = $loading.show()
    try {
        const url = `/inventory/?limit=${perPage.value}&page=${page.value}`;
        let payload = {}
        let response = []

        if (inputConfig.searchText) {
            payload = {
                [inputConfig.searchField]: inputConfig.searchText
            }
            response = await axios.post(url, payload );
        } else {
            response = await axios.get(url);
        }
        if (Array.isArray(response?.data)) {
            allItems.value = response.data
        } else {
            allItems.value = []
        }
    } catch (error) {
        toast.error(error.message)
    } finally {
        setTimeout(() => {
            loader.hide()
        }, 500);
    }
}

const itemsPaginateComputed = computed(() => {
    return allItems.value
})

async function itemInfos(id) {
    try {
        const itemInfos = allItems.value.find(item => item.id === id);
        item.value = itemInfos;
        show.value = true;
    } catch (error) {
        toast.error('Erro ao carregar as informações do item');
    }
}

function toggleModal() {
    show.value = !show.value;
}

function editItem(id) {
    show.value = false;
    id = id + '-dashboard'
    router.push({ name: 'items', params: { itemId: id } });
}

function infoDashRoute(destiny, route) {
    createMessageBox({
        title: 'Você tem certeza ?',
        message: `Gostaria de ver mais informações sobre ${destiny} ?`,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Verificar!',
        hasMask: true,
        draggable: true,
        isPointerEventsNone: true,
        isMiddle: true,
    }).then(res => {
        if (res.ok) {
            router.push({ name: route })
        }
    })
}

watch(page, async (newValue, oldValue) => {
    if (oldValue && newValue !== oldValue) {
        optionsPage.page = page.value;
        await loadDataPagination()
    }
});

async function loadDataSearch(searchText, searchField) {
    if (searchText && searchField) {
        inputConfig.searchText = searchText;
        inputConfig.searchField = searchField;
        await loadDataPagination()
    } else if (!searchText){
        inputConfig.searchText = '';
        inputConfig.searchField = '';
        await loadDataPagination()
    } else {
        inputConfig.searchText = '';
    } 
}


</script>

<style lang="scss" scoped>
a:hover {
    cursor: pointer;
    color: var(--color-primary);
    background-color: var(--color-dark);
}

i {
    text-align: center;
}

img {
    margin: 0 auto;
    height: 100%;
    max-width: 150px;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    .border-info {
        border-left: 5px solid var(--color-secondary) !important;
    }

    .border-danger {
        border-left: 5px solid #fd3550 !important;
    }

    .border-success {
        border-left: 5px solid #15ca20 !important;
    }

    .border-warning {
        border-left: 5px solid #ffc107 !important;
    }

    .bg-gradient-bloody {
        background: #f54ea2;
        background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
        background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
    }

    .bg-gradient-scooter {
        background: #17ead9;
        background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
        background: linear-gradient(45deg, #17ead9, #6078ea) !important;
    }

    .bg-gradient-ohhappiness {
        background: var(--color-primary);
        background: -webkit-linear-gradient(45deg, #00b09b, #96c93d) !important;
        background: linear-gradient(45deg, #00b09b, #96c93d) !important;

    }

    .bg-gradient-blooker {
        background: #ffdf40;
        background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
        background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
    }

    .widgets-icons-2 {
        width: 56px;
        height: 56px;
        margin: 0 auto;
        background-color: #ededed;
        font-size: 27px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 50%;

    }

}

.imageBg {
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 70%;
    z-index: -1;
}
</style>