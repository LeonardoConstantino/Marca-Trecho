// src/layout/navigation.js
import { ButtonType, createButton } from '../components/button.js';
import { contactView } from '../pages/contact.js';
import { homeView } from '../pages/home.js';
import { getComponent } from '../utils/helpers.js';

export const views = [{ Home: homeView }, { Contact: contactView }, { 'Minhas Playlists': contactView }, { 'Tutorial': contactView }];

/**
 * Cria os links de navegação com base nos caminhos das rotas.
 *
 * @returns {object} O componente de navegação completo.
 */
export const createNavigation = (views, currentView) => {
  const anchors = views.map((view) => {
    const name = Object.keys(view)[0];
    const isCurrentView = name === currentView;
    const navButton = createButton(
      name,
      () => {
        console.log('name :', name);
      },
      '',
      '',
      '',
      isCurrentView,
      ButtonType.SECONDARY,
    );

    return navButton;
  });

  const nav = getComponent('nav', ...anchors);

  return nav;
};

const getCurrentView = () => {
  return 'Home';
};

// Cria o contêiner de navegação
const divNav = getComponent('div', createNavigation(views, getCurrentView()));
divNav.props['data-nav'] = '';

// Exporta o componente de navegação
export const navigation = divNav;
