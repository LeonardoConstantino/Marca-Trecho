import { fistView } from '../utils/constants';
import { EventDelegator, renderElement } from '../utils/renderElement';

export const getCurrentView = () => {
  const viewContainer = document.querySelector('[data-view]');
  return viewContainer instanceof HTMLElement
    ? viewContainer.dataset.view
    : fistView;
};

export const toggleView = async (name, path) => {
  const viewContainer = document.querySelector('[data-view]');
  const currentView = getCurrentView();

  // Desativar todos os botões temporariamente
  const navButtons = document.querySelectorAll('[data-navButton]');
  navButtons.forEach((button) => button.setAttribute('disabled', ''));

  // Manipulação dos botões de navegação
  const previousNavButton = document.querySelector(
    `[data-navButton="${currentView}"]`
  );
  const currentNavButton = document.querySelector(`[data-navButton="${name}"]`);

  if (previousNavButton) previousNavButton.removeAttribute('disabled');
  if (currentNavButton) currentNavButton.setAttribute('disabled', '');

  // Atualização da visualização com transição
  if (viewContainer instanceof HTMLElement) {
    const view = viewContainer.querySelector('.view');
    EventDelegator.cleanup(viewContainer);

    if (view) view.classList.remove('view');
    if (view) view.classList.add('view-out');

    setTimeout(() => {
      viewContainer.innerHTML = '';
      renderElement(path, true, viewContainer);
      viewContainer.dataset.view = name;

      // Reativar todos os botões, exceto o atual
      navButtons.forEach((button) => button.removeAttribute('disabled'));
      if (currentNavButton) currentNavButton.setAttribute('disabled', '');
    }, 350);
  }
};
