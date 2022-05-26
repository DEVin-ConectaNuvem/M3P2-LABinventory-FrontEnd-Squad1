import { string, date, number } from 'yup';

const validateEmail = string().email('Um e-mail válido deve ser informado').required('O e-mail é obrigatório');
const validatePassword = string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória');
const validateName = string().min(3, 'O nome deve ter no mínimo 3 caracteres').required('O nome é obrigatório');
const required = string().required('O campo é obrigatório');
const validateDate = date().required('A data é obrigatória').max(new Date(), 'A data não pode ser superior a data atual');
const validatePhone = string().min(14, 'O telefone deve ter no mínimo 10 caracteres').required('O telefone é obrigatório');
const validateNumber = number().positive('O número deve igual ou maior que zero').transform((_, val) => val ? parseFloat(val) : 0).required('O número é obrigatório');
const validateCEP = string().min(9, 'O CEP deve ter no mínimo 9 caracteres').required('O CEP é obrigatório');


export { validateEmail, validatePassword, validateName, required, validateDate, validatePhone, validateNumber, validateCEP };