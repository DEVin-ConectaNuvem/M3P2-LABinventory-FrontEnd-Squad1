<template>
    <header class="p-3">
        <div class="d-flex">
            <div class="toggleVisible align-items-center d-flex">
                <i class="fa-solid fa-bars fs-2 text-white" @click="toggleVisibility"></i>
            </div>
            <div>
                <img src="../../assets/icons/logoInventary.svg" class="ms-3 imgLogo animate__animated animate__bounceIn"
                    alt="LABInventary" :class="isVisible ? 'd-none' : 'd-block'">
            </div>
            <div class=" d-flex align-items-center text-white flex-grow-1 ">
            <div class="text-white text-center namePage">
                <strong> {{ namePage }} </strong>
            </div>
            <div class="text-end ">
                <a href="#" class="d-flex align-items-center text-decoration-none text-white dropdown-toggle"
                    id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <strong v-text="logged.username" class="username"></strong>
                    <div class="ms-2 avatar">
                        <vue-gravatar class="avatar" :email="logged.email" size="40" />
                    </div>
                </a>
                <ul class="dropdown-menu text-white text-small shadow">
                    <li><a class="dropdown-item text-white" @click="logOut()">Sair</a></li>
                </ul>
            </div>
            </div>
        </div>
    </header>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()
const router = useRouter()


const namePage = computed(() => {
    return store.state.configModule.configs.pageName
})

const isVisible = computed(() => {
    return store.state.configModule.configs.sidebarVisible;
})
const logged = computed(() => {
    return store.state.authModule.userLogged
})


function toggleVisibility() {
    store.dispatch('configModule/toggleSidebar')
}

function logOut() {
    isVisible.value ? store.dispatch('configModule/toggleSidebar') : ''
    store.dispatch('authModule/logOut')
    router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    background: -webkit-linear-gradient(to right, rgb(47, 0, 96), rgb(141, 77, 171));
    background: linear-gradient(to right, rgb(47, 0, 96), rgb(141, 77, 171));
}

.namePage {
    margin: 0 auto;
}

i {
    cursor: pointer;
}

.toggleVisible {
    z-index: 9999;
}

.imgLogo {
    width: 50px;
}

.avatar {
    border-radius: 20px;
}

i {
    background: white;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.dropdown-menu {
    background-color: var(--color-dark);

    a:hover {
        background-color: var(--color-secondary);
    }
}

.dropdown {
    position: absolute;
    right: 0;
    margin-right: 10px;
}

@media (max-width: 576px) {
    .username {
        display: none;
    }

    .namePage {
       
       margin: 0 auto;
      
        
    }
}
</style>