// src/layout/navigation.js
import { ButtonType, createButton } from '../components/button.js';
import { getCurrentView, toggleView, views } from '../handlers/toggleView.js';
import { getComponent } from '../utils/helpers.js';

/**
 * Cria os links de navegação com base nos caminhos das rotas.
 *
 * @param {object} views - Um objeto que mapeia os nomes das rotas para os caminhos correspondentes.
 * @returns {object} O componente de navegação completo.
 */
const createNavigation = (views) => {
  const currentView = getCurrentView();

  const anchors = Object.entries(views).map(([name, path]) => {
    const isCurrentView = name === currentView;
    const navButton = createButton(
      name,
      () => toggleView(name, path),
      '',
      '',
      '',
      isCurrentView,
      ButtonType.SECONDARY
    );

    if (navButton.props) navButton.props['data-navButton'] = name;

    return navButton;
  });

  const nav = getComponent('nav', ...anchors);

  return nav;
};

// Cria o contêiner de navegação
const divNav = getComponent('div', createNavigation(views));
divNav.props['data-nav'] = '';

// Exporta o componente de navegação
export const navigation = divNav;
