<template>
  <div class="container">
    <h4 class="mb-3">Preencha os campos para cadastrar um novo item</h4>
    <VeeForm @submit="onValidSubmit" v-slot="{ errors }" @invalid-submit="onInvalidSubmit" class="formCadastro">
      <div class="row mb-1">
        <h3>Dados do item</h3>
        <hr />
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Código de Patrimônio <span>*</span></label>
          <Veefield type="text" name="codPatrimonio" class="form-control" placeholder="Nome completo"
            v-model.trim="form.codPatrimonio" required :class="{ 'is-invalid': errors.codPatrimonio }"
            :rules="required" />
          <div class="invalid-feedback">{{ errors.codPatrimonio }}</div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Título do item <span>*</span></label>
          <Veefield type="text" name="title" class="form-control" placeholder="Titulo do item" v-model.trim="form.title"
            required v-focus :class="{ 'is-invalid': errors.title }" :rules="required" />
          <div class="invalid-feedback">{{ errors.title }}</div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Categoria <span>*</span></label>
          <Veefield as="select" name="category" class="form-select" v-model="form.category" required
            :class="{ 'is-invalid': errors.category }" :rules="required">
            <option value="" disabled>Escolha a categoria</option>
            <option value="Computador">Computador</option>
            <option value="Periférico">Periférico</option>
            <option value="Monitor">Cadeira</option>
            <option value="Monitor">Outros</option>
          </Veefield>
          <div class="invalid-feedback">{{ errors.category }}</div>
        </div>
      </div>
      <h4 class="mt-3">Dados Complementares</h4>
      <hr>
      <div class="row mb-1">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <label class="form-label">Valor <span>*</span></label>
          <Veefield type="text" name="value" class="form-control" placeholder="Valor do item" v-model.trim="form.value"
            required :class="{ 'is-invalid': errors.value }" :rules="validateNumber" />
          <div class="invalid-feedback">{{ errors.value }}</div>
        </div>

        <div class="col-sm-12 col-md-4">
          <label class="form-label">Marca <span>*</span></label>
          <Veefield type="text" name="brand" class="form-control" placeholder="Marca do item" v-model.trim="form.brand"
            required :class="{ 'is-invalid': errors.brand }" :rules="required" />
          <div class="invalid-feedback">{{ errors.brand }}</div>
        </div>
        <div class="col-sm-12 col-md-4 ">
          <label class="form-label">Modelo <span>*</span></label>
          <Veefield type="text" name="model" class="form-control" placeholder="Modelo do item" v-model.trim="form.model"
            required :class="{ 'is-invalid': errors.model }" :rules="required" />
          <div class="invalid-feedback">{{ errors.model }}</div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-sm-12 col-md-6">
          <label class="form-label">Descrição do item<span>*</span></label>
          <textarea name="description" rows="3" v-model="form.description" required
            placeholder="Digite as especificações do item" class="form-control"></textarea>
        </div>
        <div class="col-sm-12 col-md-6">

          <label class="form-label">Url (imagem do produto) <span>*</span></label>
          <Veefield type="text" name="url" class="form-control" placeholder="url imagem do item" v-model.trim="form.url"
            required :class="{ 'is-invalid': errors.url }" :rules="required" />
          <div class="invalid-feedback">{{ errors.url }}</div>
          <img :src="form.url" alt="" class="img-fluid text-center" width="120">
        </div>

      </div>

      <div class="text-end">
        <button type="reset" @click="cancelEdit()" class="btn btn-danger me-2 mt-2">Cancelar</button>
        <button type="submit" class="mt-2 btn btn-success" v-text="btnForm"></button>

      </div>


    </VeeForm>
  </div>
</template>

<script setup>
import { uid } from "uid";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import ToastNotification from "./components/ToastNotification.vue";
import { useRoute, useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import { Form as VeeForm, Field as Veefield } from "vee-validate";
import { required, validateNumber } from "../../validators/validators";
import moment from "moment";

/* 
variaveis funcionais gerais 
*/

const store = useStore();
const route = useRoute();
const $loading = useLoading();
const toast = useToast();

const router = useRouter();

const content = {
  component: ToastNotification,
  listeners: {
    listItems: () => {
      toast.clear();
      router.push({ name: "listItems" });
    },
  },
};

// botão de submit do formulário
const btnForm = ref("Cadastrar");

// variaveis do formulários - reativas (data)
const form = ref({
  codPatrimonio: "",
  title: "",
  description: "",
  category: "",
  value: "",
  url: "",
  brand: "",
  model: "",
  collaborator: "",
  createdAt: moment().format("llll"),
  updatedAt: "",
});

/* 
Funções para submit do formulário
*/
//função executada quando o formulário for submetido com sucesso
function onValidSubmit(values, actions) {
  newItem(actions);
  /* if (infoById.value) {
    editItem(actions);
  } else {
    newItem(actions);
  } */
}

//função executada quando houver erros no formulário submetido
function onInvalidSubmit({ errors }) {
  for (let field in errors) {
    toast.error(errors[field], { timeout: 1500 });
  }
}

// função para registrar novo item
function newItem(actions) {
  const loader = $loading.show();
  setTimeout(() => {
    form.value.codPatrimonio = "i" + uid(4);
    form.value.updatedAt = moment().format("llll");
    store.dispatch("itemsModule/registerItem", form.value);
    actions.resetForm();
    loader.hide();
    toast(content, {
      position: "top-right",
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      closeButton: "button",
      icon: "fas fa-rocket",
      rtl: false,
    });
  }, 1000);
}

// Função para editar o item
function editItem(actions) {
  /*  const loader = $loading.show();
   setTimeout(() => {
     console.log(form.value.name);
     store.dispatch("collaboratorModule/editCollaborator", form.value);
     actions.resetForm();
     loader.hide();
     toast.success("Colaborador editado com sucesso!");
     router.push({ name: "ListCollaborators" });
   }, 2000); */
}
/* 
// Função para cancelar a edição do colaborador
function cancelEdit() {
  toast.warning("Edição cancelada!", { timeout: 1000 });
  router.push({ name: "ListCollaborators" });
} */


</script>

<style lang="scss" scoped>
.formCadastro {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .form-label {
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--color-dark);
  }

  span {
    color: var(--color-danger);
    font-size: 1rem;
    font-weight: bold;
  }
}
</style>
