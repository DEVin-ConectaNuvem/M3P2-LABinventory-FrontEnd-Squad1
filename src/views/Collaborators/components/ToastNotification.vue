<template>
    <div class="text-center">
        <div class="row">
            <p>Cadastro de colaborador realizado com sucesso!</p>
        </div>
        <div>
            <button class="btn btn-success" @click="$emit('close-toast')">Cadastrar novo colaborador</button>
        </div>
        <button class="btn btn-secondary mt-2" @click="$emit('listCollabs')">Listar colaboradores</button>
    </div>
</template>
