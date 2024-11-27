/**
 * @import { ElementConfig } from '../utils/types'
 */

import { addTagsView } from '../pages/addTags';
import { createPlaylistView } from '../pages/createPlaylist';
import { excerptsTagged } from '../pages/excerptsTagged';
import { homeView } from '../pages/home';
import { tutorialView } from '../pages/tutorial';
import { getLastView } from '../services/storageHandle';
import { FIRST_VIEW } from '../utils/constants';
import { renderElement } from '../utils/renderElement';
import { cleanupContainer } from '../utils/renderUtils';
import { storageUtil } from '../utils/storageUtil';

/**
 * Objeto que mapeia os nomes das visualizações (views) com seus respectivos componentes.
 * Cada chave representa o nome da visualização e o valor é o componente correspondente.
 */
export const views = Object.freeze({
  'Pagina inicial': homeView,
  'Marcar trechos': addTagsView,
  'Trechos Marcados': excerptsTagged,
  // 'Criar Playlist': createPlaylistView,
  Tutorial: tutorialView,
});

/**
 * Retorna a visualização (view) atual exibida no contêiner de visualização ou a última visualização armazenada no armazenamento local.
 * @returns {string} O nome da visualização atual.
 */
export const getCurrentView = () => {
  const viewContainer = document.querySelector('[data-view]');

  // Garantindo que o elemento é um HTMLElement antes de acessar dataset
  const currentView = viewContainer instanceof HTMLElement ? viewContainer.dataset.view : undefined;

  // Retorna a visualização atual ou a última visualização armazenada, com fallback para a visualização padrão
  return currentView || getLastView() || FIRST_VIEW;
};



/**
 * Alterna a visualização (view) exibida no contêiner de visualização.
 * @param {string} name - O nome da visualização a ser exibida.
 * @param {ElementConfig} view - O caminho do componente da visualização a ser renderizado.
 * @returns {Promise<void>} Uma promessa que se resolve quando a visualização é alternada com sucesso.
 */
export const toggleView = async (name, view) => {
  const viewContainer = document.querySelector('[data-view]');
  const currentViewName = getCurrentView();

  // Desativar todos os botões temporariamente
  const navButtons = document.querySelectorAll('[data-navButton]');
  navButtons.forEach((button) => button.setAttribute('disabled', ''));

  // Manipulação dos botões de navegação
  const previousNavButton = document.querySelector(
    `[data-navButton="${currentViewName}"]`
  );
  const currentNavButton = document.querySelector(`[data-navButton="${name}"]`);

  if (previousNavButton) previousNavButton.removeAttribute('disabled');
  if (currentNavButton) currentNavButton.setAttribute('disabled', '');

  // Atualização da visualização com transição
  if (viewContainer instanceof HTMLElement) {
    const currentViewElement = viewContainer.querySelector('.view');
    
    if (currentViewElement || currentViewElement) {
      currentViewElement.classList.add('view-out');
      currentViewElement.classList.remove('view');
    } 
    
    setTimeout(() => {
      cleanupContainer(viewContainer);
      renderElement(view, true, viewContainer);
      viewContainer.dataset.view = name;
      storageUtil.setItem('lastView', name);

      // Reativar todos os botões, exceto o atual
      navButtons.forEach((button) => button.removeAttribute('disabled'));
      if (currentNavButton) currentNavButton.setAttribute('disabled', '');
    }, 250);
  }
};
