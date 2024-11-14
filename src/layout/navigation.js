// src/layout/navigation.js
import { ButtonType, createButton } from '../components/button.js';
import { getCurrentView, toggleView } from '../handlers/toggleView.js';
import { contactView } from '../pages/contact.js';
import { homeView } from '../pages/home.js';
import { getComponent } from '../utils/helpers.js';

const views = {
  Home: homeView,
  Contact: contactView,
  'Minhas Playlists': contactView,
  Tutorial: contactView,
};

/**
 * Cria os links de navegação com base nos caminhos das rotas.
 *
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

    if(navButton.props) navButton.props['data-navButton'] = name;

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
