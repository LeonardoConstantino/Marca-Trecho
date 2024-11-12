import { getTextComponent } from '../utils/helpers.js'

/**
 * Retorna um objeto que representa um elemento de interface do usuário do tipo "snackbar".
 *
 * @param {string} text - O texto a ser exibido no snackbar.
 * @param {string} [className = 'show'] - A classe CSS a ser aplicada ao snackbar.
 * @returns {object} - Um objeto que representa o snackbar.
 */
export const getSnackbar = (text, className = 'show') => {
  return {
    type: 'div',
    props: {
      id: 'snackbar',
      children: [getTextComponent(text)],
      class: className,
    },
  }
}
