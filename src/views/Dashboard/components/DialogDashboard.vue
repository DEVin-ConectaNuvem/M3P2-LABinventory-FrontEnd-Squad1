<template>
    <div>
        <m-dialog v-model="showModal" title="Informações Adicionais" class="modal" width="600px" padding="50px">
            <div class="row text-center">
                <div class="col-sm-12 col-md-6">
                    <img :src="item.url" class="border imagemLoan" alt="imagem do item">
                </div>
                <div class="col-sm-12 col-md-6 ml-0">
                    <p> <strong>Item:</strong> <br> <span class="badge bg-secondary">{{ item.title }}</span></p>
                    <div class="justify-left">
                        <p><strong>Categoria:</strong> {{ item.category }}</p>
                        <p><strong>Marca:</strong> {{ item.brand }}</p>
                        <p><strong>Modelo:</strong> {{ item.model }}</p>
                        <p><strong>Valor:</strong> R${{ item.value }}</p>
                        <p><strong>Status:</strong> <span
                                :class="item.collaborator ? 'badge bg-primary' : 'badge bg-success'"> {{
                                        item.collaborator ?
                                            item.collaborator : 'Disponível'
                                }}</span></p>
                    </div>
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
                <button class="btn btn-secondary me-2" @click="$emit('closeModal')">Cancelar</button>
                <button class="btn btn-primary" @click="$emit('editItem', item.id)"><i
                        class="fa-solid fa-pen-to-square"></i>
                    Editar Item</button>
            </template>
        </m-dialog>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    }
});

const showModal = computed(() => props.show);

defineEmits(['closeModal', 'editItem'])

</script>

<style scss scoped>

img {
    margin: 0 auto;
    height: 100%;
    max-width: 150px;
}
</style>