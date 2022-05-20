<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                  <div class="text-center">
                    <img src="../../assets/icons/logoInventary.svg" class="img-fluid logo" alt="logo">
                    <h4 class="mt-1 mb-5 pb-1">Nós somos o DEVInventary</h4>
                  </div>

                  <form @submit.prevent="register.register ? registerUser() : loginUser()">
                    <p v-text="register.textMain"></p>


                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">@</span>
                      </div>
                      <input type="text" class="form-control" name="email" placeholder="Digite o e-mail"
                        aria-label="Email" v-model="form.email" required>
                    </div>


                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">&#128273</span>
                      </div>
                      <input type="password" class="form-control" placeholder="Digite sua senha" aria-label="senha"
                        v-model="form.password" required>
                    </div>

                    <transition>
                      <div class="input-group mb-3" v-if="register.register">
                        <div class="input-group-prepend">
                          <span class="input-group-text">&#128273</span>
                        </div>
                        <input type="password" class="form-control" placeholder="Digite novamente a sua senha"
                          aria-label="senha" v-model="form.password2" >
                      </div>
                    </transition>

                    <div class="text-center ">
                      <button :class="register.register ? 'btn btnRegister mb-3' : 'btn btnLogin mb-3'" type="submit"
                        v-text="register.button">
                      </button>
                      <!--  <a class="text-muted ms-2" href="#!">Esqueceu a senha?</a> -->
                    </div>

                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2" v-text="register.haveAccount"></p>
                      <a class="" @click.stop="toggleRegister" v-text="register.createAccount"></a>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center">
                <img src="../../assets/icons/Workspace_2_SVG.svg" class="imgback img-fluid" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { uid } from 'uid';
import { ref } from 'vue';
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import {useLoading} from 'vue-loading-overlay'
/* import * as yup from "yup";
import { useForm, useFieldValue } from "vee-validate";

const schema = yup.object({
  email: yup.required().email(),
  password: yup.required().min(8),
  password2: yup.required().min(8).oneOf([yup.ref('password')], 'As senhas não são iguais'),

});

const { setFieldValue, handleSubmit } = useForm({
   validationSchema: schema,
   initialValues: {
      address: { addressType: "personal" },
   },
});
 */

const loading = useLoading()
const toast = useToast();
const store = useStore();
const router = useRouter();

// Objeto para dados do formulário de Login/Registro
const form = ref({
  id: '',
  email: '',
  password: '',
  password2: '',
});

// objeto que será usado para manipular o estado de login e registro
const register = ref({
  register: false,
  textMain: 'Por favor, faça o login na sua conta',
  button: 'Acessar',
  haveAccount: 'Não possui conta?',
  createAccount: 'Criar conta',
});

// Função para alternar entre o formulário de login e o formulário de registro
function toggleRegister() {
  register.value.register = !register.value.register;
  register.value.textMain = register.value.register ? 'Para prosseguir ao acesso, cadastre-se abaixo' : 'Por favor, faça o login na sua conta';
  register.value.button = register.value.register ? 'Cadastrar' : 'Acessar';
  register.value.haveAccount = register.value.register ? 'Já possui conta?' : 'Não possui conta?';
  register.value.createAccount = register.value.register ? 'Entrar' : 'Criar conta';
}

// chama a função de registro do usuário
function registerUser() {
  let checkEmail = store.state.authModule.users.find(user => user.email === form.value.email);

  if (checkEmail) {
    toast.error('O e-mail informado já possui cadastro!', {
      timeout: 1500,
    });
    return;
  }

  if (form.value.password !== form.value.password2) {
    toast.error('As senhas não conferem!', {
      timeout: 1500,
    });
    return;
  }

  store.dispatch('authModule/updateUsers');

  store.dispatch('authModule/registerUser', {
    id: uid(),
    email: form.value.email,
    username: form.value.email.split('@')[0],
    password: form.value.password,
    password2: form.value.password2,
  }).then(() => {
    toast.success('Cadastro realizado com sucesso!', {
      timeout: 1500,
    });
    toggleRegister();
    clearForm();
  }).catch(() => {
    toast.error('Erro ao realizar cadastro!',{
      timeout: 1500,
    });;
  });
}

// chama a função de login do usuário
async function loginUser() {
  const logar = await store.dispatch('authModule/logIn', form.value)
  if (logar) {
    toast.success('Login realizado com sucesso!', {
      timeout: 1500,
    });
    router.push({ name: 'home' })
  } else {
    toast.error('Usuário ou senha inválidos!', {
      timeout: 1500,
    });
  }
}

function clearForm() {
  form.value.password = '';
  form.value.password2 = '';
}
</script>

<style lang="scss" scoped>
.btnRegister {
  background-color: var(--color-primary);
  color: var(--color-dark);

  &:hover {
    background-color: var(--color-dark);
    color: var(--color-white);
  }
}

.btnLogin {
  background-color: var(--color-secondary);
  color: var(--color-white);

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

.imgback {
  display: none;
}

.logo {
  width: 4rem;
}

@media (min-width: 900px) {
  .logo {
    width: 10rem;
  }

  .imgback {
    display: block;
    margin-right: 20px;
    margin-top: 10px;
  }

  .gradient-form {
    height: 100vh !important;
  }
}
</style>