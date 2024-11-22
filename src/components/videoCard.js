import {
  getAnchor,
  getComponent,
  getImgComponent,
  getTextComponent,
  getTextSpan,
  secondsToTime,
  sleep,
  timeFormat,
} from '../utils/helpers';
import { ButtonType, createButton, IconSize } from './button';
//@ts-ignore
import deleteIcon from '../assets/images/delete.svg';
//@ts-ignore
import movieInfosEdit from '../assets/images/movieInfosEdit.svg';
import { deleteVideo, getVideoList } from '../services/storageHandle';
import { EventDelegator, renderElement } from '../utils/renderElement';
import { emptyMessage } from './emptyMessage';
import { PlayerStates, setupIframePlayer } from '../services/youTubePlayer';
import { renderTagCardList } from './tagCard';

let timer;

/**
 * Lida com a ação de cancelar ou excluir um vídeo após uma confirmação com atraso.
 *
 * @param {Event} e - O evento de clique.
 */
const cancelAction = (e) => {
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

  // Verifica se o elemento encontrado é um HTMLElement e acessa o 'dataset'
  if (!(videoCard instanceof HTMLElement)) return;
  const id = videoCard.dataset.id;
  if (!id) return;

  // Alterna entre o estado "Cancelar" e "Excluir"
  if (btn.classList.contains('cancel')) {
    btn.classList.remove('cancel');
    spanBtn.textContent = 'Excluir';
    clearTimeout(timer); // Cancela o temporizador existente
    return;
  }

  btn.classList.add('cancel');
  spanBtn.textContent = 'Cancelar';

  // Define um temporizador para excluir o vídeo após 5 segundos
  timer = setTimeout(() => {
    deleteVideo(id);
    btn.classList.remove('cancel'); // Remove o estado de cancelamento
    spanBtn.textContent = 'Excluir';

    renderVideoCardList()
  }, 5000);
};

/**
 * Lida com a edição de tags de um vídeo específico.
 *
 * @param {Event} e - O evento de clique.
 */
const editVideoTags = async (e) => {
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
  if (
    !(videoWrapper instanceof HTMLElement) ||
    !(videoPlaceholder instanceof HTMLElement)
  )
    return;

  // Configura o estado de carregamento
  videoWrapper.classList.add('loading');
  videoWrapper.dataset.currentVideoId = selectedVideo.id
  renderTagCardList();
  await sleep(500);

  const finalTime = document.querySelector('#finalTime');
  const initialTime = document.querySelector('#inicialTime');
  if (
    !(finalTime instanceof HTMLInputElement) ||
    !(initialTime instanceof HTMLInputElement)
  )
    return;

  try {
    // Configura o iframe dinâmico
    setupIframePlayer(selectedVideo.videoId, {
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

    EventDelegator.cleanup(videoWrapper);
    videoPlaceholder.remove();
  } catch (error) {
    console.error('Erro ao inicializar o YouTube Player:', error);
  } finally {
    // Remove o estado de carregamento
    videoWrapper.classList.remove('loading');
  }
};

export const getVideoCard = (objectVideo) => {
  const { id, videoId, url, title, thumbnailUrl, duration, addedIn, tags } =
    objectVideo;

  const videoUrl = getAnchor(url, 'Link do video');
  videoUrl.props.class = 'video-card-link';

  const durationWrapper = getTextSpan(
    `Duração do video: ${secondsToTime(duration)}`
  );
  durationWrapper.props.class = 'video-card-duration';
  durationWrapper.props.title = 'Duração do vídeo';

  const dateWrapper = getTextSpan(`Adicionado em: ${timeFormat(addedIn)}`);
  dateWrapper.props.class = 'video-card-date';
  dateWrapper.props.title = 'Data de adição';

  const numberOfTags = getTextSpan(`Número de Marcações: ${tags.length}`);
  numberOfTags.props.class = 'video-card-tags';

  const videoIdWrapper = getTextSpan(`ID do vídeo: ${videoId}`);
  videoIdWrapper.props.class = 'video-card-id';
  videoIdWrapper.props.title = 'ID do vídeo';

  const infosWrapper = getComponent(
    'div',
    videoUrl,
    durationWrapper,
    dateWrapper,
    numberOfTags,
    videoIdWrapper
  );
  infosWrapper.props.class = 'video-card-infos';

  const titleWrapper = getComponent('h5', getTextComponent(title));
  titleWrapper.props.class = 'video-card-title';

  const thumbnailWrapper = getComponent(
    'div',
    getImgComponent(thumbnailUrl, `Thumbnail for video ${title}`, 100, 100)
  );
  thumbnailWrapper.props.class = 'video-card-thumbnail-wrapper';
  thumbnailWrapper.props.title = `Thumbnail do video ${title}`;

  const header = getComponent('div', thumbnailWrapper, titleWrapper);
  header.props.class = 'video-card-header';

  const deleteButton = createButton(
    'Excluir',
    cancelAction,
    deleteIcon,
    '',
    `Delete video: ${title}`,
    false,
    ButtonType.PRIMARY,
    IconSize.SMALL
  );

  const editButton = createButton(
    'Editar',
    editVideoTags,
    movieInfosEdit,
    '',
    `Editar informações do video: ${title}`,
    false,
    ButtonType.TERTIARY,
    IconSize.SMALL
  );

  const actionWrapper = getComponent('div', deleteButton, editButton);
  actionWrapper.props.class = 'video-card-action';

  const videoCard = getComponent('li', header, infosWrapper, actionWrapper);
  videoCard.props.class = 'video-card';
  videoCard.props['data-id'] = id;

  return videoCard;
};

/**
 * Renderiza a lista de cards de vídeos no container designado.
 */
export const renderVideoCardList = () => {
  const currentVideoList = getVideoList();
  /** @type {HTMLElement | null} */
  const videosCardsContainer = document.querySelector(
    '[data-videosCardsContainer]'
  );

  // Garante que o container existe antes de continuar
  if (!videosCardsContainer) {
    console.error('Container de vídeos não encontrado!');
    return;
  }

  // Limpa eventos e conteúdo do container
  EventDelegator.cleanup(videosCardsContainer);
  videosCardsContainer.innerHTML = '';

  // Exibe uma mensagem caso a lista esteja vazia
  if (currentVideoList.length === 0) {
    renderElement(
      getComponent('h4', getTextComponent('Gerencie seus vídeos')),
      true,
      videosCardsContainer
    );
    renderElement(emptyMessage('vídeos'), true, videosCardsContainer);
    return;
  }

  // Cria os componentes de vídeo
  const videoCards = currentVideoList.map((video) => getVideoCard(video));
  const videosList = getComponent('ol', ...videoCards);
  videosList.props.class = 'videos-list';

  // Renderiza o título e a lista de vídeos no container
  renderElement(
    getComponent('h4', getTextComponent('Gerencie seus vídeos')),
    true,
    videosCardsContainer
  );
  renderElement(videosList, true, videosCardsContainer);
};
