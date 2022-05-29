<template>
    <div class="container mt-3">
        <!-- Inicio da seção cards do dashboard  -->
        <section class="row cards">
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3 border-info "
                @click="infoDashRoute('colaboradores', 'ListCollaborators')">
                <template v-slot:icon><i class="widgets-icons-2 bg-gradient-scooter fa-solid fa-users"></i></template>
                <template v-slot:count>{{ tweenedCollabs.number.toFixed(0) }}</template>
                <template v-slot:title>Colaboradores</template>
                <template v-slot:infos>Total colaboradores</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3 border-danger" @click="infoDashRoute('itens', 'listItems')">
                <template v-slot:icon><i
                        class="widgets-icons-2 bg-gradient-bloody fa-solid fa-boxes-stacked"></i></template>
                <template v-slot:count>{{ tweendItems.number.toFixed(0) }}</template>
                <template v-slot:title>Itens</template>
                <template v-slot:infos>Números de itens</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3 border-success"
                @click="infoDashRoute('itens', 'listItems')">
                <template v-slot:icon><i
                        class="widgets-icons-2 bg-gradient-ohhappiness  fa-solid fa-sack-dollar"></i></template>
                <template v-slot:count>R$ {{ tweenedValueTotal.number.toFixed(2) }}</template>
                <template v-slot:title>Valores</template>
                <template v-slot:infos>Valor total de items</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3 border-warning"
                @click="infoDashRoute('empréstimos', 'listItems')">
                <template v-slot:icon>
                    <i class="widgets-icons-2 bg-gradient-blooker fa-solid fa-arrow-right-arrow-left "></i>
                </template>
                <template v-slot:count>{{ tweenedItemsLoaned.number.toFixed(0) }}</template>
                <template v-slot:title>Empréstimos</template>
                <template v-slot:infos>Nº de empréstimos</template>
            </cards-dashboard>
        </section>
        <!-- Fim da seção de cards do dashboard  -->

        <!-- Inicio Formulário de busca  -->
        <h4>Busca de itens</h4>
        <div class="content input-group">
            <input type="text" class="w-75 form-control animate__animated animate__flipInX"
                placeholder="✍️ Buscar item..." v-model="inputSearch">
            <select class="badge bg-dark text-white text-center" v-model="findBy">
                <option value="codPatrimonio" selected>Código</option>
                <option value="title">Nome</option>
                <option value="category">Categoria</option>
                <option value="collaborator">Colaborador</option>
            </select>
        </div>
        <!-- Fim formulário de busca  -->

        <!-- Inicio seção de cards dos produtos  -->
        <section class="row">
            <cards-products class="col-sm-12 col-md-6 col-lg-3 col-xxl-3 animate__animated animate__fadeIn"
                v-for="item in items" :key="item.codPatrimonio" @click="itemInfos(item.codPatrimonio)">
                <template v-slot="card"></template>
                <template v-slot:title>
                    <p class="text-center" :class="item.collaborator ? 'loaned' : 'avaliable'">
                        {{ item.codPatrimonio + ' - ' + item.title }}
                    </p>
                </template>
                <template v-slot:img><img :src="item.url" class="imageBg "></template>
                <template v-slot:collab>
                    <p :class="item.collaborator ? 'text-bg-primary' : 'text-bg-success'"
                        v-text="item.collaborator ? item.collaborator : 'Disponível'"></p>
                </template>

                <template v-slot:category><button class="btn btn-primary w-100 btndetails bg-dark">Mais
                        detalhes</button></template>
            </cards-products>
        </section>
        <!-- Fim da seção de cards dos produtos  -->

        <!-- Inicio seção para tratamento de informações vazia  -->
        <div class="mt-3">
            <p class="text-danger" v-if="items.length === 0 && inputSearch">
                Ainda não há itens cadastrados com este <strong>termo de pesquisa</strong> - <router-link
                    :to="{ name: 'items' }">
                    Realizar novo cadastro</router-link>
            </p>
            <p class="text-danger" v-if="items.length === 0">
                Ainda não há items cadastrados no sistema - <router-link :to="{ name: 'items' }">Realizar novo
                    cadastro
                </router-link>
            </p>
        </div>
        <!-- Fim da seção para tratamento de informações vazia  -->

        <!-- Inicio da seção do Modal para exibição das informações do produto -->
        <m-dialog v-model="show" title="Informações Adicionais">
            <div class="row text-center">
                <div class="col-sm-12 col-md-6">
                    <img :src="item.url" class="border imagemLoan" alt="imagem do item">
                </div>
                <div class="col-sm-12 col-md-6 ml-0">
                    <p> <strong>Item:</strong> <br> <span class="badge bg-secondary">{{ item.title }}</span></p>
                    <p><strong>Categoria:</strong> {{ item.category }}</p>
                    <p><strong>Marca:</strong> {{ item.brand }}</p>
                    <p><strong>Modelo:</strong> {{ item.model }}</p>
                    <p><strong>Valor:</strong> R${{ item.value }}</p>
                    <p><strong>Status:</strong> <span
                            :class="item.collaborator ? 'badge bg-primary' : 'badge bg-success'"> {{ item.collaborator ?
                                    item.collaborator : 'Disponível'
                            }}</span></p>
                </div>
                <div class="mt-1">
                    <hr class="text-success mb-1">
                    <p class="text-start">
                        <strong>Descrição:</strong>
                        <br>
                        <span class="fw-light text-break">
                            {{ item.description }}
                        </span>
                    </p>
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-secondary me-2" @click="toggleModal">Cancelar</button>
                <button class="btn btn-primary" @click="editItem(item.codPatrimonio)"><i
                        class="fa-solid fa-pen-to-square"></i> Editar Item</button>
            </template>
        </m-dialog>
        <!-- Fim da seção do Modal para exibição das informações do produto -->

    </div>
