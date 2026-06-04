// Formata o CEP no padrão 00000-000
export function formatCep(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`
  return digits
}

// Valida o CEP no padrão 00000-000
export function isValidCep(value: string) {
  return /^\d{5}-\d{3}$/.test(value)
}

// Formata o preço em BRL
export function formatPrice(price: number) {
  if (price === 0) return 'Grátis'
  return (price / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// Formata a estimativa de entrega
// Ex: 1bd = Em 1 dia útil, 24h = Entrega hoje
export function formatEstimate(estimate: string) {
  const num = parseInt(estimate, 10)
  const unit = estimate.replace(/\d/g, '')

  if (unit === 'bd' || unit === 'd') {
    if (num === 0) return 'Entrega hoje'
    if (num === 1) return 'Em 1 dia útil'
    return `Em ${num} dias úteis`
  }

  if (unit === 'h') {
    if (num <= 24) return 'Entrega hoje'
    return `Em ${Math.ceil(num / 24)} dias úteis`
  }

  return estimate
}
