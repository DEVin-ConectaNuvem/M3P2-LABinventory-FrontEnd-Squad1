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
        <div class="col-lg-2">
          <Veefield
            name="imageItem"
            v-model="form.imageItem"
            v-slot="{ field, errors, meta }"
          >
            <upload-image
              v-bind="field"
              @uploadSuccess="saveImageItem"
            ></upload-image>
            <div class="invalid-feedback animate__animated animate__shakeX">
              {{ meta.dirty && meta.touched ? errors.imageItem : '' }}
            </div>
          </Veefield>
        </div>
        <div class="col-lg-10">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6">
              <label class="form-label"
                >Cód. de Patrimônio <span>*</span></label
              >
              <Veefield
                type="text"
                name="codPatrimonio"
                class="form-control"
                :class="{ 'is-invalid': errors.title }"
                :rules="required"
                placeholder="Cód. de patrimônio"
                v-model="form.codPatrimonio"
                data-testid="itemView-input-codPatrimonio"
              />
              <div class="invalid-feedback animate__animated animate__shakeX">
                {{ errors.codPatrimonio }}
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <label class="form-label">Título do item <span>*</span></label>
              <Veefield
                data-testid="itemView-input-title"
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
              />
              <div class="invalid-feedback animate__animated animate__shakeX">
                {{ errors.title }}
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <label class="form-label">Categoria <span>*</span></label>
              <Veefield
                data-testid="itemView-input-category"
                as="select"
                name="category"
                class="form-select"
                v-model="form.category"
                required
                :class="{ 'is-invalid': errors.category }"
                :rules="required"
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
            <div class="col-sm-12 col-md-12 col-lg-6">
              <label class="form-label">Arquivo do item</label>
              <Veefield
                type="file"
                name="fileItem"
                class="form-control"
                :class="{ 'is-invalid': errors.fileItem }"
                placeholder="Insira um arquivo"
                v-model="form.fileItem"
                data-testid="itemView-input-fileItem"
              />
              <div class="invalid-feedback animate__animated animate__shakeX">
                {{ errors.fileItem }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="mt-3">Dados Complementares</h4>
      <hr />
      <div class="row mb-1">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <label class="form-label">Valor <span>*</span></label>
          <Veefield
            data-testid="itemView-input-value"
            type="number"
            name="value"
            class="form-control"
            placeholder="Valor do item"
            v-model="form.value"
            required
            :class="{ 'is-invalid': errors.value }"
            :rules="validateNumber"
          />
          <div class="invalid-feedback animate__animated animate__shakeX">
            {{ errors.value }}
          </div>
        </div>

        <div class="col-sm-12 col-md-4">
          <label class="form-label">Marca <span>*</span></label>
          <Veefield
            data-testid="itemView-input-brand"
            type="text"
            name="brand"
            class="form-control"
            placeholder="Marca do item"
            v-model.trim="form.brand"
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
            data-testid="itemView-input-model"
            type="text"
            name="model"
            class="form-control"
            placeholder="Modelo do item"
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
          <label class="form-label">Descrição do item<span>*</span></label>
          <Veefield
            name="description"
            v-model="form.description"
            data-testid="itemView-input-description"
            as="textarea"
            required
            placeholder="Digite as especificações do item"
            class="form-control"
            maxlength="180"
            :rules="required"
            v-slot="{ field, errors }"
            rows="3"
          >
            <textarea v-bind="field"></textarea>
            <div class="invalid-feedback animate__animated animate__shakeX">
              {{ errors.model }}
            </div>
          </Veefield>
        </div>
      </div>

      <div class="text-end">
        <button
          :type="id ? 'button' : 'reset'"
          @click="id ? cancelEdit() : ''"
          class="btn btn-secondary me-2 mt-2"
          v-text="id ? 'Cancelar' : 'Limpar'"
        ></button>
        <button
          type="submit"
          class="mt-2 btn"
          :class="id ? 'btn-primary' : 'btn-success'"
          v-text="id ? 'Editar' : 'Cadastrar'"
          data-testid="button-reg"
        ></button>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useAxios, useGeneralLoading } from '../../hooks'
