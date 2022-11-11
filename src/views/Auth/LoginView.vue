<template>
  <section class="header">
    <div class="inner-header  flex  ">
      <div class="container ">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class=" rounded-3 text-white">
              <div class="row g-0">
                <div class="col-lg-6">
                  <div class="card-body mx-md-4 mt-5">
                    <div class="text-center animate__animated animate__backInLeft">
                      <img src="../../assets/icons/logoInventary.svg" class="img-fluid logo " alt="logo">
                      <h4 class="mt-1 ">Nós somos o <strong>DEVInventary</strong></h4>
                    </div>

                    <VeeForm data-testid="vue-toast-info" @submit="onValidSubmit" v-slot="{ errors }" @invalid-submit="onInvalidSubmit"
                      class="animate__animated animate__backInLeft">
                      <div class="d-flex align-items-end justify-content-center mb-2 ">
                        <p class="mb-0 me-2 text-light " v-text="register.haveAccount"></p>
                        <a class="text-white" @click.stop="toggleRegister" v-text="register.createAccount"></a>
                      </div>

                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">@</span>
                        </div>
                        <Veefield data-testid="login-input-email" type="text" class="form-control" name="email" placeholder="Digite o e-mail"
                          aria-label="Email" v-model="form.email" required :class="{ 'is-invalid': errors.email }"
                          :rules="validateEmail" />
                        <div class="invalid-feedback">{{ errors.email }}</div>
                      </div>

                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">&#128273</span>
                        </div>
                        <Veefield data-testid="login-input-password" type="password" class="form-control" placeholder="Digite sua senha" aria-label="senha"
                          v-model="form.password" required name="password" :class="{ 'is-invalid': errors.password }"
                          :rules="validatePassword" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                      </div>

                      <transition>
                        <div class="input-group mb-3" v-if="register.register">
                          <div class="input-group-prepend">
                            <span class="input-group-text">&#128273</span>
                          </div>
                          <Veefield data-testid="register-input-password" type="password" class="form-control" placeholder="Digite novamente a sua senha"
                            aria-label="senha" v-model="form.confirmPassword" name="confirmPassword"
                            :rules="validateConfirmPassword" :class="{ 'is-invalid': errors.confirmPassword }" />
                          <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
                        </div>
                      </transition>

                      <div class="text-center ">
                        <button :class="register.register ? 'btn btn-success me-3' : 'btn btn-info text-dark me-3'"
                          type="submit" v-text="register.button">
                        </button>
                        <button class="btn btn-light" type="button" @click="alertUser"><i
                            class="fa-brands fa-google"></i></button>
                        <hr>
                        <a class="ms-2 text-white" v-show="!register.register" @click="alertUser">Esqueceu a senha?</a>
                      </div>

                    </VeeForm>
                  </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center">
                  <img src="../../assets/icons/Workspace_2_SVG.svg"
                    class="imgback img-fluid animate__animated animate__backInRight" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <svg class="waves mt-5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { uid } from 'uid';
import { Field as Veefield, Form as VeeForm } from 'vee-validate';
import { ref } from 'vue';
import { useLoading } from 'vue-loading-overlay';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useStore } from 'vuex';
import { validateEmail, validatePassword } from '../../validators/validators.js';

const $loading = useLoading()
const toast = useToast();
const store = useStore();
const router = useRouter();

