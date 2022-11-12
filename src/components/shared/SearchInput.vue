<template>
    <div class="input-group">
        <input data-testid="search-input-item" type="text" class="w-75 form-control animate__animated animate__flipInX"
            placeholder="✍️ Buscar item..." v-model="inputSearch" />
        <select class="badge bg-dark text-white text-center" v-model="selectedOption">
            <option v-for="opt in options" :value="opt.value" v-text="opt.text"></option>
        </select>
    </div>
</template>

<script setup>
import { defineProps, computed, ref, defineEmits, onMounted, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
    options: {
        type: Array,
        required: false
    }
})
const emit = defineEmits(['returnData'])
const inputSearch = ref('')
const options = computed(() => props.options)
const selectedOption = ref('')

watchDebounced(
    inputSearch,
    () => {
        emit('returnData', inputSearch.value, selectedOption.value)
    },
    { debounce: 500, maxWait: 3000 }
)

watch(selectedOption, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        emit('returnData', inputSearch.value, selectedOption.value)
    }
})

watch(inputSearch, (newValue, oldValue) => {
    if (!newValue) {
        emit('returnData', null, selectedOption.value)
    }
})

onMounted(() => {
    selectedOption.value = options.value[0].value
})
</script>

<style scss scoped>

</style>
