<template>
    <div class="container">
        <h4 class="mb-3">Preencha os campos para cadastrar um novo colaborador</h4>
        <VeeForm @submit="onValidSubmit" v-slot="{ errors }" @invalid-submit="onInvalidSubmit" class="formCadastro">
            <div class="row mb-1">
                <h3>Dados de endereço</h3>
                <hr>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Nome completo <span>*</span></label>
                    <Veefield type="text" name="name" class="form-control" placeholder="Nome completo"
                        v-model.trim="form.name" required :class="{ 'is-invalid': errors.name }"/>
                    <div class="invalid-feedback">{{ errors.name }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Genero <span>*</span></label>
                    <Veefield as="select" name="gender" class="form-control" placeholder="Genero" v-model="form.gender"
                        :class="{ 'is-invalid': errors.gender }"
                        required>
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
                        v-model="form.birthDay" required :class="{ 'is-invalid': errors.birthDay }"/>
                    <div class="invalid-feedback">{{ errors.birthDay }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Telefone <span>*</span></label>
                    <Veefield type="text" name="phone" class="form-control" placeholder="Fixo ou celular"
                        v-model="form.phone" v-mask="['(##) ####-####', '(##) #####-####']" :class="{ 'is-invalid': errors.phone }" />
                    <div class="invalid-feedback">{{ errors.phone }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">E-mail <span>*</span></label>
                    <Veefield type="email" name="email" class="form-control" placeholder="Ex: José@gmail.com"
                        v-model="form.email" required :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Cargo <span>*</span></label>
                    <Veefield as="select" name="position" class="form-control" placeholder="Ex: desenvolvedor"
                        v-model="form.position" required :class="{ 'is-invalid': errors.position }">
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
                <hr>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">CEP <span>*</span></label>
                    <Veefield type="text" name="zipcode" class="form-control" placeholder="CEP"
                        v-model="form.zipcode" @focusout="searchZipCode" required v-mask="'#####-###'" :class="{ 'is-invalid': errors.zipcode }" />
                    <div class="invalid-feedback">{{ errors.zipcode }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Cidade <span>*</span></label>
                    <Veefield type="text" name="city" class="form-control" placeholder="Cidade"
                        v-model="form.city" required :class="{ 'is-invalid': errors.city }" />
                    <div class="invalid-feedback">{{ errors.city }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Estado <span>*</span></label>
                    <Veefield type="text" name="state" class="form-control" placeholder="Estado"
                        v-model="form.state" required :class="{ 'is-invalid': errors.state }" />
                    <div class="invalid-feedback">{{ errors.state }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Bairro <span>*</span></label>
                    <Veefield type="text" name="neighborhood" class="form-control" placeholder="Bairro"
                        v-model="form.neighborhood" required :class="{ 'is-invalid': errors.neighborhood }" />
                    <div class="invalid-feedback">{{ errors.neighborhood }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Logradouro <span>*</span></label>
                    <Veefield type="text" name="street" class="form-control" placeholder="Rua/Avenida"
                        v-model="form.street" required :class="{ 'is-invalid': errors.stress }" />
                    <div class="invalid-feedback">{{ errors.stress }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Número <span>*</span></label>
                    <Veefield type="number" name="numberHouse " class="form-control" placeholder="Número"
                        v-model="form.numberHouse" :class="{ 'is-invalid': errors.numberHouse }" required />
                    <div class="invalid-feedback">{{ errors.numberHouse }}</div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Complemento</label>
                    <Veefield type="text" name="complement" class="form-control" placeholder="Complemento/referência"
                        v-model="form.complement" required :class="{ 'is-invalid': errors.complement }" />
                    <div class="invalid-feedback">{{ errors.complement }}</div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-2">Salvar</button>
        
        </VeeForm>

    </div>
</template>

<script setup>
import { uid } from 'uid';
import { ref } from 'vue';
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay'
import { Form as VeeForm, Field as Veefield } from 'vee-validate';
import axios from 'axios';


const $loading = useLoading()
const toast = useToast();
const store = useStore();
const router = useRouter();

const form = ref({
    name: '',
    email: '',
    phone: '',
    position: '',
    zipcode: '',
    city: '',
    state: '',
    neighborhood: '',
    street: '',
    numberHouse: '',
    complement: '',
});


function onValidSubmit(values, actions) {
    console.log(values)
}

function onInvalidSubmit({ errors }) {
    for (let field in errors) {
        toast.error(errors[field], { timeout: 1500 });
    }
}

function searchZipCode(){
    const loader = $loading.show()
    axios.get(`https://viacep.com.br/ws/${form.value.zipcode}/json/`)
    .then(response => {
        loader.hide()
        form.value.city = response.data.localidade
        form.value.state = response.data.uf
        form.value.neighborhood = response.data.bairro
        form.value.street = response.data.logradouro
    })
    .catch((err) => {
        loader.hide()
        console.log(err)
        toast.error('CEP não encontrado', { timeout: 1500 });
    })
}
</script>

<style lang="scss" scoped>
.formCadastro {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);

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