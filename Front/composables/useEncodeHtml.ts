/* Encode & decode */
export const useEncodeHtml = (text: string) => {
  if (typeof text !== 'string') {
    return ''
  }

  const encodedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')

  const txt = document.createElement('textarea')
  txt.innerHTML = encodedText

  return txt.value
}
