import { renderTagCardList } from '../components/tagCard';
import { setTagInTagList } from '../services/storageHandle';
import { getPlayer } from '../services/youTubePlayer';
import { getRandomId, sleep, timeToSeconds } from '../utils/helpers';

/**
 * Lida com a criação e adição de uma tag para o vídeo atual.
 *
 * @param {Event} e - O evento de clique.
 */
export const addTagsHandler = async (e) => {
  e.preventDefault();

  const player = getPlayer();
  player?.pauseVideo();

  await sleep(500);

  // Valida o elemento disparador
  if (!(e.target instanceof HTMLElement)) return;
  const btn = e.target.closest('button');
  if (!btn) return;

  // Obtém o contêiner de criação de tags
  const createTagsContainer = btn.closest('.create-tags');
  if (!createTagsContainer) return;

  // Obtém os elementos de entrada necessários
  const finalTimeInput = createTagsContainer.querySelector('#finalTime');
  const initialTimeInput = createTagsContainer.querySelector('#inicialTime');
  const tagCommentInput = createTagsContainer.querySelector('#tagCommentInput');
  const prioritySelector =
    createTagsContainer.querySelector('#prioritySelector');
  const videoWrapper = document.querySelector('#videoWrapper');

  // Valida a existência dos elementos
  if (
    !(finalTimeInput instanceof HTMLInputElement) ||
    !(initialTimeInput instanceof HTMLInputElement) ||
    !(tagCommentInput instanceof HTMLTextAreaElement) ||
    !(prioritySelector instanceof HTMLSelectElement) ||
    !(videoWrapper instanceof HTMLElement)
  ) {
    console.error('Erro: Elementos necessários não encontrados.');
    return;
  }

  // Obtém o ID do vídeo atual
  const currentVideoId = videoWrapper.dataset.currentVideoId;
  if (!currentVideoId) {
    console.error('Erro: Nenhum vídeo atual encontrado.');
    return;
  }

  // Valida os valores dos campos
  const start = timeToSeconds(initialTimeInput.value);
  const end = timeToSeconds(finalTimeInput.value);
  const comment = tagCommentInput.value.trim();
  const priority = prioritySelector.value;

  if (isNaN(start) || isNaN(end) || start >= end) {
    console.error('Erro: O tempo inicial deve ser menor que o tempo final.');
    return;
  }

  if (!comment) {
    console.error('Erro: O comentário da tag é obrigatório.');
    return;
  }

  // Cria e adiciona a tag
  const newTag = {
    id: getRandomId(),
    start,
    end,
    comment,
    priority,
  };

  setTagInTagList(currentVideoId, newTag);
  // console.log('Tag adicionada com sucesso:', newTag);

  // Opcional: Limpa os campos após salvar
  // initialTimeInput.value = '';
  // finalTimeInput.value = '';
  tagCommentInput.value = '';
  prioritySelector.value = 'low';

  renderTagCardList();
};
