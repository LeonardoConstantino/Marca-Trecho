/**
 * @import { ElementConfig } from '../utils/types.js'
 */

import { getComponent, getTextComponent } from '../utils/helpers';

/**
 * Cria um elemento de seleção (select) com opções baseadas em um objeto fornecido.
 *
 * @param {string} id - O ID do elemento de seleção.
 * @param {Object} objectOptions - Um objeto cujas chaves são os valores das opções e os valores são os rótulos das opções.
 * @param {Function} onChangeHandler - Uma função de retorno a ser executada quando o valor da seleção for alterado.
 * @param {string} [title=''] - Um título opcional para o elemento de seleção.
 * @returns {ElementConfig} - O elemento de seleção criado.
 */
export const getSelection = (id, objectOptions, onChangeHandler, title = '') => {
    if (!onChangeHandler || typeof onChangeHandler !== 'function') {
      throw new Error('onChangeHandler must be a function');
    }

  const options = Object.entries(objectOptions).map(([key, value]) => {
    const option = getComponent('option', getTextComponent(value));
    option.props.value = key;
    return option;
  });

  const select = getComponent('select', ...options);
  if(id) select.props.id = id;
  select.props.title = title;
  select.props.onChange = onChangeHandler;
  return select;
};