// Objeto para dados do formulário de Login/Registro
const form = ref({
  id: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// Objeto para dados exibidos em tela conforme Login/Registro
const register = ref({
  register: false,
  textMain: 'Faça o login ou cadastre-se',
  button: 'Acessar',
  haveAccount: 'Não possui conta?',
  createAccount: 'Cadastre-se',
});

// Objeto para validação do campo de confirmação de senha
function validateConfirmPassword(value) {
  if (!value) {
    return 'A confirmação da senha é obrigatória';
  } else if (value !== form.value.password) {
    return 'As senhas não conferem';
  }
  return value === form.value.password ? true : 'As senhas não conferem';
}

// Função para alternar entre o formulário de login e o formulário de registro
function toggleRegister() {
  register.value.register = !register.value.register;
  register.value.textMain = register.value.register ? 'Para prosseguir ao acesso, cadastre-se abaixo' : 'Por favor, faça o login na sua conta';
  register.value.button = register.value.register ? 'Cadastrar' : 'Acessar';
  register.value.haveAccount = register.value.register ? 'Já possui conta?' : 'Não possui conta?';
  register.value.createAccount = register.value.register ? 'Entrar' : 'Criar conta';
}

// função para registro e login de usuários
function onValidSubmit(values, actions) {
  if (register.value.register) {
    let checkEmail = store.state.authModule.users.find(user => user.email === form.value.email);
    if (checkEmail) {
      toast.error('O e-mail informado já possui cadastro!', { timeout: 1500 });
      actions.setFieldError('email', 'O e-mail informado já possui cadastro!')
      return;
    }
    registerUser(actions);
  } else {
    loginUser(actions);
  }
}

// função específica para registro de usuário
function registerUser(actions) {
  const loader = $loading.show()
  store.dispatch('authModule/updateUsers');
  setTimeout(() => {
    store.dispatch('authModule/registerUser', {
      id: uid(),
      email: form.value.email.toLowerCase(),
      username: form.value.email.split('@')[0],
      password: form.value.password,
      password2: form.value.confirmPassword,
    })
    loader.hide()
    toast.success('Cadastro realizado com sucesso!', { timeout: 1500 })
    toggleRegister();
    actions.resetForm();
  }, 1000)
}

// função específica para login de usuário
function loginUser(actions) {
  const loader = $loading.show();
  setTimeout(async () => {
    const logar = await store.dispatch('authModule/logIn', form.value)
    if (logar) {
      loader.hide()
      toast.success('Login realizado com sucesso!', { timeout: 1500 });
      router.push({ name: 'dashboard' })
    } else {
      loader.hide()
      toast.error('Usuário ou senha inválidos!', { timeout: 1500 });
      actions.setFieldError('password', 'Usuário ou senha incorretos!')
    };
  }, 1000)
}

// função para tratamento de erros do formulário
function onInvalidSubmit({ errors }) {
  for (let field in errors) {
    toast.error(errors[field], { timeout: 1500 });
  }
}

// função para aviso de funções em desenvolvimento
function alertUser() {
  toast.warning('Função em desenvolvimento!', { timeout: 1500 });
}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
}

.btnRegister {
  background-color: var(--color-primary);
  color: #fff;

  &:hover {
    background-color: var(--color-dark);
    color: #fff;
  }
}

.form-control {
  border: 1px solid var(--color-secondary);
}

.btnLogin {
  background-color: var(--color-secondary);
  color: #fff;

  &:hover {
    background-color: var(--color-dark);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.logo {
  width: 4rem;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 48px;
}

p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size: 14px;
}

.header {
  position: relative;
  text-align: center;
  background: #0F2027;
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027);
  color: white;
}

.logo {
  width: 50px;
  fill: white;
  padding-right: 15px;
  display: inline-block;
  vertical-align: middle;
}

.inner-header {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 80vh;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

.parallax>use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax>use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax>use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax>use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax>use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}


@media (max-width: 768px) {
  .waves {
    height: 25%;
    max-height: 10px;
  }

  .logo{
    width: 7rem;
  }

  .content {
    height: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}

@media (min-width: 768px) {

  .logo{
    width: 7rem;
  }
  
}

@media (min-width: 900px) {
  .logo {
    width: 10rem;
  }

  .waves {
    height: 15%;
    max-height: 30px;
  }

  .imgback {
    display: block;
    margin-right: 20px;
    margin-top: 10px;
  }

}

@media (max-width: 1000px) {
  .imgback {
    display: none;
  }
}
</style>