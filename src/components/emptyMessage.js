import { getComponent, getTextComponent } from '../utils/helpers';

/**
 * Gera uma mensagem de lista vazia para um determinado tipo de lista.
 * @param {string} list - O tipo de lista (por exemplo, "tarefas" ou "contatos").
 * @returns {Object} - Um object elemento representando a mensagem de lista vazia.
 */
export const emptyMessage = (list) => {
  return getComponent(
    'div',
    getComponent(
      'p',
      getTextComponent(
        `Sua lista de ${list} esta vazia, adicione um ${list} para começar.`
      )
    )
  );
};
