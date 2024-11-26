/**
 * @import { ElementConfig } from '../utils/types.js'
 */
import { getComponent } from '../utils/helpers.js';
import { ButtonType, createButton, IconSize } from './button.js';
//@ts-ignore
import close from '../assets/images/close.svg';
import { cleanupContainer } from '../utils/renderUtils.js';

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
    modal.classList.add('modal-close')
    
    setTimeout(() => {
      modal.close();
      cleanupContainer(modal, true);
    }, 450);
  }
};

/**
 * Retorna um objeto que representa um elemento de interface do usuário do tipo "modal".
 *
 * @param {ElementConfig} content - O conteúdo a ser exibido no modal.
 * @param {string} className - Uma string que representa o nome da classe CSS a ser aplicada ao modal.
 * @param {Function | null} [confirmeHandler=null] - A função a ser executada quando o usuário confirmar a ação, ou null se não houver uma função de confirmação, os botoes de confirmação e cancelamento não serão exibidos.
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
  confirmeHandler = null,
  textBtnConfirme = 'OK',
  titleBtnConfirme = 'Confirmar',
  cancelHandler = closeModal,
  textBtnCancel = 'Cancelar',
  titleBtnCancel = 'Fechar',
) => {
  const modal = getComponent('dialog')
  const form = getComponent('form')

  if (confirmeHandler) {
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
    
    // const form = getComponent('form', confirmeModalButton, cancelModalButton);
    form.props.children.push(confirmeModalButton, cancelModalButton);
    if (form.props) form.props.method = 'dialog';
    // modal.props.children.push(form);
  }
  
  const closeButton = createButton('', closeModal, close, 'close', 'Fechar', false, ButtonType.TERTIARY, IconSize.NORMAL);
  
  const classForModal =
  className !== '' ? `scrollbar dialog-modal ${className}` : 'scrollbar dialog-modal';

  // const modal = getComponent('dialog', closeButton, content, form);
  modal.props.children.push(closeButton, content);
  if (confirmeHandler !== null) {
    modal.props.children.push(form);
  }
  if (content.props) content.props.class = 'dialog-content';
  modal.props.class = classForModal;

  return modal;
};