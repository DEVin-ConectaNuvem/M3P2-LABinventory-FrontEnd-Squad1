<template>
  <div class="container mt-3">
    <h4 class="mb-3">Preencha os campos para cadastrar/editar um colaborador</h4>
    <VeeForm @submit="onValidSubmit" data-testid="vue-toast-info" v-slot="{ errors, actions, meta }"
      @invalid-submit="onInvalidSubmit" class="formCadastro animate__animated animate__fadeIn">
      <div class="row mb-1">
        <h3>Dados do colaborador</h3>
        <hr />
        <div class="col-lg-2">
          <Veefield name="imageUser" v-model="form.imageUser" data-testid="input-uploadImageUser"
            v-slot="{ field, errors, meta }">
            <avatar-user v-bind="field" @uploadSuccess="saveImageUser"></avatar-user>
            <div class="invalid-feedback animate__animated animate__shakeX">
              {{ meta.dirty && meta.touched ? errors.imageUser : '' }}
            </div>
          </Veefield>
        </div>
        <div class="col-lg-10">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-4">
              <label class="form-label">Nome completo <span>*</span></label>
              <Veefield data-testid="colab-name" type="text" name="name" class="form-control"
                placeholder="Nome completo" v-model.trim="form.name" required :class="{ 'is-invalid': meta.dirty && meta.touched && errors.name }"
                :rules="validateName" v-focus maxlength="25" />
              <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.name : '' }}</div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label">Genero <span>*</span></label>
              <Veefield data-testid="colab-gender" as="select" name="gender" class="form-select" placeholder="Genero"
                v-model="form.gender" :class="{ 'is-invalid': meta.dirty && meta.touched &&  errors.gender }" :rules="required"
                required>
                <option value="" disabled selectd>Escolha o gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </Veefield>
              <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.gender : '' }}</div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label">Data de nascimento <span>*</span></label>
              <Veefield data-testid="colab-date" type="date" name="birthDay" class="form-control"
                placeholder="Data de nascimento" v-model="form.birthDay" required
                :class="{ 'is-invalid': meta.dirty && meta.touched && errors.birthDay }" :rules="validateDate" />
              <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ?
                  errors.birthDay : ''
              }}</div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label">Telefone <span>*</span></label>
              <Veefield data-testid="colab-phone" type="text" name="phone" class="form-control"
                placeholder="Fixo ou celular" v-model="form.phone" v-mask="['(##) ####-####', '(##) #####-####']"
                :class="{ 'is-invalid': meta.dirty && meta.touched && errors.phone }" :rules="validatePhone" />
              <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ?
                  errors.phone : ''
              }}</div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label">E-mail <span>*</span></label>
              <Veefield data-testid="colab-email" type="email" name="email" class="form-control"
                placeholder="Ex: José@gmail.com" v-model="form.email" required :class="{ 'is-invalid': meta.dirty && meta.touched && errors.email }"
                :rules="validateEmail" />
              <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ?
                  errors.email : ''
              }}</div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label">Cargo <span>*</span></label>
              <Veefield data-testid="colab-position" as="select" name="position" class="form-select"
                placeholder="Ex: desenvolvedor" v-model="form.position" required
                :class="{ 'is-invalid': meta.dirty && meta.touched && errors.position }" :rules="required">
                <option value="" disabled>Escolha o cargo</option>
                <option value="Desenvolvedor Backend">Desenvolvedor Backend</option>
                <option value="Desenvolvedor Frontend">
                  Desenvolvedor Frontend
                </option>
                <option value="Desenvolvedor Fullstack">
                  Desenvolvedor Fullstack
                </option>
              </Veefield>
              <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.position : '' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <h3>Dados de endereço</h3>
        <hr />
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">CEP <span>*</span></label>
          <Veefield data-testid="colab-zipcode" type="text" name="zipcode" class="form-control" placeholder="CEP"
            v-model="form.zipcode" @focusout="searchZipCode" required v-mask="'#####-###'" ref="zipcode"
            :class="{ 'is-invalid': meta.dirty && meta.touched && errors.zipcode }" :rules="validateCEP" />
          <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.zipcode : '' }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Cidade <span>*</span></label>
          <Veefield data-testid="colab-city" type="text" name="city" class="form-control" placeholder="Cidade"
            v-model="form.city" required :class="{ 'is-invalid': meta.dirty && meta.touched && errors.city }" disabled :rules="required" />
          <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.city : '' }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Estado <span>*</span></label>
          <Veefield data-testid="colab-state" type="text" name="state" class="form-control" placeholder="Estado"
            v-model="form.state" required :class="{ 'is-invalid': meta.dirty && meta.touched && errors.state }" disabled :rules="required" />
          <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.state : '' }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Bairro <span>*</span></label>
          <Veefield data-testid="colab-neighborhood" type="text" name="neighborhood" class="form-control"
            placeholder="Bairro" v-model="form.neighborhood" required :class="{ 'is-invalid': meta.dirty && meta.touched && errors.neighborhood }"
            :rules="required" />
          <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.neighborhood : '' }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Logradouro <span>*</span></label>
          <Veefield data-testid="colab-street" type="text" name="street" class="form-control" placeholder="Rua/Avenida"
            v-model="form.street" required :class="{ 'is-invalid': meta.dirty && meta.touched &&  errors.street }" :rules="required" />
          <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.street : '' }}</div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Número <span>*</span></label>
          <Veefield data-testid="colab-number" type="number" name="houseNumber" class="form-control"
            placeholder="Número da residência" :rules="validateNumber" v-model.number="form.houseNumber" required
            :class="{ 'is-invalid': meta.dirty && meta.touched &&  errors.houseNumber }" />
          <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.houseNumber : '' }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Complemento <span>*</span></label>
          <Veefield data-testid="colab-complement" type="text" name="complement" class="form-control"
            placeholder="Complemento" :rules="required" v-model="form.complement" required
            :class="{ 'is-invalid': meta.dirty && meta.touched &&  errors.complement }" />
          <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.complement : '' }}</div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="form-label">Referência <span>*</span></label>
          <Veefield data-testid="colab-reference" type="text" name="reference" class="form-control"
            placeholder="Ponto de referência" :rules="required" v-model="form.reference" required
            :class="{ 'is-invalid': meta.dirty && meta.touched && errors.reference }" />
          <div class="invalid-feedback animate__animated animate__shakeX">{{ meta.dirty && meta.touched ? errors.reference : '' }}</div>
        </div>
      </div>
      <div class="text-end">
        <button data-testid="colab-reset-button" :type="id ? 'button' : 'reset'" @click="id ? cancelEdit() : ''"
          class="btn btn-secondary me-2 mt-2" v-text="id ? 'Cancelar' : 'Limpar'"></button>
        <button data-testid="colab-submit-button" type="submit" class="mt-2"
          :class="id ? 'btn btn-primary' : 'btn btn-success'" v-text="id ? 'Editar' : 'Cadastrar'"></button>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import ToastNotification from "../../components/shared/ToastNotification.vue";
