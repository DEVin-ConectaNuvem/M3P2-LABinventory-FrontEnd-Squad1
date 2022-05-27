<template>
    <div class="container">
        <!-- Inicio da seção cards do dashboard  -->
        <section class="row">
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3">
                <template v-slot:icon></template>
                <template v-slot:count>{{ tweenedCollabs.number.toFixed(0) }}</template>
                <template v-slot:title>Colaboradores</template>
                <template v-slot:infos>Número de colaboradores</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3">
                <template v-slot:icon></template>
                <template v-slot:count>{{tweendItems.number.toFixed(0)}}</template>
                <template v-slot:title>Itens</template>
                <template v-slot:infos>Números de itens</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3">
                <template v-slot:icon></template>
                <template v-slot:count>R$ {{tweenedValueTotal.number.toFixed(2)}}</template>
                <template v-slot:title>Valores</template>
                <template v-slot:infos>Valor total de items</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3">
                <template v-slot:icon></template>
                <template v-slot:count>{{tweenedItemsLoaned.number.toFixed(2)}}</template>
                <template v-slot:title>Empréstimos</template>
                <template v-slot:infos>Número de empréstimos</template>
            </cards-dashboard>
        </section>
        <!-- Fim da seção de cards do dashboard  -->

        <!-- Inicio Formulário de busca  -->
        <h3>Busca de itens</h3>
        <div class="content input-group">
            <input type="text" class="w-75 form-control form-control animate__animated animate__flipInX"
                placeholder="✍️ Buscar item..." v-model="inputSearch">
            <select class="form-control bg-primary text-white text-center">
                <option value="codPatrimonio" selected disabled>Buscar item por:</option>
                <option value="codPatrimonio">Pelo Código</option>
                <option value="title">Pelo título</option>
                <option value="category">Pela Categoria</option>
                <option value="collaborator">Pelo Colaborador</option>
            </select>
        </div>
        <!-- Fim formulário de busca  -->

        <!-- Inicio seção de cards dos produtos  -->
        <section class="row">
            <cards-products class="col-sm-12 col-md-6 col-lg-3 col-xxl-3 " v-for="item in items"
                :key="item.codPatrimonio">
                <template v-slot="card"></template>
                <template v-slot:title>
                    <p class="text-center" :class="item.collaborator ? 'loaned' : 'avaliable'">
                        {{ item.codPatrimonio + ' - ' + item.title }}
                    </p>
                </template>
                <template v-slot:img><img :src="item.url" class="imageBg "></template>
                <template v-slot:collab>
                    <p :class="item.collaborator ? 'card-status-loaned' : 'card-status-avaliable'"
                        v-text="item.collaborator ? item.collaborator : 'Disponível'"></p>
                </template>

                <template v-slot:category><button class="btn btn-primary w-100 btndetails bg-dark">Mais
                        detalhes</button></template>
            </cards-products>
        </section>
        <!-- Fim da seção de cards dos produtos  -->

        <!-- Inicio seção para tratamento de informações vazia  -->
        <div>
            <p class="text-danger">
                Ainda não há itens cadastrados com este <strong>código</strong> - <router-link :to="{ name: 'items' }">
                    Realizar novo cadastro</router-link>
            </p>
            <p class="text-danger">
                Ainda não há items cadastrados no sistema - <router-link :to="{ name: 'items' }">Realizar novo
                    cadastro
                </router-link>
            </p>
        </div>
        <!-- Fim da seção para tratamento de informações vazia  -->

        <!-- Inicio da seção do Modal para exibição das informações do produto -->
        <m-dialog v-model="show" title="Informações do item">
        <hr>
            <div class="text-center fs-5">
            <p>Código de Patrimonio: 0001 </p>
            <p>Item: Celular Iphone</p>
            <p>Marca: Apple - Modelo: 11 </p>
            </div>
            <template v-slot:footer>
                <button class="m-dialog--cancel-btn" @click="show = false">Cancelar</button>
                <button class="m-dialog--confirm-btn" @click="show = false">Editar Item</button>
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



const store = useStore();
store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");
store.commit("itemsModule/UPDATE_ITEMS_LOCAL_STORAGE");

const show = ref(false);

const itemsCount = computed(() => {
    return Number(store.state.itemsModule.items.length);
})

const collabsCount = computed(() => {
    return Number(store.state.collaboratorModule.collaborators.length);
})

const items = computed(() => {
    return store.state.itemsModule.items;
})

const valueTotalItems = computed(() => {
    return store.state.itemsModule.items.reduce((acc, item) => {
            acc += parseFloat(item.value);
            return acc;
    }, 0);
})

const itemsLoaned = computed(() => {
    return store.state.itemsModule.items.filter(item => item.collaborator);
})


gsap.to(tweenedCollabs, { duration: 1, number: Number(collabsCount.value) })
gsap.to(tweendItems, { duration: 1, number: Number(itemsCount.value) })
gsap.to(tweenedValueTotal, { duration: 1, number: Number(valueTotalItems.value) })
gsap.to(tweenedItemsLoaned, { duration: 1, number: Number(itemsLoaned.value) })
</script>

<style lang="scss" scoped>
.imageBg {
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 70%;
    z-index: -1;
}

.card-status-loaned {
    background: var(--color-secondary);
    transition: 1s ease-in;
}

.card-status-avaliable {
    background: #18c22e;
    color: #fff;
 
    transition: 1s ease-out;
}
</style>