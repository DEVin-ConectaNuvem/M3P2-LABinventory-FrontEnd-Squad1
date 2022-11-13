<template>
  <div class="container mt-3">
    <h4 class="mb-3">Preencha os campos para cadastrar/editar um item</h4>
    <VeeForm
      data-testid="vue-toast-info"
      @submit="onValidSubmit"
      v-slot="{ errors }"
      @invalid-submit="onInvalidSubmit"
      class="formCadastro animate__animated animate__fadeIn"
    >
      <div class="row mb-1">
        <h3>Dados do item</h3>
        <hr />
        <div class="col-sm-12 col-md-6 col-lg-3">
          <label class="form-label">Cód. de Patrimônio <span>*</span></label>
          <input type="text" name="id" class="form-control" placeholder="Cód. automatico" v-model="form.id" disabled />
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Título do item <span>*</span></label>
          <Veefield
            data-testid="input-title"
            type="text"
            name="title"
            class="form-control"
            placeholder="Titulo do item"
            v-model.trim="form.title"
            required
            v-focus
            :class="{ 'is-invalid': errors.title }"
            :rules="required"
            maxlength="30"
            data-testid="item-title"
          />
          <div class="invalid-feedback animate__animated animate__shakeX">
            {{ errors.title }}
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Categoria <span>*</span></label>
          <Veefield
            data-testid="input-category"
            as="select"
            name="category"
            class="form-select"
            v-model="form.category"
            required
            :class="{ 'is-invalid': errors.category }"
            :rules="required"
            data-testid="item-category"
          >
            <option value="" disabled>Escolha a categoria</option>
            <option value="Computador">Computador</option>
            <option value="Periférico">Periférico</option>
            <option value="Monitor">Cadeira</option>
            <option value="Monitor">Outros</option>
          </Veefield>
          <div class="invalid-feedback animate__animated animate__shakeX">
            {{ errors.category }}
          </div>
        </div>
      </div>

      <h4 class="mt-3">Dados Complementares</h4>
      <hr />
      <div class="row mb-1">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <label class="form-label">Valor <span>*</span></label>
          <Veefield
            data-testid="input-value"
            type="number"
            name="value"
            class="form-control"
            placeholder="Valor do item"
            v-model.trim="form.value"
            required
            :class="{ 'is-invalid': errors.value }"
            :rules="validateNumber"
            data-testid="item-value"
          />
          <div class="invalid-feedback animate__animated animate__shakeX">
            {{ errors.value }}
          </div>
        </div>

        <div class="col-sm-12 col-md-4">
          <label class="form-label">Marca <span>*</span></label>
          <Veefield
            data-testid="input-brand"
            type="text"
            name="brand"
            class="form-control"
            placeholder="Marca do item"
            v-model.trim="form.brand"
            data-testid="item-brand"
            required
            :class="{ 'is-invalid': errors.brand }"
            :rules="required"
            maxlength="30"
          />
          <div class="invalid-feedback animate__animated animate__shakeX">
            {{ errors.brand }}
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <label class="form-label">Modelo <span>*</span></label>
          <Veefield
            data-testid="input-model"
            type="text"
            name="model"
            class="form-control"
            placeholder="Modelo do item"
            data-testid="item-model"
            v-model.trim="form.model"
            required
            :class="{ 'is-invalid': errors.model }"
            :rules="required"
            maxlength="30"
          />
          <div class="invalid-feedback animate__animated animate__shakeX">
            {{ errors.model }}
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-sm-12 col-md-6">
          <label class="form-label"
            >Selecione uma imagem <span>*</span></label
          >
          <upload-box fileProps='image' @file-ready="teste"></upload-box>
        </div>
        <div class="col-sm-12 col-md-6">
          <label class="form-label">Descrição do item<span>*</span></label>
          <textarea
            name="description"
            rows="3"
            v-model="form.description"
            required
            placeholder="Digite as especificações do item"
            class="form-control"
            maxlength="180"
            data-testid="item-description"
          ></textarea>
        </div>
      </div>

      <div class="text-end">
        <button :type="id ? 'button' : 'reset'" @click="id ? cancelEdit() : ''" class="btn btn-secondary me-2 mt-2"
          v-text="id ? 'Cancelar' : 'Limpar'"></button>
        <button type="submit" class="mt-2 btn" :class="id ? 'btn-primary' : 'btn-success'"
          v-text="id ? 'Editar' : 'Cadastrar'" data-testid='button-reg'></button>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useAxios } from "../../hooks"
