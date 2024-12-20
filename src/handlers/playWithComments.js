/**
 * @import { Tag } from '../utils/types.js';
 */
import { getComponent, sleep } from '../utils/helpers';
import { videoWrapper as objVideoContainer } from '../pages/addTags.js';
import { showModal } from '../handlers/showModal.js';
import { getVideoList } from '../services/storageHandle.js';
import { PlayerStates, setupIframePlayer } from '../services/youTubePlayer.js';
import { EventDelegator } from '../utils/renderElement.js';

/**
 * Exibe os comentários das tags com base no progresso do vídeo.
 *
 * @param {Object} player - O player de vídeo (ex.: YouTube Iframe API).
 * @param {Tag[]} tags - A lista de tags associadas ao vídeo.
 */
const displayTagComments = (player, tags) => {
  const commentContainer = document.querySelector('#commentContainer');
  if (!commentContainer) {
    console.error('Elemento para exibir comentários não encontrado.');
    return;
  }

  // Função que atualiza o comentário com base no tempo atual
  const updateComment = () => {
    const currentTime = player.getCurrentTime();
    const activeTag = tags.find(
      (tag) => currentTime >= tag.start && currentTime <= tag.end
    );

    if (activeTag) {
      commentContainer.textContent = activeTag.comment;
      commentContainer.className = `comment-box visible ${activeTag.priority}`;
    } else {
      commentContainer.textContent = '';
      commentContainer.className = 'comment-box';
    }
  };

  // Configura o intervalo para verificar o tempo do vídeo (100ms)
  const interval = setInterval(updateComment, 100);

  // Limpa o intervalo quando o vídeo termina
  player.addEventListener('onStateChange', (event) => {
    if (event.data === PlayerStates.ENDED) {
      clearInterval(interval);
    }
  });
};

/**
 * Função assíncrona que manipula a exibição de um vídeo em um modal.
 * Essa função é acionada quando o usuário clica no botão "Assistir" em uma das
 * thumbnails de vídeo na página "Excerpts Tagged".
 *
 * @param {Event} e - O evento de clique no botão "Assistir".
 * @returns {Promise<void>} - Uma Promise que resolve quando o vídeo é exibido no modal.
 */
export const playWithComments = async (e) => {
  e.preventDefault();

  const commentContainer = getComponent('div');
  commentContainer.props.id = 'commentContainer';
  commentContainer.props.class = 'comment-box';

  // Exibe o modal correspondente
  showModal(
    getComponent('<>', objVideoContainer, commentContainer),
    'excerpts-tagged-play-book'
  );

  // Valida o elemento disparador
  if (!(e.target instanceof HTMLElement)) return;
  const btn = e.target?.closest('button');
  const id = btn?.dataset?.currentVideoId;
  if (!btn || !id) {
    console.error('Botão ou ID do vídeo não encontrado.');
    return;
  }

  // Recupera o vídeo selecionado
  const selectedVideo = getVideoList().find((video) => video.id === id);
  if (!selectedVideo) {
    console.error('Vídeo selecionado não encontrado na lista.');
    return;
  }

  await sleep(500);

  // Verifica os elementos de vídeo
  const videoWrapper = document.querySelector('#videoWrapper');
  const videoPlaceholder = videoWrapper?.querySelector('.video-placeholder');
  if (
    !(
      videoWrapper instanceof HTMLElement &&
      videoPlaceholder instanceof HTMLElement
    )
  ) {
    console.error('Elementos de vídeo não encontrados ou inválidos.');
    return;
  }

  // Configura o estado de carregamento
  videoWrapper.classList.add('loading');

  await sleep(500);

  try {
    // Obtém dimensões do contêiner do vídeo
    const { width, height } = videoWrapper.getBoundingClientRect();

    // Configura o iframe dinâmico
    await setupIframePlayer(selectedVideo.videoId, {
      width: width.toString(),
      height: height.toString(),
      containerId: 'videoWrapper',
      onReady: (event) => {
        const iframe = event.target.getIframe();
        iframe?.classList.remove('loading'); // Remove o estado de carregamento no iframe
        event.target.playVideo(); // Reproduz o vídeo automaticamente
        if (selectedVideo.tags && selectedVideo.tags.length > 0) {
          displayTagComments(event.target, selectedVideo.tags);
        }
      },
      onStateChange: (event) => {
        if (event.data === PlayerStates.PAUSED) {
          console.log('Vídeo pausado:', event.data);
        }
      },
    });

    // Limpa os eventos e elementos placeholders
    EventDelegator.cleanup(videoWrapper);
    videoPlaceholder.remove();
  } catch (error) {
    console.error('Erro ao inicializar o YouTube Player:', error);
  } finally {
    // Remove o estado de carregamento, independentemente do sucesso ou erro
    videoWrapper.classList.remove('loading');
  }
};
