import { closeModal } from '../components/modal';
import { storageUtil } from '../utils/storageUtil';

/**
 * Função responsável por alternar o tema da aplicação.
 * @param {Event} e - Evento de clique do usuário.
 * @returns {void}
 */
export const toggleTheme = (e) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLElement)) return;

  const modal = e.target.closest('dialog');
  if (!modal) return;

  const selectedTheme = modal.querySelector('input[name="theme"]:checked');
  if (selectedTheme instanceof HTMLInputElement) {
    storageUtil.setItem('theme', selectedTheme.value);
    document.documentElement.setAttribute('data-theme', selectedTheme.value);
  }

  closeModal(e);
};
