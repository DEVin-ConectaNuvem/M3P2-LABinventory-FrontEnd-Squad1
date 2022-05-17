<template>
    <header class="p-3 mb-3 border-bottom bg-dark ">
        <div class=" d-flex">
            <div class="text-white fs-5 ms-3">
                <i class="fa-solid fa-boxes-stacked"></i>
                Inventário
            </div>
            <div class="dropdown text-end ">
                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="../../assets/icons/account-avatar-profile-user-13-svgrepo-com.svg" width="32" height="32"
                        class="rounded-circle me-2">
                    <strong>Usuário</strong>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a class="dropdown-item" href="#">Configurações</a></li>
                    <li><a class="dropdown-item" href="#">Perfil</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#">Deslogar</a></li>
                </ul>
            </div>
        </div>
    </header>

</template>

<script setup>

</script>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 60px;
}

i {
    background: #373B44;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4286f4, #373B44);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4286f4, #373B44);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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