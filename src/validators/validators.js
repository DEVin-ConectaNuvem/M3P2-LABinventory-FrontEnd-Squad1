import {
    string,
    date,
    number
} from 'yup';

const validateEmail = string().email('Um e-mail válido deve ser informado').required('O e-mail é obrigatório').nullable();
const validatePassword = string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('A senha é obrigatória').nullable();
const validateName = string().min(3, 'O nome deve ter no mínimo 3 caracteres').required('O nome é obrigatório').nullable();
const required = string().required('O campo é obrigatório').nullable();
const validateDate = date().required('A data é obrigatória').max(new Date(), 'A data não pode ser superior a data atual').nullable();
const validatePhone = string().required('O telefone é obrigatório').min(14, 'O telefone deve ter no mínimo 9 dígitos').nullable();
const validateNumber = number().positive('O número deve ser igual ou maior que zero').transform((_, val) => val ? parseFloat(val) : 0).required('O número é obrigatório');
const validateCEP = string().min(9, 'O CEP deve ter 8 dígitos').required('O CEP é obrigatório').nullable();
const validateUrl = string().url('Deve ser informada uma URL válida').required('A URL é obrigatória').nullable();

export {
    validateEmail,
    validatePassword,
    validateName,
    required,
    validateDate,
    validatePhone,
    validateNumber,
    validateCEP,
    validateUrl
};