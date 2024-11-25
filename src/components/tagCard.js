import {
  getComponent,
  getIconComponent,
  getTextComponent,
  secondsToTime,
  sleep,
  timeToSeconds,
} from '../utils/helpers';
import { ButtonType, createButton, IconSize } from './button';
//@ts-ignore
import clock from '../assets/images/clock.svg';
//@ts-ignore
import commentSvg from '../assets/images/comment.svg';
//@ts-ignore
import deleteIcon from '../assets/images/delete.svg';
//@ts-ignore
import commentEdit from '../assets/images/commentEdit.svg';
import { deleteTagInTagList, getTags } from '../services/storageHandle';
import { EventDelegator, renderElement } from '../utils/renderElement';
import { getPlayer } from '../services/youTubePlayer';

// Map para gerenciar temporizadores por tag
const tagTimers = new Map();

/**
 * Lida com a ação de cancelar ou excluir uma tag após uma confirmação com atraso.
 *
 * @param {Event} e - O evento de clique.
 */
const cancelAction = (e) => {
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

  // Procura o elemento mais próximo com o atributo 'data-id'
  const tagCard = btn.closest('[data-id]');

  // Verifica se o elemento encontrado é um HTMLElement e acessa o 'dataset'
  if (!(tagCard instanceof HTMLElement)) return;
  const tagId = tagCard.dataset.id;
  if (!tagId) return;

  // Alterna entre o estado "Cancelar" e "Excluir"
  if (btn.classList.contains('cancel')) {
    btn.classList.remove('cancel');
    btn.title = 'Apagar marcação';

    // Cancela o temporizador associado à tag
    if (tagTimers.has(tagId)) {
      clearTimeout(tagTimers.get(tagId));
      tagTimers.delete(tagId);
    }
    return;
  }

  btn.classList.add('cancel');
  btn.title = 'Cancelar';

  // Define um temporizador para excluir a tag após 5 segundos
  const timer = setTimeout(() => {
    btn.classList.remove('cancel'); // Remove o estado de cancelamento
    btn.title = 'Apagar marcação';

    deleteTagInTagList(currentVideoId, tagId); // Remove a tag do vídeo
    renderTagCardList(); // Atualiza a lista de tags

    tagTimers.delete(tagId); // Remove o temporizador associado à tag
  }, 5000);

  // Armazena o temporizador no Map
  tagTimers.set(tagId, timer);
};

const editTag = async (e) => {
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
    if (!tagCard) {
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

    if (
      !(finalTimeInput instanceof HTMLInputElement) ||
      !(initialTimeInput instanceof HTMLInputElement) ||
      !(tagCommentInput instanceof HTMLTextAreaElement) ||
      !(prioritySelector instanceof HTMLSelectElement)
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
        behavior: 'smooth'
    })

    // Busca o tempo inicial no player
    //@ts-ignore
    player.seekTo(timeToSeconds(startTime), true);

    // Remove a tag da lista e renderiza
    deleteTagInTagList(currentVideoId, tagId);
    renderTagCardList();
  } catch (error) {
    console.error('Erro ao editar a tag:', error);
  }
};

export const getTagCard = (tag) => {
  const { id, start, end, comment, priority } = tag;
  const componentId = getComponent('spam', getTextComponent(`ID: ${id}`));
  const componentTime = getComponent(
    'spam',
    getIconComponent(clock, 'small'),
    getComponent(
      'p',
      getTextComponent(`${secondsToTime(start)} - ${secondsToTime(end)}`)
    )
  );
  componentTime.props.class = 'time-wrapper';

  const textComment = getComponent('p', getTextComponent(`${comment}`));
  // textComment.props.title = comment;

  const commentComponent = getComponent(
    'spam',
    getIconComponent(commentSvg, 'small'),
    textComment
  );
  commentComponent.props.class = 'comment-wrapper';

  const priorityComponent = getComponent('spam');
  priorityComponent.props.class = `priority ${priority}`;

  const fistLine = getComponent('div', priorityComponent, componentId);
  fistLine.props.class = 'fist-line';

  const wrapperActions = getComponent(
    'div',
    createButton(
      '',
      cancelAction,
      deleteIcon,
      'btn-delete-tag',
      'Apagar marcação',
      false,
      ButtonType.PRIMARY,
      IconSize.SMALL
    ),
    createButton(
      '',
      editTag,
      commentEdit,
      'btn-commentEdit-tag',
      'Editar marcação',
      false,
      ButtonType.TERTIARY,
      IconSize.SMALL
    )
  );
  wrapperActions.props.class = 'wrapper-actions';

  const tagCard = getComponent(
    'li',
    fistLine,
    componentTime,
    commentComponent,
    wrapperActions
  );
  tagCard.props.class = 'tag-card';
  tagCard.props['data-id'] = id;
  tagCard.props.title = comment;

  return tagCard;
};

/**
 * Renderiza a lista de cards de vídeos no container designado.
 */
export const renderTagCardList = () => {
  /** @type {HTMLElement | null} */
  const tagCardsContainer = document.querySelector('[data-tagCardsContainer]');
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

  // Obtém a lista de tags do vídeo atual
  const currentTagList = getTags(currentVideoId);

  // Garante que o container de tags existe antes de continuar
  if (!tagCardsContainer) {
    console.error('Container de tags não encontrado!');
    return;
  }

  // Limpa eventos e conteúdo do container
  EventDelegator.cleanup(tagCardsContainer);
  tagCardsContainer.innerHTML = '';

  // Exibe uma mensagem caso a lista esteja vazia
  if (!currentTagList || currentTagList.length === 0) {
    renderElement(
      getComponent(
        '<>',
        getComponent('h5', getTextComponent('Marcações')),
        getComponent(
          'div',
          getComponent('p', getTextComponent('Nenhuma marcação adicionada'))
        )
      ),
      true,
      tagCardsContainer
    );
    return;
  }

  // Gera os elementos da lista de tags
  const tagCards = currentTagList.map((tag) => getTagCard(tag));
  const tagsList = getComponent('ol', ...tagCards);
  tagsList.props.class = 'tag-list';

  renderElement(
    getComponent(
      '<>',
      getComponent('h5', getTextComponent('Marcações')),
      tagsList
    ),
    true,
    tagCardsContainer
  );
};
