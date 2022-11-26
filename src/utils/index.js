import moment from 'moment'

function formatDate(date, fmt) {
  if (date) {
    const useMoment = moment(date)
    return useMoment.format(fmt)
  }
  return date
}

function formatValueMoney(value) {
  if (value) {
    typeof value === 'string' ? (value = parseFloat(value)) : (value = value)
    const valueFormated = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return valueFormated
  }
  return value
}

export { formatDate, formatValueMoney }
