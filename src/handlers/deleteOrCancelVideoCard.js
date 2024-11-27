import { sleep } from '../utils/helpers';
import { deleteVideo, getVideoList } from '../services/storageHandle';
import { emptyMessage } from '../components/emptyMessage';
import { renderCardList } from '../utils/renderUtils';
import { getVideoCard } from '../components/videoCard';

// Map para gerenciar temporizadores por vídeo
const timers = new Map();

/**
 * Lida com a ação de cancelar ou excluir um vídeo após uma confirmação com atraso.
 *
 * @param {Event} e - O evento de clique.
 */
export const cancelAction = (e) => {
  e.preventDefault();

  // Garante que o evento seja disparado por um botão válido
  if (!(e.target instanceof HTMLElement)) return;
  const btn = e.target.closest('button');
  if (!btn) return;

  // Obtém o botão de cancelamento e o span para feedback visual
  const spanBtn = btn.querySelector('span');
  if (!spanBtn) return;

  // Procura o elemento mais próximo com o atributo 'data-id'
  const videoCard = btn.closest('[data-id]');
  if (!(videoCard instanceof HTMLElement)) return;

  const id = videoCard.dataset.id;
  if (!id) return;

  // Alterna entre o estado "Cancelar" e "Excluir"
  if (btn.classList.contains('cancel')) {
    btn.classList.remove('cancel');
    spanBtn.textContent = 'Excluir';

    // Cancela o temporizador associado ao vídeo
    if (timers.has(id)) {
      clearTimeout(timers.get(id));
      timers.delete(id);
    }

    return;
  }

  btn.classList.add('cancel');
  spanBtn.textContent = 'Cancelar';

  /** @type {HTMLElement | null} */
  const videosCardsContainer = document.querySelector(
    '[data-videosCardsContainer]'
  );

  // Garante que o container existe antes de continuar
  if (!videosCardsContainer) {
    console.error('Container de vídeos não encontrado!');
    return;
  }

  // Define um temporizador para excluir o vídeo após 5 segundos
  const timer = setTimeout(() => {
    deleteVideo(id); // Função que remove o vídeo
    btn.classList.remove('cancel');
    spanBtn.textContent = 'Excluir';
    videoCard.classList.add('hidden');

    sleep(250);
    
    timers.delete(id); // Remove o temporizador após a execução

    // Re-renderiza a lista apenas se todos os timers estiverem vazios
    if (timers.size === 0) {
      renderCardList({
        container: videosCardsContainer,
        list: getVideoList(),
        getCardComponent: getVideoCard,
        title: 'Gerencie seus vídeos',
        emptyMessage: () => emptyMessage('vídeos'),
        listClass: 'videos-list',
      });
    }
  }, 5000);

  // Armazena o temporizador no Map
  timers.set(id, timer);
};
