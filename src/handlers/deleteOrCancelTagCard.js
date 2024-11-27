import { getComponent, getTextComponent } from '../utils/helpers';
import { deleteTagInTagList, getTags } from '../services/storageHandle';
import { renderCardList } from '../utils/renderUtils';
import { getTagCard } from '../components/tagCard';

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

  /** @type {HTMLElement | null} */
  const tagCardsContainer = document.querySelector('[data-tagCardsContainer]');

  // Garante que o container de tags existe antes de continuar
  if (!tagCardsContainer) {
    console.error('Container de tags não encontrado!');
    return;
  }

  // Define um temporizador para excluir a tag após 5 segundos
  const timer = setTimeout(() => {
    btn.classList.remove('cancel'); // Remove o estado de cancelamento
    btn.title = 'Apagar marcação';
    tagCard.classList.add('hidden');

    deleteTagInTagList(currentVideoId, tagId); // Remove a tag do vídeo
    //renderTagCardList(); // Atualiza a lista de tags

    tagTimers.delete(tagId); // Remove o temporizador associado à tag

    // Re-renderiza a lista apenas se todos os timers estiverem vazios
    if (tagTimers.size === 0) {
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
    }
  }, 5000);

  // Armazena o temporizador no Map
  tagTimers.set(tagId, timer);
};
