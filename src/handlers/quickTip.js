import {
  addTagsViewTutorial,
  excerptsTaggedTutorial,
  homeViewTutorial,
  tutorialViewTutorial,
} from '../pages/tutorial';
import { getCurrentView } from '../handlers/toggleView';
import { showModal } from './showModal';
import { getComponent } from '../utils/helpers';

/**
 * Exibe uma dica rápida para o usuário, com base na visualização atual.
 * A dica é exibida em um modal.
 */
export const quickTip = () => {
  const tip = Object.freeze({
    'Pagina inicial': homeViewTutorial,
    'Marcar trechos': addTagsViewTutorial,
    'Trechos Marcados': excerptsTaggedTutorial,
    // 'Criar Playlist': createPlaylistView,
    Tutorial: tutorialViewTutorial,
  });

  showModal(getComponent('div', tip[getCurrentView()]), '');
};
