import { getComponent, getTextSpan } from '../utils/helpers';

/**
 * Cria um elemento de rádio com um rótulo associado.
 *
 * @param {string} nameGroup - O nome do grupo de rádios ao qual este rádio pertence.
 * @param {string} value - O valor do rádio.
 * @param {string} textContent - O texto a ser exibido no rótulo do rádio.
 * @param {boolean} [checked=false] - Indica se o rádio deve ser marcado como selecionado por padrão.
 * @param {string} [className=''] - Uma classe CSS opcional a ser aplicada ao rótulo do rádio.
 * @param {string} [id=''] - Um ID opcional a ser aplicado ao rótulo do rádio.
 * @param {function | null} [onChangeHandler=null] - Uma função de retorno opcional a ser executada quando o rádio for alterado.
 * @returns {object} - Um objeto representando o elemento de rótulo do rádio.
 */
export const getInputRadio = (
  nameGroup,
  value,
  textContent,
  checked = false,
  className = '',
  id = '',
  onChangeHandler = null
) => {
  const input = getComponent('input');
  input.props.type = 'radio';
  input.props.name = nameGroup;
  input.props.value = value;
  if (checked) input.props.checked = 'checked';
  if (id) input.props.id = id;
  if (onChangeHandler) input.props.onChange = onChangeHandler;
  const label = getComponent('label', getTextSpan(textContent), input);
  if (className) label.props.class = className;
  if (id) label.props.for = id;
  return label;
};
