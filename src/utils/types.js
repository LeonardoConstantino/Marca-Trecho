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
 * @typedef { Object } Tag
 * @property { string } id - ID único para marcação
 * @property { number } start - Início do trecho em segundos
 * @property { number } end - Fim do trecho em segundos
 * @property { string } comment - Comentário do usuário
 * @property { string } priority - Nível de importância: "verde", "amarelo" ou "vermelho"
 */

/**
 * @typedef { Object } ObjectVideo
 * @property { string } id - ID único para vídeo
 * @property { string } videoId - ID do vídeo extraído do link (YouTube ID)
 * @property { URL } url - URL do vídeo
 * @property { string } title - Título do vídeo
 * @property { string } thumbnailUrl - URL da imagem de thumbnail do vídeo
 * @property { number } duration - Duração do vídeo
 * @property { Array<Tag> } tags - Array de marcações feitas pelo usuário no vídeo
 */

/**
 * Exporta os types para uso em outros arquivos
 * @typedef {object} Types
 * @property {Task} TASKS - Tipos de jogos disponíveis.
 * @property {ElementConfig} ELEMENTCONFIG - Tipos de cores.
 * @property {InputElementConfig} INPUTELEMENTCONFIG
 * @property {labelInputElementConfig} LABELINPUTELEMENTCONFIG
 * @property {Tag} TAG
 * @property {ObjectVideo} OBJECTVIDEO
 */
module.exports = Types;
