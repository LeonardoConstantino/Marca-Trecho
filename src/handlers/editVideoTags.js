import {
  getComponent,
  getTextComponent,
  secondsToTime,
  sleep,
} from '../utils/helpers';
import { getTags, getVideoList } from '../services/storageHandle';
import { EventDelegator } from '../utils/renderElement';
import { PlayerStates, setupIframePlayer } from '../services/youTubePlayer';
import { getTagCard } from '../components/tagCard';
import { closeModal } from '../components/modal';
import { renderCardList } from '../utils/renderUtils';

/**
 * Lida com a edição de tags de um vídeo específico.
 *
 * @param {Event} e - O evento de clique.
 */
export const editVideoTags = async (e) => {
  e.preventDefault();

  // Valida o elemento disparador
  if (!(e.target instanceof HTMLElement)) return;
  const btn = e.target?.closest('button');
  const videoCard = btn?.closest('[data-id]');
  if (!(videoCard instanceof HTMLElement)) return;
  const id = videoCard?.dataset?.id;
  if (!btn || !id) return;

  const navButton = document.querySelector('[data-navButton="Marcar trechos"]');
  if (!(navButton instanceof HTMLButtonElement)) return;

  // Simula clique no botão de navegação
  navButton.click();

  const currentVideoList = getVideoList();
  const selectedVideo = currentVideoList.find((video) => video.id === id);
  if (!selectedVideo) return;

  await sleep(500);

  const videoWrapper = document.querySelector('#videoWrapper');
  const videoPlaceholder = videoWrapper?.querySelector('.video-placeholder');
  const tagCardsContainer = document.querySelector('[data-tagCardsContainer]');
  if (
    !(videoWrapper instanceof HTMLElement) ||
    !(videoPlaceholder instanceof HTMLElement) ||
    !(tagCardsContainer instanceof HTMLElement)
  )
    return;

  // Configura o estado de carregamento
  videoWrapper.classList.add('loading');
  videoWrapper.dataset.currentVideoId = selectedVideo.id;

  renderCardList({
    container: tagCardsContainer,
    list: getTags(selectedVideo.id),
    getCardComponent: getTagCard,
    title: 'Marcações',
    emptyMessage: () =>
      getComponent(
        'div',
        getComponent('p', getTextComponent('Nenhuma marcação adicionada'))
      ),
    listClass: 'tag-list',
  });

  await sleep(500);

  const finalTime = document.querySelector('#finalTime');
  const initialTime = document.querySelector('#inicialTime');
  if (
    !(finalTime instanceof HTMLInputElement) ||
    !(initialTime instanceof HTMLInputElement)
  )
    return;

  try {
    const { width, height } = videoWrapper.getBoundingClientRect();
    // Configura o iframe dinâmico
    await setupIframePlayer(selectedVideo.videoId, {
      width: width.toString(),
      height: height.toString(),
      containerId: 'videoWrapper',
      onReady: (event) => {
        const iframe = event.target.getIframe();
        iframe?.classList.remove('loading');

        // Atualiza valores máximos
        const duration = event.target.getDuration();
        finalTime.max = secondsToTime(duration);
        initialTime.max = secondsToTime(duration);
        event.target.playVideo();
      },
      onStateChange: (event) => {
        if (event.data === PlayerStates.PAUSED) {
          const currentTime = event.target.getCurrentTime();
          const duration = event.target.getDuration();
          const finalTimeNewValue = Math.min(currentTime + 10, duration);

          // Atualiza inputs de tempo
          finalTime.value = secondsToTime(finalTimeNewValue);
          finalTime.min = secondsToTime(currentTime);
          initialTime.value = secondsToTime(currentTime);
          initialTime.max = secondsToTime(currentTime);
        }
      },
    });

    // cleanupContainer(videoWrapper);
    EventDelegator.cleanup(videoWrapper);
    videoPlaceholder.remove();
  } catch (error) {
    console.error('Erro ao inicializar o YouTube Player:', error);
  } finally {
    // Remove o estado de carregamento
    videoWrapper.classList.remove('loading');
    closeModal(e);
  }
};
