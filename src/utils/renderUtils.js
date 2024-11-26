import { getComponent, getTextComponent } from './helpers.js'
import { EventDelegator, renderElement } from './renderElement.js'

/**
 * Limpa os eventos e o conteúdo de um container.
 *
 * @param {HTMLElement} container - O container a ser limpo.
 * @param {boolean} isRemove - Se deve remover o container após a limpeza.
 */
export const cleanupContainer = (container, isRemove=false) => {
  EventDelegator.cleanup(container);
  isRemove? container.remove(): container.innerHTML = '';
};

/**
 * Renderiza uma lista genérica de cards no container designado.
 *
 * @param {Object} options - Configurações para renderização.
 * @param {HTMLElement} options.container - O container onde os cards serão renderizados.
 * @param {Array} options.list - A lista de itens a serem renderizados.
 * @param {Function} options.getCardComponent - Função que retorna o componente do card baseado no item da lista.
 * @param {string} options.title - Título exibido acima da lista.
 * @param {Function} options.emptyMessage - Função que retorna o componente exibido quando a lista está vazia.
 * @param {string} [options.listClass='list'] - Classe CSS atribuída à lista de cards.
 */
export const renderCardList = ({
    container,
    list,
    getCardComponent,
    title,
    emptyMessage,
    listClass = 'list',
  }) => {
    if (!container) {
      console.error('Container não encontrado!');
      return;
    }
  
    // Limpa eventos e conteúdo do container
    cleanupContainer(container);
  
    // Exibe uma mensagem caso a lista esteja vazia
    if (!list || list.length === 0) {
      renderElement(
        getComponent(
          '<>',
          getComponent('h4', getTextComponent(title)),
          emptyMessage()
        ),
        true,
        container
      );
      return;
    }
  
    // Gera os elementos da lista
    const cards = list.map((item) => getCardComponent(item));
    const cardList = getComponent('ol', ...cards);
    cardList.props.class = listClass;
  
    renderElement(
      getComponent('<>', getComponent('h4', getTextComponent(title)), cardList),
      true,
      container
    );
  };
  