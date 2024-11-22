import { closeModal } from '../components/modal';
import { loadYouTubeAPI, createPlayer, playerDestroy } from '../services/youTubePlayer';
import {
  getRandomId,
  getSmallestAvailableThumbnail,
  videoIdFromURL,
} from '../utils/helpers';
import { showSnackbar } from '../utils/showSnackbar';
import { setItemVideoList } from '../services/storageHandle';
import { renderVideoCardList } from '../components/videoCard';

// Função auxiliar para gerenciar mensagens
const showMessage = (messageElement, show = true, message = '') => {
  messageElement.classList.toggle('hidden', !show);
  if (show && message) {
    messageElement.textContent = message;
  }
};

export const addVideoHandler = async (e) => {
  e.preventDefault();

  // Botão que acionou o evento
  const btn = e.target.closest('button');
  if (!btn) return;

  // Elementos necessários
  const input = document.querySelector('#input-add-video');
  const positiveMessage = document.querySelector('.home-positive-message');
  const negativeMessage = document.querySelector('.home-negative-message');

  if (!(input instanceof HTMLInputElement)) return;

  if (!positiveMessage || !negativeMessage) return;

  // Resetar mensagens
  showMessage(positiveMessage, false);
  showMessage(negativeMessage, false);

  // Validação de entrada
  if (!input || input.value.trim() === '') {
    showMessage(negativeMessage, true, 'Por favor, insira um URL válido.');
    return;
  }

  const url = input.value.trim();
  const videoId = videoIdFromURL(url);

  if (!videoId) {
    showMessage(negativeMessage, true, 'Por favor, insira um URL válido.');
    return;
  }

  const thumbnailUrl = await getSmallestAvailableThumbnail(videoId);

  // Exibir estado de carregamento
  btn.classList.add('loading');

  try {
    // Carrega a API do YouTube
    await loadYouTubeAPI();

    // Cria o player
    await createPlayer('player', videoId, {
      //@ts-ignore
      onReady: (event) => {
        setItemVideoList({
          id: getRandomId(),
          videoId: event.target.playerInfo.videoData.video_id,
          url: event.target.playerInfo.videoUrl,
          title: event.target.playerInfo.videoData.title,
          thumbnailUrl: thumbnailUrl,
          duration: event.target.playerInfo.duration,
          addedIn: Number(new Date()),
          tags: [],
        });
        showSnackbar('Vídeo carregado com sucesso!');
        showMessage(positiveMessage, true, 'Vídeo carregado com sucesso!');
        btn.classList.remove('loading');
        renderVideoCardList();
        playerDestroy();
      },
    });
  } catch (error) {
    // Tratamento de erros
    showMessage(
      negativeMessage,
      true,
      'Erro ao carregar o vídeo. Tente novamente.'
    );
    console.error('Erro ao inicializar o YouTube Player:', error);
  } finally {
    // Garantir que o estado de carregamento é removido
    btn.classList.remove('loading');
    input.value = '';
    setTimeout(() => {
      // Resetar mensagens
      showMessage(positiveMessage, false);
      showMessage(negativeMessage, false);

      closeModal(e);
    }, 500);
  }
};
