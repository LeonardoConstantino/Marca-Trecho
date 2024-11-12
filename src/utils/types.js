/**
 * @typedef {Object} Task - Representa uma tarefa.
 * @property {number} id - O ID da tarefa.
 * @property {string} title - O título da tarefa.
 * @property {string} priority - A prioridade da tarefa.
 * @property {boolean} completed - Indica se a tarefa foi concluída.
 * @property {Date} createdAt - A data de criação da tarefa.
 * @property {Date} completedAt - A data de conclusão da tarefa.
 */

/**
 * @typedef {Object} ElementConfig - Configuração do elemento.
 * @property {string} type - Tipo do elemento (ex: 'div', 'span', 'p', etc.).
 * @property {Object} [props] - Propriedades do elemento.
 * @property {string} [props.nodeValue] - Valor do nó de texto (ex: 'Texto do nó').
 * @property {Array<ElementConfig>} [props.children] - Filhos do elemento.
 * @property {string} [props.id] - ID do elemento.
 * @property {string} [props.class] - Classe CSS do elemento.
 * @property {string} [props.formmethod] - Método do formulário (usado em elementos do tipo 'button' ou 'form').
 */

/**
 * @typedef {ElementConfig & {
 *   props: {
 *     type?: string;
 *     placeholder?: string;
 *     onInput?: Function;
 *     name?: string;
 *   }
 * }} InputElementConfig - Configuração específica para elementos do tipo input.
 */

/**
 * @typedef {ElementConfig & {
 *   props: {
 *     for?: string;
 *     title?: string;
 *   }
 * }} labelInputElementConfig - Configuração específica para elementos do tipo input.
 */

/**
 * Exporta os types para uso em outros arquivos
 * @typedef {object} Types
 * @property {Task} TASKS - Tipos de jogos disponíveis.
 * @property {ElementConfig} ELEMENTCONFIG - Tipos de cores.
 * @property {InputElementConfig} INPUTELEMENTCONFIG
 * @property {labelInputElementConfig} LABELINPUTELEMENTCONFIG
 */
module.exports = Types;
