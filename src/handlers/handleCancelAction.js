import { renderCardList } from '../utils/renderUtils';

/**
 * Lida com a ação de cancelar ou excluir um item após uma confirmação com atraso.
 *
 * @param {Event} e - O evento de clique.
 * @param {Object} options - Configurações para a ação.
 * @param {Map} options.timerMap - Map para gerenciar os temporizadores.
 * @param {string} options.containerSelector - Seletor do container principal.
 * @param {Function} options.deleteCallback - Função que remove o item da lista.
 * @param {Function} options.getListCallback - Função que obtém a lista atualizada.
 * @param {Function} options.getCardComponent - Função que gera o componente do item.
 * @param {string} options.title - Título da lista renderizada.
 * @param {Function} options.emptyMessage - Função que retorna a mensagem de lista vazia.
 * @param {string} options.listClass - Classe da lista renderizada.
 */
export const handleCancelAction = (e, options) => {
  e.preventDefault();

  const {
    timerMap,
    containerSelector,
    deleteCallback,
    getListCallback,
    getCardComponent,
    title,
    emptyMessage,
    listClass,
  } = options;

  if (!(e.target instanceof HTMLElement)) return;
  const btn = e.target.closest('button');
  if (!btn) return;

  const card = btn.closest('[data-id]');
  if (!(card instanceof HTMLElement)) return;

  const id = card.dataset.id;
  if (!id) return;

  const container = document.querySelector(containerSelector);
  if (!container || !(container instanceof HTMLElement)) {
    console.error(`Container '${containerSelector}' não encontrado!`);
    return;
  }

  if (btn.classList.contains('cancel')) {
    btn.classList.remove('cancel');
    btn.title = 'Excluir';

    if (timerMap.has(id)) {
      clearTimeout(timerMap.get(id));
      timerMap.delete(id);
    }
    return;
  }

  btn.classList.add('cancel');
  btn.title = 'Cancelar';

  const timer = setTimeout(() => {
    deleteCallback(id); // Remove o item
    btn.classList.remove('cancel');
    btn.title = 'Excluir';
    card.classList.add('hidden');
    timerMap.delete(id);

    if (timerMap.size === 0) {
      renderCardList({
        container,
        list: getListCallback(),
        getCardComponent,
        title,
        emptyMessage,
        listClass,
      });
    }
  }, 5000);

  timerMap.set(id, timer);
};
