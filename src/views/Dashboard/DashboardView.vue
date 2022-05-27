<template>
    <div class="container">
        <!-- Inicio da seção cards do dashboard  -->
        <section class="row">
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
                :key="item.codPatrimonio"
                >
                <template v-slot="card"></template>
                <template v-slot:title>
                    <p class="text-center" :class="item.collaborator ? 'loaned' : 'avaliable'">
                        {{ item.codPatrimonio + ' - ' + item.title }}
                    </p>
                </template>
                <template v-slot:img><img :src="item.url" class="imageBg "></template>
                <template v-slot:collab>
                    <p 
                        
                        :class="item.collaborator ? 'card-status-loaned' : 'card-status-avaliable'"
                        v-text="item.collaborator ? item.collaborator : 'Disponível'"></p>
                </template>
    
                <template v-slot:category><button class="btn btn-primary w-100 btndetails bg-dark">Mais detalhes</button></template>
            </cards-products>
        </section>
        <!-- Fim da seção de cards dos produtos  -->

        <!-- Inicio seção para tratamento de informações vazia  -->
        <div>
            <p class="text-danger">
                Ainda não há itens cadastrados com este <strong>código</strong> - <router-link
                    :to="{ name: 'items' }">
                    Realizar novo cadastro</router-link>
            </p>
            <p class="text-danger">
                Ainda não há items cadastrados no sistema - <router-link :to="{ name: 'items' }">Realizar novo
                    cadastro
                </router-link>
            </p>
        </div>
        <!-- Fim da seção para tratamento de informações vazia  -->
    </div>
</template>

<script setup>
import CardsDashboard from './components/CardsDashboard.vue';
import CardsProducts from './components/CardsProducts.vue';
import { ref, computed } from 'vue'
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


</script>

<style lang="scss" scoped>


.imageBg{
  pointer-events: none;
  position: absolute;
  right: 0;
    left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  z-index: -1;
}

.card-status-loaned {
  background: #00fa21;
  background: -webkit-linear-gradient(to right, var(--color-secondary), var(--color-primary));
  background: -webkit-gradient(linear, left top, right top, from(var(--color-secondary)), to(var(--color-primary)));
  background: -webkit-linear-gradient(left, var(--color-secondary), var(--color-primary));
  background: -o-linear-gradient(left, var(--color-secondary), var(--color-primary));
  background: linear-gradient(to right, var(--color-secondary), var(--color-primary));
  -webkit-box-shadow: 0 0 10px var(--color-secondary);
  box-shadow: 0 0 10px var(--color-secondary);
}

.card-status-avaliable{
  background: #00fa21;
  background: -webkit-linear-gradient(to right, #5adf91, #00fa21);
  background: -webkit-gradient(linear, left top, right top, from(#5adf91), to(#00fa21));
  background: -webkit-linear-gradient(left, #5adf91, #00fa21);
  background: -o-linear-gradient(left, #5adf91, #00fa21);
  background: linear-gradient(to right, #5adf91, #00fa21);
  -webkit-box-shadow: 0 0 20px greenyellow;
  box-shadow: 0 0 20px greenyellow;  
}

</style>