import { useToast } from 'vue-toastification'
import ToastNotification from '../../components/shared/ToastNotification.vue'
import UploadImage from '../../components/shared/UploadImage.vue'
import { useRoute, useRouter } from 'vue-router'
import { Form as VeeForm, Field as Veefield } from 'vee-validate'
import { required, validateNumber } from '../../validators/validators'

const { toggleLoading } = useGeneralLoading()
const store = useStore()
const route = useRoute()
const toast = useToast()
const router = useRouter()
const { axios } = useAxios()
const toastInfo = reactive({
  msg: 'Cadastro de colaborador realizado com sucesso!',
  buttonNew: 'Cadastrar novo colaborador',
  buttonList: 'Listar colaboradores'
})
const content = {
  component: ToastNotification,
  props: toastInfo,
  listeners: {
    listCollabs: () => {
      toast.clear()
      router.push({ name: 'listItems' })
    },
    closeToast: () => {
      toast.clear()
    }
  }
}
const id = route.params.itemId ? route.params.itemId.split('-')[0] : null
const origin = id ? route.params.itemId.split('-')[1] : null
const form = ref({
  codPatrimonio: null,
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
  imageItem: null,
  fileItem: null
})
const newForm = ref({})
const url = ref(null)

onMounted(async () => {
  store.commit('configModule/SET_PAGE_NAME', 'Criação e edição de itens')
  if (id) {
    const dataForm = await getInfoItemById(id)
    if (dataForm) {
      form.value = dataForm
    }
  }
})

async function getInfoItemById(id) {
  toggleLoading(true)
  try {
    const res = await axios.get(`/inventory/${id}`)
    return res.data
  } catch (error) {
    toast.error('Erro ao buscar item', content)
  } finally {
    setTimeout(() => {
      toggleLoading(false)
    }, 500)
  }
}

async function onValidSubmit(values, actions) {
  try {
    newForm.value = { ...values }
    newForm.value['value'] = parseFloat(newForm.value['value'])
    if (id) {
      await editItem(actions)
    } else {
      await newItem(actions)
    }
    actions.resetForm()
  } catch (error) {
    toast.error(error.message)
  }
}

function onInvalidSubmit({ errors }) {
  for (let field in errors) {
    toast.error(errors[field], { timeout: 1500 })
  }
}

async function newItem() {
  toggleLoading(true)
  try {
    const res = await axios.post('/inventory/create', newForm.value)
    if (res.status === 201) {
      toast(content, {
        position: 'top-right',
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        closeButton: 'button',
        icon: 'fas fa-rocket',
        rtl: false
      })
    }
    clearForm()
  } catch (error) {
    throw new Error(error.response.data.error || 'Erro ao cadastrar item')
  } finally {
    setTimeout(() => {
      toggleLoading(false)
    }, 500)
  }
}

async function editItem() {
  toggleLoading(true)
  try {
    const payload = {
      id: id,
      dataset: newForm.value
    }
    const res = await axios.patch(`/inventory/update`, payload)
    if (res.status === 200) {
      toast.success('Item editado com sucesso', content)
    }
    origin === 'list'
      ? router.push({ name: 'listItems' })
      : router.push({ name: 'dashboard' })
  } catch (error) {
    throw new Error(error.response.data.error || 'Erro ao editar item')
  } finally {
    setTimeout(() => {
      toggleLoading(false)
    }, 500)
  }
}

function clearForm() {
  form.value.id = ''
  form.value.description = ''
  url.value = null
}

function cancelEdit() {
  toast.warning('Edição cancelada!', { timeout: 1000 })
  origin === 'list'
    ? router.push({ name: 'listItems' })
    : router.push({ name: 'dashboard' })
}

function saveImageItem(imgBase64) {
  if (imgBase64) {
    form.value.imageItem = imgBase64
  }
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
