<template>
    <div v-if="statusLoading">
        <div class="loading">
            <div class="loading__spinner">
                <img src="../../assets/icons/rocket.gif" alt="">   
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const statusLoading = computed(() => {
    return store.state.configModule.configs.loading || false
})

</script>

<style lang="scss" scoped>
.loading{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 99999;
    .loading__spinner{
        img{
            width: 700px;
            height: 700px;
        }
    }
}
</style>