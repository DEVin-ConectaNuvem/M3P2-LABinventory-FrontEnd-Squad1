
import { defineRule } from 'vee-validate';
import { email, required, min, max } from '@vee-validate/rules';

defineRule('email', (value) => {
    if(email(value) && required(value)){
        return true
    }

    return 'É necessário informar um e-mail válido'
})


defineRule('password', (value) => {
    if(required(value) && min(value, {lenght:8}) && max(value, {lenght:30})) {
      return true;
    }
    return 'A senha deve conter entre 8 e 30 caracteres';
    }
  );
  
  
  defineRule('confirmPassword', (value, [target], ctx) =>{
      if(required(value) && value === ctx.form[target]){
        return true;
      }
  
      return 'As senhas não conferem';
  
  });