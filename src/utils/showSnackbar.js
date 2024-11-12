import { renderElement } from './renderElement.js';
import { getSnackbar } from '../components/snackbar.js';
import { getComponent } from './helpers.js';

/**
 * Conjunto para armazenar os IDs dos snackbars atualmente visíveis.
 * @type {Set<string>}
 */
const activeSnackbar = new Set();

/**
 * Função para criar e exibir uma mensagem Snackbar.
 *
 * @param {string} text - O texto da mensagem a ser exibida.
 * @param {number} duration - A duração em milissegundos durante a qual a mensagem será exibida.
 *
 * @example
 * // Exemplo de uso:
 * createSnackbar("Operação realizada com sucesso!", 5000);
 * // Exibirá uma mensagem Snackbar com o texto "Operação realizada com sucesso!" por 5 segundos.
 */
const createSnackbar = (text, duration) => {
  let snackbarContainer = /** @type {HTMLElement | undefined} */ (
    document.querySelector('.snackbar-container')
  );
  if (!snackbarContainer) {
    const snackbar = getComponent('div');
    snackbar.props.class = 'snackbar-container';
    const element = renderElement(snackbar, true);

    if (element instanceof HTMLElement) {
      snackbarContainer = element;
    }
  }
  const snackbarId = `snackbar-${Date.now()}`;
  const snackbar = getSnackbar(text);
  snackbar.props.id = 'snackbar';
  snackbar.props['data-id'] = snackbarId;

  activeSnackbar.add(snackbarId);

  const snackbarElement = renderElement(snackbar, true, snackbarContainer);
  // Remover o snackbar após a duração especificada
  setTimeout(() => {
    snackbarElement.remove();
    activeSnackbar.delete(snackbarId);

    //Remover o container se não houver mais snackbars ativos
    if (activeSnackbar.size === 0 && snackbarContainer) {
      snackbarContainer.remove();
    }
  }, duration);
};

/**
 * Função para exibir uma mensagem Snackbar.
 *
 * @param {string} text - O texto da mensagem a ser exibida.
 * @param {number} [duration=3000] - A duração em milissegundos durante a qual a mensagem será exibida. O padrão é 3000 (3 segundos).
 *
 * @example
 * // Exemplo de uso:
 * showSnackbar("Operação realizada com sucesso!", 5000);
 * // Exibirá uma mensagem Snackbar com o texto "Operação realizada com sucesso!" por 5 segundos.
 */
export const showSnackbar = (text, duration = 3000) => {
  createSnackbar(text, duration);
};
