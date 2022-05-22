<template>
  <div class="container">
    <h4 class="mb-3">Preencha os campos para cadastrar um novo colaborador</h4>
    <VeeForm @submit="onValidSubmit" v-slot="{ errors }" @invalid-submit="onInvalidSubmit" class="formCadastro">
      <div class="row mb-1">
        <h3>Dados de endereço</h3>
        <hr />
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Nome completo <span>*</span></label>
          <Veefield type="text" name="name" class="form-control" placeholder="Nome completo" v-model.trim="form.name"
            required :class="{ 'is-invalid': errors.name }" :rules="validateName" v-focus />
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Genero <span>*</span></label>
          <Veefield as="select" name="gender" class="form-select" placeholder="Genero" v-model="form.gender"
            :class="{ 'is-invalid': errors.gender }" :rules="required" required>
            <option value="" disabled selectd>Escolha o gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </Veefield>
          <div class="invalid-feedback">{{ errors.gender }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Data de nascimento <span>*</span></label>
          <Veefield type="date" name="birthDay" class="form-control" placeholder="Data de nascimento"
            v-model="form.birthDay" required :class="{ 'is-invalid': errors.birthDay }" :rules="validateDate" />
          <div class="invalid-feedback">{{ errors.birthDay }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Telefone <span>*</span></label>
          <Veefield type="text" name="phone" class="form-control" placeholder="Fixo ou celular" v-model="form.phone"
            v-mask="['(##) ####-####', '(##) #####-####']" :class="{ 'is-invalid': errors.phone }"
            :rules="validatePhone" />
          <div class="invalid-feedback">{{ errors.phone }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">E-mail <span>*</span></label>
          <Veefield type="email" name="email" class="form-control" placeholder="Ex: José@gmail.com" v-model="form.email"
            required :class="{ 'is-invalid': errors.email }" :rules="validateEmail" />
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Cargo <span>*</span></label>
          <Veefield as="select" name="position" class="form-select" placeholder="Ex: desenvolvedor"
            v-model="form.position" required :class="{ 'is-invalid': errors.position }" :rules="required">
            <option value="" disabled>Escolha o cargo</option>
            <option value="Desenvolvedor Backend">Desenvolvedor Backend</option>
            <option value="Desenvolvedor Frontend">
              Desenvolvedor Frontend
            </option>
            <option value="Desenvolvedor Fullstack">
              Desenvolvedor Fullstack
            </option>
          </Veefield>
          <div class="invalid-feedback">{{ errors.position }}</div>
        </div>
      </div>

      <div class="row mt-3">
        <h3>Dados de endereço</h3>
        <hr />
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">CEP <span>*</span></label>
          <Veefield type="text" name="zipcode" class="form-control" placeholder="CEP" v-model="form.zipcode"
            @focusout="searchZipCode" required v-mask="'#####-###'" ref="cep" :class="{ 'is-invalid': errors.zipcode }"
            :rules="validateCEP" />
          <div class="invalid-feedback">{{ errors.zipcode }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Cidade <span>*</span></label>
          <Veefield type="text" name="city" class="form-control" placeholder="Cidade" v-model="form.city" required
            :class="{ 'is-invalid': errors.city }" disabled :rules="required" />
          <div class="invalid-feedback">{{ errors.city }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Estado <span>*</span></label>
          <Veefield type="text" name="state" class="form-control" placeholder="Estado" v-model="form.state" required
            :class="{ 'is-invalid': errors.state }" disabled :rules="required" />
          <div class="invalid-feedback">{{ errors.state }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Bairro <span>*</span></label>
          <Veefield type="text" name="neighborhood" class="form-control" placeholder="Bairro"
            v-model="form.neighborhood" required :class="{ 'is-invalid': errors.neighborhood }" :rules="required" />
          <div class="invalid-feedback">{{ errors.neighborhood }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Logradouro <span>*</span></label>
          <Veefield type="text" name="street" class="form-control" placeholder="Rua/Avenida" v-model="form.street"
            required :class="{ 'is-invalid': errors.street }" :rules="required" />
          <div class="invalid-feedback">{{ errors.street }}</div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Número <span>*</span></label>
          <Veefield type="number" name="houseNumber" class="form-control" placeholder="Número da residência"
            :rules="validateNumber" v-model.number="form.houseNumber" ref="skipCep" required
            :class="{ 'is-invalid': errors.houseNumber }" />
          <div class="invalid-feedback">{{ errors.houseNumber }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Complemento <span>*</span></label>
          <Veefield type="text" name="complement" class="form-control" placeholder="Complemento" :rules="required"
            v-model="form.complement" required :class="{ 'is-invalid': errors.complement }" />
          <div class="invalid-feedback">{{ errors.complement }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Referência <span>*</span></label>
          <Veefield type="text" name="reference" class="form-control" placeholder="Ponto de referência"
            :rules="required" v-model="form.reference" required :class="{ 'is-invalid': errors.reference }" />
          <div class="invalid-feedback">{{ errors.reference }}</div>
        </div>
      </div>
      <div class="text-end">
        <button :type="infoById ? 'button' : 'reset' " @click="infoById ? cancelEdit() : '' " class="btn btn-danger me-2 mt-2" v-text="infoById ? 'Cancelar' : 'Limpar'"></button>
        <button type="submit" class="mt-2" :class="infoById ? 'btn btn-primary' : 'btn btn-success'"
          v-text="btnForm"></button>

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
import {
  validateEmail,
  validateName,
  required,
  validateDate,
  validatePhone,
  validateNumber,
  validateCEP,
} from "../../validators/validators";
import axios from "axios";
import moment from "moment";

/* 

variaveis funcionais gerais 

*/
const $loading = useLoading();
const toast = useToast();
const store = useStore();
const route = useRoute();
const router = useRouter();
const content = {
  component: ToastNotification,
  listeners: {
    listCollabs: () => {
      toast.clear();
      router.push({ name: "ListCollaborators" });
    },
  },
};

// obtem o id do usuário para edição do parametro da rota
const id = route.params.userId;

// commit para atualizar dados do localstorage ao montar tela
store.commit("collaboratorModule/UPDATE_COLLABORATOR_LOCAL_STORAGE");

// variavel para verificar se o usuario esta editando ou criando um novo colaborador
const infoById = computed(() => {
  if (id) {
    return store.state.collaboratorModule.collaborators.find(
      (collaborator) => collaborator.id === id
    );
  }
  return false;
});

// botão de submit do formulário
const btnForm = ref(infoById.value ? "Editar" : "Cadastrar");

// variaveis do formulários - reativas (data)
const form = ref({
  id: infoById.value ? infoById.value.id : "",
  name: infoById.value ? infoById.value.name : "",
  email: infoById.value ? infoById.value.email : "",
  phone: infoById.value ? infoById.value.phone : "",
  position: infoById.value ? infoById.value.position : "",
  gender: infoById.value ? infoById.value.gender : "",
  zipcode: infoById.value ? infoById.value.zipcode : "",
  birthDay: infoById.value ? infoById.value.birthDay : "",
  city: infoById.value ? infoById.value.city : "",
  state: infoById.value ? infoById.value.state : "",
  neighborhood: infoById.value ? infoById.value.neighborhood : "",
  street: infoById.value ? infoById.value.street : "",
  houseNumber: infoById.value ? infoById.value.houseNumber : null,
  complement: infoById.value ? infoById.value.complement : "",
  reference: infoById.value ? infoById.value.reference : "",
  createdAt: infoById.value
    ? infoById.value.createdAt
    : moment().format("llll"),
  updatedAt: infoById.value ? moment().format("llll") : "",
});

/* 
Funções para submit do formulário
*/

//função executada quando o formulário for submetido com sucesso
function onValidSubmit(values, actions) {
  if (infoById.value) {
    editCollaborator(actions);
  } else {
    newCollaborator(actions);
  }
}

//função executada quando houver erros no formulário submetido
function onInvalidSubmit({ errors }) {
  for (let field in errors) {
    toast.error(errors[field], { timeout: 1500 });
  }
}

// função para registrar novo colaborador
function newCollaborator(actions) {
  const loader = $loading.show();
  setTimeout(() => {
    infoById.value ? infoById.value.id : (form.value.id = "c" + uid());
    form.value.updatedAt = moment().format("llll");
    store.dispatch("collaboratorModule/registerCollaborator", form.value);
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

// Função para editar o colaborador
function editCollaborator(actions) {
  const loader = $loading.show();
  setTimeout(() => {
    console.log(form.value.name);
    store.dispatch("collaboratorModule/editCollaborator", form.value);
    actions.resetForm();
    loader.hide();
    toast.success("Colaborador editado com sucesso!");
    router.push({ name: "ListCollaborators" });
  }, 2000);
}

// Função para cancelar a edição do colaborador
function cancelEdit() {
  toast.warning("Edição cancelada!", { timeout: 1000 });
  router.push({ name: "ListCollaborators" });
}

/* 
Funções para validação de CEP - uso da api (VIACEP)
*/
function clearAddress() {
  form.value.city = "";
  form.value.state = "";
  form.value.neighborhood = "";
  form.value.street = "";
}

function searchZipCode() {
  clearAddress();

  if (!form.value.zipcode || form.value.zipcode.length <= 8) {
    return;
  }

  const loader = $loading.show();
  axios
    .get(`https://viacep.com.br/ws/${form.value.zipcode}/json/`)
    .then((response) => {
      if (response.data.erro) {
        form.value.city = "";
        form.value.state = "";
        form.value.neighborhood = "";
        form.value.street = "";
        loader.hide();
        toast.error("CEP não encontrado", { timeout: 1500 });
        return;
      }
      loader.hide();
      form.value.city = response.data.localidade;
      form.value.state = response.data.uf;
      form.value.neighborhood = response.data.bairro;
      form.value.street = response.data.logradouro;
    })
    .catch((error) => {
      toast.error(error, { timeout: 1500 });
    });
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
