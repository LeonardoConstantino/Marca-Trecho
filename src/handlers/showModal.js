/**
 * @file Exibe um modal na aplicação.
 * @import { ElementConfig } from '../utils/types.js'
 */

import { getModal } from '../components/modal.js';
import { renderElement } from '../utils/renderElement.js';

/**
 * Exibe um modal na aplicação.
 *
 * @param {ElementConfig} content - O conteúdo a ser exibido no modal.
 * @param {string} className - Uma string que representa o nome da classe CSS a ser aplicada ao modal.
 * @param {Function} confirmeHandler - A função a ser executada quando o usuário confirmar a ação.
 * @param {string} [textBtnConfirme='OK'] - O texto a ser exibido no botão de confirmação.
 * @param {string} [titleBtnConfirme='Confirmar'] - O título a ser exibido no botão de confirmação.
 * @param {Function} [cancelHandler=closeModal] - A função a ser executada quando o usuário cancelar a ação.
 * @param {string} [textBtnCancel='Cancelar'] - O texto a ser exibido no botão de cancelamento.
 * @param {string} [titleBtnCancel='Fechar'] - O título a ser exibido no botão de fechamento.
 * @returns {void}
 */
export const showModal = (
    content,
    className,
    confirmeHandler,
    textBtnConfirme,
    titleBtnConfirme,
    cancelHandler,
    textBtnCancel,
    titleBtnCancel
  ) => {
    const modal = renderElement(
      getModal(
        content,
        className,
        confirmeHandler,
        textBtnConfirme,
        titleBtnConfirme,
        cancelHandler,
        textBtnCancel,
        titleBtnCancel
      ),
      true
    );
  
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };