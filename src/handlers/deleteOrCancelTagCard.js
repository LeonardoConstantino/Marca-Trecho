import { getComponent, getTextComponent } from '../utils/helpers';
import { deleteTagInTagList, getTags } from '../services/storageHandle';
import { getTagCard } from '../components/tagCard';
import { handleCancelAction } from './handleCancelAction';

// Map para gerenciar temporizadores por tag
const tagTimers = new Map();

/**
 * Lida com a ação de cancelar ou excluir uma tag após uma confirmação com atraso.
 *
 * @param {Event} e - O evento de clique.
 */
export const cancelAction = (e) => {
  e.preventDefault();

  // Garante que o evento seja disparado por um botão válido
  if (!(e.target instanceof HTMLElement)) return;
  const btn = e.target.closest('button');
  if (!btn) return;

  /** @type {HTMLElement | null} */
  const videoWrapper = document.querySelector('[data-current-video-id]');

  // Verifica se o container de vídeo e o ID do vídeo estão disponíveis
  if (!videoWrapper) {
    console.error('Wrapper de vídeo não encontrado!');
    return;
  }

  const currentVideoId = videoWrapper.dataset.currentVideoId;
  if (!currentVideoId) {
    console.error('Nenhum ID de vídeo disponível no wrapper.');
    return;
  }

  handleCancelAction(e, {
    timerMap: tagTimers,
    containerSelector: '[data-tagCardsContainer]',
    deleteCallback: (id) => deleteTagInTagList(currentVideoId, id),
    getListCallback: () => getTags(currentVideoId),
    getCardComponent: getTagCard,
    title: 'Marcações',
    emptyMessage: () =>
      getComponent(
        'div',
        getComponent('p', getTextComponent('Nenhuma marcação adicionada'))
      ),
    listClass: 'tag-list',
  });
};
