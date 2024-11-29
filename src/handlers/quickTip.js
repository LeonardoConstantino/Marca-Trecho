import {
  addTagsViewTutorial,
  excerptsTaggedTutorial,
  homeViewTutorial,
  tutorialViewTutorial,
} from '../pages/tutorial';
import { showModal } from './showModal';
import { getComponent } from '../utils/helpers';
import { getLastView } from '../services/storageHandle';

/**
 * Objeto que contém as dicas rápidas para cada visualização da aplicação.
 * As chaves do objeto representam os nomes das visualizações e os valores
 * são as funções que retornam os componentes das dicas correspondentes.
 */
const tip = Object.freeze({
  'Pagina inicial': homeViewTutorial,
  'Marcar trechos': addTagsViewTutorial,
  'Trechos Marcados': excerptsTaggedTutorial,
  // 'Criar Playlist': createPlaylistView,
  Tutorial: tutorialViewTutorial,
});

/**
 * Exibe uma dica rápida para o usuário, com base na visualização atual.
 * A dica é exibida em um modal.
 */
export const quickTip = () => {
  const currentView = getLastView();

  showModal(getComponent('div', tip[currentView]), '');
};
