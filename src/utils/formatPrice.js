export function formatPrice(number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(number);
}
