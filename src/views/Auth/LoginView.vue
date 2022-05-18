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
                  <img src="../../assets/icons/logoInventary.svg"
                    style="width: 185px;" alt="logo">
                  <h4 class="mt-1 mb-5 pb-1">Nós somos o DEVInventary</h4>
                </div>

                <form>
                  <p>Por favor, faça o login na sua conta</p>

                  <div class="form-outline mb-2">
                    <input type="email" id="form2Example11" class="form-control"
                      placeholder="Informe o seu endereço de e-mail" />
                    <label class="form-label" for="form2Example11">E-mail</label>
                  </div>

                  <div class="form-outline mb-2">
                    <input type="password" class="form-control" />
                    <label class="form-label">Senha</label>
                  </div>

                  <div class="text-center ">
                    <button class="btn btn-success mb-3" type="button">Logar</button>
                   <!--  <a class="text-muted ms-2" href="#!">Esqueceu a senha?</a> -->
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Não possui conta?</p>
                    <button type="button" class="btn btn-outline-danger">Criar nova conta</button>
                  </div>

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center">
              <img src="../../assets/icons/Workspace_2_SVG.svg" width="100%" alt="">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import { useField } from 'vee-validate';
function isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return 'This is required';
    }
    const { errorMessage, value } = useField('fieldName', isRequired);



</script>

<style lang="scss" scoped>
.gradient-custom-2 {
/* fallback for old browsers */
background: var(--color-secondary);

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, var(--color-secondary), var(--color-primary),  var(--color-secondary));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, var(--color-secondary), var(--color-primary),  var(--color-secondary));
}

@media (min-width: 768px) {
.gradient-form {
height: 100vh !important;
}
}
@media (min-width: 769px) {
.gradient-custom-2 {
border-top-right-radius: .3rem;
border-bottom-right-radius: .3rem;
}
}
</style>