import { useToast } from "vue-toastification";
import ToastNotification from "../../components/shared/ToastNotification.vue";
import UploadBox from "../../components/shared/UploadBox.vue";
import { useRoute, useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import { Form as VeeForm, Field as Veefield } from "vee-validate";
import { required, validateNumber } from "../../validators/validators";
import moment from "moment";
const store = useStore();
const route = useRoute();
const $loading = useLoading();
const toast = useToast();
const router = useRouter();
const { axios } = useAxios();
const toastInfo = reactive({
  msg: "Cadastro de colaborador realizado com sucesso!",
  buttonNew: "Cadastrar novo colaborador",
  buttonList: "Listar colaboradores",
});
const content = {
  component: ToastNotification,
  props: toastInfo,
  listeners: {
    listCollabs: () => {
      toast.clear();
      router.push({ name: "listItems" });
    },
    closeToast: () => {
      toast.clear();
    },

  },
};
const id = route.params.itemId ? Number(route.params.itemId.split('-')[0]) : null;
const origin = id ? route.params.itemId.split('-')[1] : null;
const form = ref({
  id: null,
  title: null,
  description: null,
  category: null,
  value: null,
  url: null,
  brand: null,
  model: null,
  collaborator: null,
  createdAt: null,
  updatedAt: null,
  loanAt: null,
});
const newForm = ref({});
const url = ref(null);

onMounted(async () => {
  store.commit('configModule/SET_PAGE_NAME', 'Criação e edição de itens');
  if (id) {
    const dataForm = await getInfoItemById(id);
    if (dataForm) {
      form.value = dataForm;
    }
  }
});

async function getInfoItemById(id) {
  const loader = $loading.show();
  try {
    const res = await axios.get(
      `/items/${id}`
    );
    return res.data;
  } catch (error) {
    toast.error("Erro ao buscar item", content);
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

async function onValidSubmit(values, actions) {
  newForm.value = { ...values }
  if (id) {
    await editItem(actions);
  } else { 
    await newItem(actions);
  }
  actions.resetForm();
}

function onInvalidSubmit({ errors }) {
  for (let field in errors) {
    toast.error(errors[field], { timeout: 1500 });
  }
}

async function newItem() {
  const loader = $loading.show();
  try {
    newForm.value.updatedAt = moment().format("llll");
    const res = await axios.post(
      "/items",
      newForm.value
    );
    if (res.status === 201) {
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
    }
    clearForm()
  } catch (error) {
    toast.error(error.message, { timeout: 1500 });
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

async function editItem() {
  const loader = $loading.show();
  try {
    newForm.value.updatedAt = moment().format("llll");
    const res = await axios.put(
      `/items/${id}`,
      newForm.value
    );
    if (res.status === 200) {
      toast.success("Item editado com sucesso", content);
    }
    origin === 'list' ? router.push({ name: "listItems" }) : router.push({ name: "dashboard" });
  } catch (error) {
    toast.error(error.message, { timeout: 1500 });
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

function clearForm() {
  form.value.id = '';
  form.value.description = '';
  url.value = null;
}

function cancelEdit() {
  toast.warning("Edição cancelada!", { timeout: 1000 });
  origin === 'list' ? router.push({ name: "listItems" }) : router.push({ name: "dashboard" });
}

function teste(objeto){
  console.log(objeto)
} 
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