import AvatarUser from "../../components/shared/AvatarUser.vue";
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
import { useAxios } from "../../hooks";

const { axios } = useAxios();
const $loading = useLoading();
const toast = useToast();
const store = useStore();
const route = useRoute();
const router = useRouter();
const toastInfo = reactive({
  msg: "Cadastro de colaborador realizado com sucesso!",
  buttonNew: "Cadastrar novo colaborador",
  buttonList: "Listar colaboradores",
});

const configToastSuccess = {
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
}

const content = {
  component: ToastNotification,
  props: toastInfo,
  listeners: {
    listCollabs: () => {
      toast.clear();
      router.push({ name: "ListCollaborators" });
    },
    closeToast: () => {
      toast.clear();
    },
  },
};
const id = route.params.userId;
const form = ref({
  id: null,
  name: null,
  email: null,
  phone: null,
  position: null,
  gender: null,
  zipcode: null,
  birthDay: null,
  city: null,
  state: null,
  neighborhood: null,
  street: null,
  houseNumber: null,
  complement: null,
  reference: null,
  createdAt: null,
  updatedAt: null,
  imageUser: null
});


const newForm = ref({})
onMounted(async () => {
  store.commit('configModule/SET_PAGE_NAME', 'Criação e edição de colaboradores');
  if (id) {
    const dataForm = await getCollaboratorById(id);
    if (dataForm) {
      form.value = dataForm;
    }
  }
});


async function getCollaboratorById(id) {
  const loader = $loading.show();
  try {
    const res = await axios.get(
      `/employees/${id}`
    );
    return res.data;
  } catch (error) {
    toast.error("Erro ao buscar colaborador");
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

async function onValidSubmit(values, actions) {
  try {
    newForm.value = { ...values }
    if (id) {
      await editCollaborator();
    } else {
      await newCollaborator();
    }
    actions.resetForm();
  } catch (error) {
    const errMsg = error.message || "Erro ao cadastrar colaborador"
    toast.error(errMsg, { timeout: 1500 });
  }
}

function onInvalidSubmit({ errors }) {
  for (let field in errors) {
    toast.error(errors[field], { timeout: 1500 });
  }
}

async function newCollaborator() {
  const loader = $loading.show();
  try {
    const data = formatDataToBack(newForm.value);
    const res = await axios.post(
      "/employees/create",
      data
    );
    if (res.status === 201) {
      toast(content, configToastSuccess);
    }
  } catch (error) {
    const errMsg = error.response?.status === 400 ? error.response.data.error : "Erro ao cadastrar colaborador";
    throw new Error(errMsg);
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

function formatDataToBack(data) {
  const regexRemoveMask = /[^0-9]/g;
  data["phone"] ? data["phone"] = data["phone"].replace(regexRemoveMask, "") : '';
  data["houseNumber"] ? data["houseNumber"] = parseInt(data["houseNumber"]) : '';
  return data;
}

async function editCollaborator() {
  const loader = $loading.show();
  try {
    const data = formatDataToBack(newForm.value);
    const payload = {
      "id": id,
      "dataset": data
    }
    const res = await axios.patch(
      `/employees/update`,
      payload
    );
    if (res.status === 200) {
      toast.success("Colaborador editado com sucesso", content);
    }
    router.push({ name: "ListCollaborators" });
  } catch (error) {
    const errMsg = error.response?.status === 400 ? error.response.data.error : "Erro ao editar colaborador";
    throw new Error(errMsg);
  } finally {
    setTimeout(() => {
      loader.hide()
    }, 500);
  }
}

function cancelEdit() {
  toast.warning("Edição cancelada!", { timeout: 1000 });
  router.push({ name: "ListCollaborators" });
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
      loader.hide();
      toast.error(error, { timeout: 1500 });
    });
}

function saveImageUser(imgBase64) {
  if (imgBase64) {
    form.value.imageUser = imgBase64
  }
}

function clearAddress() {
  form.value.city = "";
  form.value.state = "";
  form.value.neighborhood = "";
  form.value.street = "";
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
    margin-top: 5px;
  }

  span {
    color: var(--color-danger);
    font-size: 1rem;
    font-weight: bold;
  }
}
</style>