</template>

<script setup>
import CardsDashboard from './components/CardsDashboard.vue';
import CardsProducts from './components/CardsProducts.vue';
import { ref, computed, reactive, watch } from 'vue'
import { useStore } from "vuex";
import { gsap } from "gsap";
import { RouterLink, useRouter } from "vue-router";
import { createMessageBox } from 'vue-m-dialog'

// variaveis globais
const router = useRouter();
const store = useStore();
const show = ref(false);
const showDashboard = ref(true);
const item = ref({});
const findBy = ref("codPatrimonio");
const inputSearch = ref(null);


store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");
store.commit("itemsModule/UPDATE_ITEMS_LOCAL_STORAGE");
store.commit('configModule/SET_PAGE_NAME', 'Dashboard')

// variaveis computadas
const items = computed(() => {
    if (inputSearch.value) {
        let total = store.state.itemsModule.items.filter(
            (item) =>
                findBy.value === 'codPatrimonio'
                    ? item[findBy.value] === Number(inputSearch.value)
                    : item[findBy.value]?.toLowerCase().includes(inputSearch.value.toLowerCase())
        );
        return total;
    } else {
        return store.state.itemsModule.items;
    }
});

const itemsCount = computed(() => {
    return store.state.itemsModule.items;
})
const collabsCount = computed(() => {
    return store.state.collaboratorModule.collaborators;
})
const valueTotalItems = computed(() => {
    return store.state.itemsModule.items.reduce((acc, item) => {
        acc += parseFloat(item.value);
        return acc;
    }, 0);
})
const itemsLoaned = computed(() => {
    return store.state.itemsModule.items.filter(item => item.collaborator !== null);
})

//variaveis para efeito de animação
const tweenedCollabs = reactive({
    number: 0
})
const tweendItems = reactive({
    number: 0
})
const tweenedValueTotal = reactive({
    number: 0
})
const tweenedItemsLoaned = reactive({
    number: 0
})

function itemInfos(codPatrimonio) {
    item.value = store.state.itemsModule.items.find((item) => item.codPatrimonio === codPatrimonio)
    show.value = true
}

// função para animação de itens
gsap.to(tweenedCollabs, { duration: 1, number: Number(collabsCount.value.length) || 0 })
gsap.to(tweendItems, { duration: 1, number: Number(itemsCount.value.length) || 0 })
gsap.to(tweenedValueTotal, { duration: 1, number: Number(valueTotalItems.value) || 0 })
gsap.to(tweenedItemsLoaned, { duration: 1, number: Number(itemsLoaned.value.length) || 0 })

// função para exibir/ocultar modal
function toggleModal() {
    show.value = !show.value;
}

// função para abrir tela de edição de item
function editItem(id) {
    show.value = false;
    id = id + '-dashboard'
    router.push({ name: 'items', params: { itemId: id } });
}

// função para abrir telas relativas aos cards do dashboard
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