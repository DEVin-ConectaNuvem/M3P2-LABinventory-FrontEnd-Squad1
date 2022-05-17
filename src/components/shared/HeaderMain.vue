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
    background-color: #373B44
}

i {
    background: #373B44;
    background: -webkit-linear-gradient(to right, #4286f4, #373B44);
    background: linear-gradient(to right, #4286f4, #373B44);
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