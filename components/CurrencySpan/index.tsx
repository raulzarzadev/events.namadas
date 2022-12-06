export const CurrencySpan = ({ value = 0 }: { value: number }) => {
  const val = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(value)

  return <span className="  w-full mx-auto text-inherit">{val}</span>
}
