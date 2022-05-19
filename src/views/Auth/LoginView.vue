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

                  <form>
                    <p v-text="register.textMain"></p>


                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">@</span>
                      </div>
                      <input type="text" class="form-control" name="email" placeholder="Digite o e-mail" aria-label="Email"
                        v-model="login.email">
                    </div>
                   

                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">&#128273</span>
                      </div>
                      <input type="password" class="form-control" placeholder="Digite sua senha" aria-label="senha" v-model="login.password">
                    </div>

                    <transition>
                      <div class="input-group mb-3" v-if="register.register">
                        <div class="input-group-prepend">
                          <span class="input-group-text">&#128273</span>
                        </div>
                        <input type="password" class="form-control" placeholder="Digite novamente a sua senha"
                          aria-label="senha" v-model="login.password2">
                      </div>
                    </transition>

                    <div class="text-center ">
                      <button :class="register.register ? 'btn btnRegister mb-3' : 'btn btnLogin mb-3'" type="button"
                        v-text="register.button" ></button>
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
import { ref } from 'vue';

const login = ref({
  email: '',
  password: '',
  password2: ''
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