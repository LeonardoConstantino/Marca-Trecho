/**
 * @import { ElementConfig } from '../utils/types.js'
 */

import { getComponent, getTextSpan } from '../utils/helpers';

/**
 * Cria um elemento de checkbox com um rótulo associado.
 *
 * @param {string} value - O valor do checkbox.
 * @param {string} textContent - O texto a ser exibido no rótulo do checkbox.
 * @param {boolean} [checked=false] - Indica se o checkbox deve ser marcado como selecionado por padrão.
 * @param {string} [className=''] - Uma classe CSS opcional a ser aplicada ao rótulo do checkbox.
 * @param {string} [id=''] - Um ID opcional a ser aplicado ao rótulo do checkbox.
 * @param {function | null} [onChangeHandler=null] - Uma função de retorno opcional a ser executada quando o checkbox for alterado.
 * @returns {ElementConfig} - Um objeto representando o elemento de rótulo do checkbox.
 */
export const getInputCheckBox = (
  value,
  textContent,
  checked = false,
  className = '',
  id = '',
  title = '',
  onChangeHandler = null
) => {
  if (!onChangeHandler || typeof onChangeHandler !== 'function') {
    throw new Error('onChangeHandler must be a function');
  }
  const input = getComponent('input');
  input.props.type = 'checkbox';
  input.props.value = value;
  input.props.onChange = onChangeHandler;

  if (checked) input.props.checked = 'checked';
  if (id) input.props.id = id;

  const label = getComponent('label', getTextSpan(textContent), input);
  label.props.class = `label-input-checked ${className}`;
  if (title) label.props.title = title;
  if (id) label.props.for = id;

  return label;
};
