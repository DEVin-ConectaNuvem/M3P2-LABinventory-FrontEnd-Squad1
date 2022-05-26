<template>
    <div class="text-center">
        <div class="row">
            <p>Cadastro de item realizado com sucesso!</p>
        </div>
        <div>
            <button class="btn btn-success" @click="$emit('close-toast')">Cadastrar novo item</button>
        </div>
        <button class="btn btn-secondary mt-2" @click="$emit('listItems')">Listar item</button>
    </div>
</template>
