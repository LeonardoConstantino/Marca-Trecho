import {
  getComponent,
  getTextComponent,
  secondsToTime,
  sleep,
  timeToSeconds,
} from '../utils/helpers';
import { deleteTagInTagList, getTags } from '../services/storageHandle';
import { getPlayer } from '../services/youTubePlayer';
import { renderCardList } from '../utils/renderUtils';
import { getTagCard } from '../components/tagCard';

/**
 * Função assíncrona que lida com a edição de uma tag de vídeo.
 * Essa função é exportada para ser usada em outros módulos.
 *
 * @param {Event} e - O evento que disparou a função.
 * @returns {Promise<void>} - Uma Promise que resolve quando a edição da tag é concluída.
 */
export const editTag = async (e) => {
  e.preventDefault();

  try {
    // Pausa o vídeo
    const player = getPlayer();
    if (player) player.pauseVideo();

    await sleep(250);

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

    // Verifica se o evento disparado é válido
    if (!(e.target instanceof HTMLElement)) return;
    const tagCard = e.target.closest('.tag-card');
    if (!(tagCard instanceof HTMLElement)) {
      console.error('Tag card não encontrado!');
      return;
    }

    // Extração das informações do card
    const tagId = tagCard.dataset.id;
    const timeWrapper = tagCard.querySelector('.time-wrapper');
    const commentWrapper = tagCard.querySelector('.comment-wrapper');
    const priorityElement = tagCard.querySelector('.priority');

    if (!timeWrapper || !commentWrapper || !priorityElement) {
      console.error('Informações incompletas na tag card!');
      return;
    }

    if (!tagId) {
      console.error('ID da tag não encontrado!');
      return;
    }

    if (!timeWrapper.textContent || !commentWrapper.textContent) {
      console.error('Tempo ou comentário não encontrados na tag card!');
      return;
    }

    const [startTime, endTime] = timeWrapper.textContent.split(' - ');
    const comment = commentWrapper.textContent;
    const priority = priorityElement.classList[1];

    // Validação dos valores extraídos
    if (!startTime || !endTime || !comment || !priority) {
      console.error('Dados da tag inválidos ou incompletos!');
      return;
    }

    // Seleção do container de criação de tags
    const createTagsContainer = document.querySelector('.create-tags');
    if (!createTagsContainer) {
      console.error('Container de criação de tags não encontrado!');
      return;
    }

    // Seleção dos inputs
    const finalTimeInput = createTagsContainer.querySelector('#finalTime');
    const initialTimeInput = createTagsContainer.querySelector('#inicialTime');
    const tagCommentInput =
      createTagsContainer.querySelector('#tagCommentInput');
    const prioritySelector =
      createTagsContainer.querySelector('#prioritySelector');
    const tagCardsContainer = document.querySelector(
      '[data-tagCardsContainer]'
    );

    if (
      !(finalTimeInput instanceof HTMLInputElement) ||
      !(initialTimeInput instanceof HTMLInputElement) ||
      !(tagCommentInput instanceof HTMLTextAreaElement) ||
      !(prioritySelector instanceof HTMLSelectElement) ||
      !(tagCardsContainer instanceof HTMLElement)
    ) {
      console.error('Erro: Elementos necessários não encontrados.');
      return;
    }

    // Define os valores nos inputs
    //@ts-ignore
    const duration = player.getDuration();
    initialTimeInput.max = secondsToTime(duration);
    initialTimeInput.value = startTime;
    finalTimeInput.value = endTime;
    tagCommentInput.value = comment;
    prioritySelector.value = priority;

    window.scrollTo({
      top: videoWrapper.offsetTop + 100,
      behavior: 'smooth',
    });

    // Busca o tempo inicial no player
    //@ts-ignore
    player.seekTo(timeToSeconds(startTime), true);

    // Remove a tag da lista e renderiza
    deleteTagInTagList(currentVideoId, tagId);

    renderCardList({
      container: tagCardsContainer,
      list: getTags(currentVideoId),
      getCardComponent: getTagCard,
      title: 'Marcações',
      emptyMessage: () =>
        getComponent(
          'div',
          getComponent('p', getTextComponent('Nenhuma marcação adicionada'))
        ),
      listClass: 'tag-list',
    });
  } catch (error) {
    console.error('Erro ao editar a tag:', error);
  }
};
