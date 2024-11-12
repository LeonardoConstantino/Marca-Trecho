/**
 * @import { ElementConfig } from '../utils/types.js'
 */
import { getComponent } from '../utils/helpers.js';
import { EventDelegator } from '../utils/renderElement.js';
import { createButton } from './button.js';

/**
 * Fecha um modal exibido na aplicação.
 *
 * @param {Event} e - O evento de clique do usuário que acionou o fechamento do modal.
 * @returns {void}
 */
export const closeModal = (e) => {
  e.preventDefault();
  if (!(e.target instanceof HTMLElement)) return;

  const modal = e.target.closest('dialog');
  if (modal instanceof HTMLDialogElement) {
    EventDelegator.cleanup(modal);
    modal.close();
    modal.remove();
  }
};

/**
 * Retorna um objeto que representa um elemento de interface do usuário do tipo "modal".
 *
 * @param {ElementConfig} content - O conteúdo a ser exibido no modal.
 * @param {string} className - Uma string que representa o nome da classe CSS a ser aplicada ao modal.
 * @param {Function} confirmeHandler - A função a ser executada quando o usuário confirmar a ação.
 * @param {string} [textBtnConfirme='OK'] - O texto a ser exibido no botão de confirmação.
 * @param {string} [titleBtnConfirme='Confirmar'] - O título a ser exibido no botão de confirmação.
 * @param {Function} [cancelHandler=closeModal] - A função a ser executada quando o usuário cancelar a ação.
 * @param {string} [textBtnCancel='Cancelar'] - O texto a ser exibido no botão de cancelamento.
 * @param {string} [titleBtnCancel='Fechar'] - O título a ser exibido no botão de fechamento.
 * @returns {ElementConfig} - Um objeto que representa o modal.
 */
export const getModal = (
  content,
  className,
  confirmeHandler,
  textBtnConfirme = 'OK',
  titleBtnConfirme = 'Confirmar',
  cancelHandler = closeModal,
  textBtnCancel = 'Cancelar',
  titleBtnCancel = 'Fechar',
) => {
  if (!confirmeHandler || typeof confirmeHandler !== 'function') {
    throw new Error('confirmeHandler must be a function');
  }

  const classForModal =
    className !== '' ? `dialog-modal ${className}` : 'dialog-modal';

  const confirmeModalButton = createButton(
    textBtnConfirme,
    confirmeHandler,
    '',
    '',
    titleBtnConfirme
  );

  const cancelModalButton = createButton(
    textBtnCancel,
    cancelHandler,
    '',
    'button-secondary',
    titleBtnCancel
  );
  if (cancelModalButton.props) cancelModalButton.props.formmethod = 'dialog';

  const form = getComponent('form', confirmeModalButton, cancelModalButton);
  if (form.props) form.props.method = 'dialog';

  const closeButton = createButton('X', closeModal, '', 'close', 'Fechar');

  const modal = getComponent('dialog', closeButton, content, form);
  if (content.props) content.props.class = 'dialog-content';
  modal.props.class = classForModal;

  return modal;
};

//TODO : adicionar animaçao de entrada e saida do modal