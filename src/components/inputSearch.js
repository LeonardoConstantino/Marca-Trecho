/**
 * @import { ElementConfig } from '../utils/types.js'
 * @import { InputElementConfig } from '../utils/types.js'
 * @import { labelInputElementConfig } from '../utils/types.js'
 */

import { getComponent } from '../utils/helpers';

/**
 * Cria um componente de campo de pesquisa com um rótulo associado.
 *
 * @param {Function} onInputHandler - Função de retorno de chamada a ser chamada quando o valor do campo de pesquisa for alterado.
 * @param {string} [id='search'] - ID único do campo de pesquisa.
 * @param {string} [className='search'] - Classe CSS a ser aplicada ao rótulo do campo de pesquisa.
 * @param {string} [placeholder='Pesquisar'] - Texto de espaço reservado a ser exibido no campo de pesquisa.
 * @param {string} [title='Pesquisar'] - Título do rótulo do campo de pesquisa.
 * @returns {ElementConfig} - Componente de rótulo do campo de pesquisa.
 */
export const getInputSearch = (
  onInputHandler,
  id = 'search',
  className = 'search',
  placeholder = 'Pesquisar',
  title = 'Pesquisar'
) => {
  if (!onInputHandler || typeof onInputHandler !== 'function') {
    throw new Error('onInputHandler must be a function');
  }

  const classForLabel = className !== '' ? `label-input-search ${className}` : 'label-input-search';

  /** @type {InputElementConfig} */
  const inputSearch = getComponent('input');
  inputSearch.props.id = id;
  inputSearch.props.type = 'search';
  inputSearch.props.name = id;
  inputSearch.props.placeholder = placeholder;
  inputSearch.props.onInput = onInputHandler;

  /** @type {labelInputElementConfig} */
  const labelInputSearch = getComponent('label', inputSearch);
  labelInputSearch.props.for = id;
  labelInputSearch.props.class = classForLabel;
  labelInputSearch.props.title = title;

  return labelInputSearch;
};
