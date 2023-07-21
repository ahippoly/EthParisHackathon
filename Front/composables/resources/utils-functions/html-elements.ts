/* TYPES */

class HtmlElementsUtils {
  /**
   * Sets the cursor of an contenteditable element
   *
   * @param {HTMLElement} element         the element to set the cursor of
   * @param {number}      cursorPosition  the wanted position of the cursor. If not specified, maximum position is set by default
   */

  // TODO: update function to make to work with variables number of childnodes
  static setContentEditableCursorPosition(element: HTMLElement, cursorPosition = -1) {
    if (!element || !element.getAttribute('contenteditable') || !element.childNodes.length) return

    const innerText = element.innerText

    if (cursorPosition < 0 || cursorPosition > innerText.length) cursorPosition = innerText.length

    const range = document.createRange()
    const selection = window.getSelection()
    if (!selection) return

    range.setStart(element.childNodes[0], cursorPosition)
    range.collapse(true)

    selection.removeAllRanges()
    selection.addRange(range)
  }
}

export default HtmlElementsUtils
