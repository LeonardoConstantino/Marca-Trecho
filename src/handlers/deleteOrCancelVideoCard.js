import { deleteVideo, getVideoList } from '../services/storageHandle';
import { emptyMessage } from '../components/emptyMessage';
import { getVideoCard } from '../components/videoCard';
import { handleCancelAction } from './handleCancelAction';

// Map para gerenciar temporizadores por vídeo
const timers = new Map();

/**
 * Lida com a ação de cancelar ou excluir um vídeo após uma confirmação com atraso.
 *
 * @param {Event} e - O evento de clique.
 */
export const cancelAction = (e) => {
  handleCancelAction(e, {
    timerMap: timers,
    containerSelector: '[data-videosCardsContainer]',
    deleteCallback: deleteVideo,
    getListCallback: getVideoList,
    getCardComponent: getVideoCard,
    title: 'Gerencie seus vídeos',
    emptyMessage: () => emptyMessage('vídeos'),
    listClass: 'videos-list',
  });
};
