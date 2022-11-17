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
                      <h4 class="mt-1 ">Nós somos o <strong>LABinventary</strong></h4>
                    </div>
                    <VeeForm data-testid="vue-toast-info" @submit="onValidSubmit" v-slot="{ errors }" @invalid-submit="onInvalidSubmit"
                      class="animate__animated animate__backInLeft">
                      <div class="d-flex align-items-end justify-content-center mb-2 ">
                        <p class="mb-0 me-2 text-light " v-text="register.haveAccount"></p>
                        <a class="text-white" @click.stop="toggleRegister" v-text="register.createAccount"></a>
                      </div>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">🔒</span>
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
                        <button :class="register.register ? 'btn btn-success me-3' : 'btn btn-info text-white me-3 btnLogin'"
                          type="submit" v-text="register.button">
                        </button>
                        <button data-testid="login-google-button" class="btn btn-light" type="button" @click="alertUser"><i
                            class="fa-brands fa-google"></i></button>
                        <hr>
                        <a class="ms-2 text-white" v-show="!register.register" @click="alertUser">Esqueceu a senha?</a>
                      </div>
                    </VeeForm>
                  </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center">
                  <img src="../../assets/icons/Workspace_2_SVG.svg"
                    class="imgback img-fluid animate__animated animate__backInRight" alt="wallpaper-login-image">
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
import { Field as Veefield, Form as VeeForm } from 'vee-validate';
import { ref } from 'vue';
import { useLoading } from 'vue-loading-overlay';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useStore } from 'vuex';
import { validateEmail, validatePassword } from '../../validators/validators.js';
import { useAxios } from "../../hooks";
import jwt_decode from "jwt-decode";

const { axios } = useAxios();

const $loading = useLoading()
const toast = useToast();
const store = useStore();
const router = useRouter();

const form = ref({
  id: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const register = ref({
  register: false,
  textMain: 'Faça o login ou cadastre-se',
  button: 'Acessar',
  haveAccount: 'Não possui conta?',
  createAccount: 'Cadastre-se',
});

function decodeJwt(jwt) {
  const decodedJwt = jwt_decode(jwt)
  return decodedJwt
}

function validateConfirmPassword(value) {
  if (!value) {
    return 'A confirmação da senha é obrigatória';
  } else if (value !== form.value.password) {
    return 'As senhas não conferem';
  }
  return value === form.value.password ? true : 'As senhas não conferem';
}

function toggleRegister() {
  register.value.register = !register.value.register;
  register.value.textMain = register.value.register ? 'Para prosseguir ao acesso, cadastre-se abaixo' : 'Por favor, faça o login na sua conta';
  register.value.button = register.value.register ? 'Cadastrar' : 'Acessar';
  register.value.haveAccount = register.value.register ? 'Já possui conta?' : 'Não possui conta?';
  register.value.createAccount = register.value.register ? 'Entrar' : 'Criar conta';
}


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


async function registerUser(actions) {
  const loader = $loading.show()
  try {
    const payload = {
      email: form.value.email.toLowerCase(),
      password: form.value.password
    }
    const res = await axios.post('/users/create', payload);
    if (res.status === 200) {
      toast.success('Usuário cadastrado com sucesso!', { timeout: 1500 });
      toggleRegister();
      actions.resetForm();
    }
  } catch (error) {
    toast.error('Erro ao cadastrar usuário!', { timeout: 1500 });
  } finally {
    loader.hide()
  }
}


async function loginUser(actions) {
  const loader = $loading.show();
  try {
    const payload = {
      email: form.value.email.toLowerCase(),
      password: form.value.password
    }
    const res = await axios.post('/users/login', payload);
    if (res.status === 200) {
      const decodedJwt = decodeJwt(res.data.token);
      console.log(decodedJwt)
      toast.success('Login realizado com sucesso!', { timeout: 1500 });
      store.dispatch('authModule/logIn', decodedJwt);
      router.push('/dashboard');
    }
  } catch (error) {
    toast.error('Usuário ou senha inválidos!', { timeout: 1500 });
    actions.setFieldError('password', 'Usuário ou senha incorretos!')
  } finally {
    loader.hide()
  }
}

function onInvalidSubmit({ errors }) {
  for (let field in errors) {
    toast.error(errors[field], { timeout: 1500 });
  }
}

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
  background-color: #4aa1c7;
  color: #fff;

  &:hover {
    background-color: rgb(26, 63, 143);
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
  background: #ffffff;
  background: -webkit-linear-gradient(to right, #9e6af2, #c852e5, #7d19e8);
  background: linear-gradient(to right, #7c5dd8, #7633c3, #530598);
  color: white;
}

.invalid-feedback {
  color: rgb(255, 186, 186);
  text-shadow: rgb(255, 3, 3) 2px 1px 7px;
}

.is-invalid {
  background: rgba(252, 196, 196, 0.817);
}

.btn-light {
  --bs-btn-hover-bg: rgba(184, 183, 183, 0.817);
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
    margin-bottom: 10px;
  }

  .waves {
    height: 15%;
    max-height: 30px;
  }

  .imgback {
    display: block;
    margin-right: 20px;
    margin-top: 10px;
    margin-left: 10px;
  }

}

@media (max-width: 1000px) {
  .imgback {
    display: none;
  }
}
</style>