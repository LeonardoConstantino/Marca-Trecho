// src/layout/grid.js
// import { homeView } from '../pages/home'
import { views } from '../handlers/toggleView';
import { getLastView } from '../services/storageHandle';
import { FIRST_VIEW } from '../utils/constants'
import { getComponent } from '../utils/helpers'

const lastView = getLastView();

/**
 * Cria um contêiner de página com os componentes fornecidos.
 *
 * @param {...object} childres - Os componentes filhos a serem incluídos na página.
 * @returns {object} O contêiner de página completo.
 */
const getView = (...childres) => {
  // Cria o componente de página com os componentes filhos fornecidos
  const page = getComponent('main', ...childres)
  page.props['class'] = 'view-container' // Define a classe CSS para estilização
  page.props['data-view'] = FIRST_VIEW // Define o atributo data-page

  return page
}

// Exporta o contêiner de página
export const viewContainer = getView(views[lastView] )
