<template>
    <div class="container">
        <h4 class="mb-3">Preencha os campos para cadastrar um novo colaborador</h4>
        <VeeForm @submit="onValidSubmit" v-slot="{ errors }" @invalid-submit="onInvalidSubmit" class="formCadastro">
            <div class="row mb-1">
                <h3>Dados de endereço</h3>
                <hr />
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Nome completo <span>*</span></label>
                    <Veefield type="text" name="name" class="form-control" placeholder="Nome completo"
                        v-model.trim="form.name" required :class="{ 'is-invalid': errors.name }" :rules="validateName"
                        v-focus />
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
                        v-model="form.birthDay" required :class="{ 'is-invalid': errors.birthDay }"
                        :rules="validateDate" />
                    <div class="invalid-feedback">{{ errors.birthDay }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Telefone <span>*</span></label>
                    <Veefield type="text" name="phone" class="form-control" placeholder="Fixo ou celular"
                        v-model="form.phone" v-mask="['(##) ####-####', '(##) #####-####']"
                        :class="{ 'is-invalid': errors.phone }" :rules="validatePhone" />
                    <div class="invalid-feedback">{{ errors.phone }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">E-mail <span>*</span></label>
                    <Veefield type="email" name="email" class="form-control" placeholder="Ex: José@gmail.com"
                        v-model="form.email" required :class="{ 'is-invalid': errors.email }" :rules="validateEmail" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Cargo <span>*</span></label>
                    <Veefield as="select" name="position" class="form-select" placeholder="Ex: desenvolvedor"
                        v-model="form.position" required :class="{ 'is-invalid': errors.position }" :rules="required">
                        <option value="" disabled selectd>Escolha o cargo</option>
                        <option value="Desenvolvedor Backend">Desenvolvedor Backend</option>
                        <option value="Desenvolvedor Frontend">Desenvolvedor Frontend</option>
                        <option value="Desenvolvedor Fullstack">Desenvolvedor Fullstack</option>
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
                        @focusout="searchZipCode" required v-mask="'#####-###'" ref="cep"
                        :class="{ 'is-invalid': errors.zipcode }" :rules="required" />
                    <div class="invalid-feedback">{{ errors.zipcode }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Cidade <span>*</span></label>
                    <Veefield type="text" name="city" class="form-control" placeholder="Cidade" v-model="form.city"
                        required :class="{ 'is-invalid': errors.city }" disabled :rules="required" />
                    <div class="invalid-feedback">{{ errors.city }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Estado <span>*</span></label>
                    <Veefield type="text" name="state" class="form-control" placeholder="Estado" v-model="form.state"
                        required :class="{ 'is-invalid': errors.state }" disabled :rules="required" />
                    <div class="invalid-feedback">{{ errors.state }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Bairro <span>*</span></label>
                    <Veefield type="text" name="neighborhood" class="form-control" placeholder="Bairro"
                        v-model="form.neighborhood" required :class="{ 'is-invalid': errors.neighborhood }"
                        :rules="required" />
                    <div class="invalid-feedback">{{ errors.neighborhood }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Logradouro <span>*</span></label>
                    <Veefield type="text" name="street" class="form-control" placeholder="Rua/Avenida"
                        v-model="form.street" required :class="{ 'is-invalid': errors.street }" :rules="required" />
                    <div class="invalid-feedback">{{ errors.street }}</div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Número <span>*</span></label>
                    <Veefield type="number" name="houseNumber" class="form-control" placeholder="Número da residência"
                        :rules="validateNumber" v-model="form.houseNumber" ref="skipCep" required
                        :class="{ 'is-invalid': errors.houseNumber }" />
                    <div class="invalid-feedback">{{ errors.houseNumber }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Complemento <span>*</span></label>
                    <Veefield type="text" name="complement" class="form-control" placeholder="Complemento/referência"
                        :rules="required" v-model="form.complement" required
                        :class="{ 'is-invalid': errors.complement }" />

                    <div class="invalid-feedback">{{ errors.complement }}</div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-2">Salvar</button>
        </VeeForm>
    </div>
</template>

<script setup>
import { uid } from "uid";
import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import ToastNotification from "./components/ToastNotification.vue";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import { Form as VeeForm, Field as Veefield } from "vee-validate";
import {
    validateEmail,
    validateName,
    required,
    validateDate,
    validatePhone,
    validateNumber,
} from "../../validators/validators";
import axios from "axios";


const $loading = useLoading();
const toast = useToast();
const store = useStore();
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

const form = ref({
    id: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    zipcode: "",
    city: "",
    state: "",
    neighborhood: "",
    street: "",
    numberHouse: "",
    complement: "",
});

function onValidSubmit(values, actions) {
    const loader = $loading.show();
    setTimeout(() => {
        form.value.id = "c" + uid();
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

function onInvalidSubmit({ errors }) {
    for (let field in errors) {
        toast.error(errors[field], { timeout: 1500 });
    }
}

function clearAddress() {
    form.value.city = "";
    form.value.state = "";
    form.value.neighborhood = "";
    form.value.street = "";
}

function searchZipCode() {
    clearAddress();

    if (!form.value.zipcode || form.value.zipcode.length <= 8) { return; }

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
