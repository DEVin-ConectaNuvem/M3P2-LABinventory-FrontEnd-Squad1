import { string } from 'yup';

const validateEmail = string().email('Um e-mail válido deve ser informado').required('O e-mail é obrigatório');
const validatePassword = string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória');


export { validateEmail, validatePassword };