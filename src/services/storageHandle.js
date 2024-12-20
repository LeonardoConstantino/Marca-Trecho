/**
 * @import { ObjectVideo } from '../utils/types.js';
 * @import { Tag } from '../utils/types.js';
 */
import { APP_PREFIX, FIRST_VIEW } from '../utils/constants.js';
import { storageUtil } from '../utils/storageUtil';

/**
 * Define o prefixo da aplicação para o armazenamento local.
 * Isso ajuda a organizar os dados da aplicação no armazenamento local.
 */
storageUtil.setAppPrefix(APP_PREFIX);

/**
 * Objeto que contém as chaves usadas para armazenar e recuperar dados no armazenamento local da aplicação.
 * Essas chaves ajudam a organizar e identificar os diferentes tipos de dados armazenados.
 * @type {Object}
 * @property {string} theme - A chave usada para armazenar e recuperar o tema atual da aplicação.
 * @property {string} language - A chave usada para armazenar e recuperar o idioma atual da aplicação.
 * @property {string} lastView - A chave usada para armazenar e recuperar a última view da aplicação.
 * @property {string} videoList - A chave usada para armazenar e recuperar a lista de vídeos salvos.
 * @readonly
 */
const storageKeys = Object.freeze({
  theme: 'theme',
  language: 'language',
  lastView: 'lastView',
  videoList: 'videoList',
});

/**
 * Recupera o tema atual da aplicação armazenado no armazenamento local.
 * Caso não exista nenhum tema armazenado, o tema padrão 'light' é retornado.
 * @type {string} - O tema atual da aplicação armazenado no armazenamento local.
 */
export const currentTheme = storageUtil.getItem(storageKeys.theme) || 'light';

/**
 * Recupera o idioma atual da aplicação armazenado no armazenamento local.
 * Caso não exista nenhum idioma armazenado, o idioma padrão 'pt-BR' é retornado.
 * @type {string} - O idioma atual da aplicação armazenado no armazenamento local.
 */
export const currentLanguage =
  storageUtil.getItem(storageKeys.language) || 'pt-BR';

/**
 * Recupera a última view da aplicação armazenada no armazenamento local.
 * Caso não exista nenhuma view armazenada, a view padrão fistView[tutorial ou home] é retornada.
 * @returns {string} - A última view da aplicação armazenada no armazenamento local.
 */
export const getLastView = () =>
  storageUtil.getItem(storageKeys.lastView) || FIRST_VIEW;

/**
 * Retorna a lista de videos salvos do local storage
 *
 * @returns {Array<ObjectVideo>} - A lista de videos salvos do local storage.
 */
export const getVideoList = () =>
  storageUtil.getItem(storageKeys.videoList) || [];

/**
 * Recupera o vídeo da lista de vídeos salva no armazenamento local com o ID especificado.
 *
 * @param {string} id - O ID do vídeo a ser recuperado.
 * @returns {ObjectVideo | undefined} - O objeto de vídeo correspondente ao ID fornecido, ou undefined se o vídeo não for encontrado.
 */
export const getVideoInListById = (id) => {
  if (typeof id !== 'string' || id.trim() === '') {
    console.error('O ID fornecido deve ser uma string válida.');
    return undefined;
  }

  const currentVideoList = getVideoList();

  if (!Array.isArray(currentVideoList)) {
    console.error('A lista de vídeos não é válida.');
    return undefined;
  }

  return currentVideoList.find((v) => v.id === id);
};

/**
 * salva o objeto video no local storage
 *
 * @param {ObjectVideo} item - O objeto video a ser salvo.
 * @returns {void}
 */
export const setItemVideoList = (item) => {
  const currentVideoList = getVideoList();
  currentVideoList.push(item);
  storageUtil.setItem(storageKeys.videoList, currentVideoList);
};

/**
 * Exclui um video do local storage.
 *
 * @param {string} id - O ID do video a ser excluído
 * @returns {void}
 */
export const deleteVideo = (id) => {
  const currentVideoList = getVideoList();
  const deletedVideo = currentVideoList.find((v) => v.id === id);
  const filteredVideos = currentVideoList.filter((v) => v.id !== id);
  storageUtil.setItem(storageKeys.videoList, filteredVideos);
};

/**
 * Obtém as tags associadas a um vídeo pelo seu ID.
 *
 * @param {string} videoId - O ID do vídeo.
 * @returns {Array<Tag>} - Uma lista de tags do vídeo ou um array vazio se o vídeo não for encontrado.
 */
export const getTags = (videoId) => {
  const videoList = getVideoList();
  const video = videoList.find((v) => v.id === videoId);
  if (!video) return [];
  return video.tags;
};

/**
 * Adiciona uma tag à lista de tags de um vídeo específico.
 *
 * @param {string} videoId - O ID do vídeo.
 * @param {Tag} tag - O objeto representando a tag a ser adicionada.
 * @returns {void}
 */
export const setTagInTagList = (videoId, tag) => {
  const videoList = getVideoList();

  // Localiza o vídeo pelo ID
  const video = videoList.find((v) => v.id === videoId);
  if (!video) return;

  // Adiciona a tag e salva a lista atualizada
  video.tags.push(tag);
  storageUtil.setItem(storageKeys.videoList, videoList);
};

/**
 * Remove uma tag específica da lista de tags de um vídeo.
 *
 * @param {string} videoId - O ID do vídeo.
 * @param {string} tagId - O objeto representando a tag a ser removida.
 */
export const deleteTagInTagList = (videoId, tagId) => {
  const videoList = getVideoList();

  // Localiza o vídeo pelo ID
  const video = videoList.find((v) => v.id === videoId);
  if (!video) return;

  // Remove a tag e salva a lista atualizada
  const filtered = video.tags.filter((t) => t.id !== tagId);
  video.tags = filtered;

  storageUtil.setItem(storageKeys.videoList, videoList);
};
