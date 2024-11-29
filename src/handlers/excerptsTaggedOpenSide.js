import { getComponent, getTextComponent } from '../utils/helpers';
import { getTags, getVideoInListById } from '../services/storageHandle';
import { renderElement } from '../utils/renderElement';
import { getTagCard } from '../components/tagCard';
import { cleanupContainer, renderCardList } from '../utils/renderUtils';
import { getVideoCard } from '../components/videoCard';

/**
 * Abre o video do painel lateral da aplicação.
 *
 * @param {Event} e - O evento que disparou a ação.
 */
export const openSide = (e) => {
  /**
   * Oculta todos os elementos que correspondem ao seletor, exceto aquele com o ID especificado.
   *
   * @param {string} selector - O seletor dos elementos a serem manipulados.
   * @param {string} id - O ID do elemento a ser mantido visível.
   */
  const toggleVisibilityExcept = (selector, id) => {
    const elements = [...document.querySelectorAll(selector)];
    elements.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
      const isCurrent = element.dataset.id === id;
      element.classList.toggle('hidden', isCurrent);
    });
  };

  e.preventDefault();

  // Valida o elemento disparador
  if (!(e.target instanceof HTMLElement)) return;

  const btn = e.target?.closest('button');
  const videoCard = btn?.closest('[data-id]');
  if (!(videoCard instanceof HTMLElement)) return;

  const id = videoCard.dataset?.id;
  if (!btn || !id) return;

  const btnPlayBook = document.querySelector('.play-book');
  if (!(btnPlayBook instanceof HTMLButtonElement)) return;

  btnPlayBook.classList.remove('hidden');
  btnPlayBook.dataset.currentVideoId = id;

  // Oculta todos os vídeos, exceto o atual
  toggleVisibilityExcept('.video-card', id);

  // Atualiza os containers designados
  const videosCardsContainer = document.querySelector('.excerpts-tagged-infos');
  const TagsListWrapper = document.querySelector('.tags-list-wrapper');

  if (
    !videosCardsContainer ||
    !TagsListWrapper ||
    !(videosCardsContainer instanceof HTMLElement) ||
    !(TagsListWrapper instanceof HTMLElement)
  ) {
    console.error('Containers necessários não foram encontrados.');
    return;
  }

  // Limpa eventos e conteúdo dos containers
  cleanupContainer(TagsListWrapper);
  cleanupContainer(videosCardsContainer);

  // Renderiza o card do vídeo atual
  const videoCardSide = getVideoCard(getVideoInListById(id));
  renderElement(videoCardSide, true, videosCardsContainer);

  const tagsSortTagsByStart = getTags(id).sort((a, b) => {
    return a.start - b.start;
  });

  // Renderiza a lista de marcações
  renderCardList({
    container: TagsListWrapper,
    list: tagsSortTagsByStart,
    getCardComponent: getTagCard,
    title: 'Marcações',
    emptyMessage: () =>
      getComponent(
        'div',
        getComponent('p', getTextComponent('Nenhuma marcação adicionada'))
      ),
    listClass: 'tags-list',
  });
};
