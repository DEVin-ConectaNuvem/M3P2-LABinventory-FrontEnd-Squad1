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
                        aria-label="Nome completo" 
                        required />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Genero <span>*</span></label>
                    <Veefield type="text" name="gender" class="form-control" placeholder="Genero"
                        aria-label="Genero" 
                        required />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Data de nascimento <span>*</span></label>
                    <Veefield type="date" name="birthDay" class="form-control" placeholder="Data de nascimento"
                        aria-label="Birthday Date"  required />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Telefone <span>*</span></label>
                    <Veefield type="text" name="phone" class="form-control" placeholder="Fixo ou celular"
                        aria-label="Phone"
                        v-mask="['(##) ####-####', '(##) #####-####']"
                        />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">E-mail <span>*</span></label>
                    <Veefield type="email" name="email" class="form-control" placeholder="Ex: José@gmail.com"
                        aria-label="email" required />
                </div>
                 <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Cargo <span>*</span></label>
                    <Veefield type="text" name="position" class="form-control" placeholder="Ex: Desenvolvedor"
                        aria-label="profissional position" required />
                </div>
            </div>
            
            <div class="row mt-3">
            <h3>Dados de endereço</h3>
            <hr>
            <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">CEP <span>*</span></label>
                    <Veefield type="text" name="zipcode" class="form-control" placeholder="CEP"
                        aria-label="profissional position" required
                        v-mask="'#####-###'"
                        />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Cidade <span>*</span></label>
                    <Veefield type="text" name="city" class="form-control" placeholder="Cidade"
                        aria-label="profissional position" required />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Estado <span>*</span></label>
                    <Veefield type="text" name="state" class="form-control" placeholder="Estado"
                        aria-label="profissional position" required />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Bairro <span>*</span></label>
                    <Veefield type="text" name="neighborhood" class="form-control" placeholder="Bairro"
                        aria-label="profissional position" required />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Logradouro <span>*</span></label>
                    <Veefield type="text" name="street" class="form-control" placeholder="Rua/Avenida"
                        aria-label="profissional position" required />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Número <span>*</span></label>
                    <Veefield type="text" name="numberHouse " class="form-control" placeholder="Número"
                        aria-label="profissional position" required />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4">
                    <label class="form-label">Complemento</label>
                    <Veefield type="text" name="complement" class="form-control" placeholder="Complemento/referência"
                        aria-label="profissional position" required />
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

const $loading = useLoading()
const toast = useToast();
const store = useStore();
const router = useRouter();

function onValidSubmit(values, actions){

}

function onInvalidSubmit({ errors }) {
  for (let field in errors) {
    toast.error(errors[field], { timeout: 1500 });
  }
}
</script>

<style lang="scss" scoped>
.formCadastro{
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.2);

    .form-label{
        font-size: 1.1rem;
        font-weight: bold;
        color: var(--color-dark);
    }

    span{
        color: var(--color-danger);
        font-size: 1rem;
        font-weight: bold;
    }
}
</style>