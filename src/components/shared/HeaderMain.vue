<template>
    <header class="p-3 mb-3 border-bottom ">
        <div class=" d-flex">
            <div class="text-white fs-5 ms-3">
                <i class="fa-solid fa-boxes-stacked"></i>
                Inventário
            </div>
            <div class="dropdown text-end ">
                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="avatar">
                    <vue-gravatar class="avatar" :email="logged.email" size="40" />
                    </div>
                    <!-- <img src="../../assets/icons/account-avatar-profile-user-13-svgrepo-com.svg" width="32" height="32"
                        class="rounded-circle me-2"> -->
                    <strong v-text="logged.email"></strong>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                   <!--  <li><a class="dropdown-item" href="#">Configurações</a></li>
                    <li><a class="dropdown-item" href="#">Perfil</a></li> -->
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" @click="logOut()">Deslogar</a></li>
                </ul>
            </div>
        </div>
    </header>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { ref, computed} from 'vue';

const store = useStore()
const router = useRouter()

const logged = computed(() => {
    return store.state.authModule.userLogged
})



function logOut() {
    store.dispatch('authModule/logOut')
    router.push({name: 'login'})
}



</script>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 4rem;
    background-color: var(--color-dark);
}

.avatar{
    border-radius: 10px;
    margin-right: 0.2rem;
}

i {
    background: var(--color-dark);
    background: -webkit-linear-gradient(to right, var(--color-primary), var(--color-dark));
    background: linear-gradient(to right, var(--color-primary), var(--color-dark));
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.dropdown {
    position: absolute;
    right: 0;
    margin-right: 10px;
}
</style>