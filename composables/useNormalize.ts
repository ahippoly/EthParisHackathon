/* remove all special caracteres and replace them to get get normlized string */
export const useNormalize = (string: string) => {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split(' ')
    .join('')
}
