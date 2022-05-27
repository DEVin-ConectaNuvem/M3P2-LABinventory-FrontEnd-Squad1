<template>
    <div class="container">
        <div class="row">
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3">
                <template v-slot:icon></template>
                <template v-slot:count>50</template>
                <template v-slot:title>Colaboradores</template>
                <template v-slot:infos>Número de colaboradores</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3">
                <template v-slot:icon></template>
                <template v-slot:count>50</template>
                <template v-slot:title>Itens</template>
                <template v-slot:infos>Números de itens</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3">
                <template v-slot:icon></template>
                <template v-slot:count>50</template>
                <template v-slot:title>Valores</template>
                <template v-slot:infos>Valor total de items</template>
            </cards-dashboard>
            <cards-dashboard class="col-sm-12 col-md-6 col-lg-3">
                <template v-slot:icon></template>
                <template v-slot:count>50</template>
                <template v-slot:title>Empréstimos</template>
                <template v-slot:infos>Número de empréstimos</template>
            </cards-dashboard>
        </div>

        <hr>
        <h5>Busca de itens</h5>
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

        <div class="mt-2 gap-2 row">
            <cards-products class="col-sm-12 col-md-6 col-lg-3 col-xxl-3" v-for="item in items"
                :key="item.codPatrimonio">
                <template v-slot:img><img :src="item.url" class="img-fluid" alt=""></template>
                <template v-slot:title>{{ item.title }}</template>
                <template v-slot:collaborator>
                    <vue-gravatar class="img-fluid card__thumb" :email="emailColab(item.collaborator)" />
                </template>
                <template v-slot:codigo>Código: {{ item.codPatrimonio }}</template>
                <template v-slot:category>Categoria: {{ item.category }}</template>
                <template v-slot:status>Emprestado para: <p class="text-center fs-6"
                        :class="item.collaborator ? 'loaned' : 'avaliable'"
                        v-text="item.collaborator ? item.collaborator : 'Disponível'"></p> </template>
            </cards-products>

        </div>

        <div>
            <p class="text-danger">
                Ainda não há itens cadastrados com este <strong>código</strong> - <router-link
                    :to="{ name: 'colaboradores' }">
                    Realizar novo cadastro</router-link>
            </p>
            <p class="text-danger">
                Ainda não há items cadastrados no sistema - <router-link :to="{ name: 'colaboradores' }">Realizar novo
                    cadastro
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import CardsDashboard from './components/CardsDashboard.vue';
import CardsProducts from './components/CardsProducts.vue';
import { ref, computed, onMounted } from 'vue'
import { useStore } from "vuex";

const store = useStore();

store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");
store.commit("itemsModule/UPDATE_ITEMS_LOCAL_STORAGE");

const itemsCount = computed(() => {
    return store.state.itemsModule.items.length;
})

const items = computed(() => {
    return store.state.itemsModule.items;
})

onMounted(() => {
  


})


function emailColab(collaborator) {
    if (collaborator) {
        store.state.collaboratorModule.collaborators.forEach(collab => {
            if (collab.name == collaborator) {
                console.log(collab.email);
                return collab.email;
            }
        })
    } else {
        return "";
    }
}


</script>

<style lang="scss" scoped>
.loaned {
    background-color: #06458d;
    color: #fff;
    border-radius: 10px;
    padding: 0 10px;
}

.avaliable {
    background-color: rgb(34, 185, 46);
    color: #fff;
    border-radius: 50px;
    padding: 0 10px;
}

.card__thumb {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>