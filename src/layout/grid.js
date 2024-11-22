// src/layout/grid.js
import { views } from '../handlers/toggleView';
import { getLastView } from '../services/storageHandle';
import { FIRST_VIEW } from '../utils/constants'
import { getComponent } from '../utils/helpers'
import { renderElement } from '../utils/renderElement';

const lastView = getLastView();

/**
 * Cria um contêiner de página com os componentes fornecidos.
 *
 * @returns {object} O contêiner de página completo.
 */
const getViewContainer = () => {
  // Cria o componente de página com os componentes filhos fornecidos
  const page = getComponent('main')
  page.props['class'] = 'view-container' // Define a classe CSS para estilização
  page.props['data-view'] = FIRST_VIEW // Define o atributo data-page

  return page
}


/**
 * Define a view atual da aplicação.
*
* Esta função é responsável por definir a view atual da aplicação, atualizando o contêiner de página com o componente correspondente.
*/
export const setView = () => {
  /**@type {HTMLElement | null} */
  const viewContainer = document.querySelector("#app > main")
  
  if (!viewContainer) return
  renderElement(views[lastView], true, viewContainer)
}

// Exporta o contêiner de página
export const viewContainer = getViewContainer()
