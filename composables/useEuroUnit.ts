/* Send a number in this function to get €uro unit. Ex: put 35 it will return "35,00€"*/
export const useEuroUnit = (price: number) => {
  if (price === undefined) {
    return ''
  }
  const newPrice = price % 1 === 0 ? price.toFixed(2) + '€' : price.toString().replace('.', ',') + '€'
  return newPrice
}
