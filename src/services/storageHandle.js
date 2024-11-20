/**
 * @import { ObjectVideo } from '../utils/types.js';
 */
import { APP_PREFIX, FIRST_VIEW } from '../utils/constants.js';
import { storageUtil } from '../utils/storageUtil';

/**
 * Define o prefixo da aplicação para o armazenamento local.
 * Isso ajuda a organizar os dados da aplicação no armazenamento local.
 */
storageUtil.setAppPrefix(APP_PREFIX);

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
export const currentLanguage = storageUtil.getItem(storageKeys.language) || 'pt-BR';

/**
 * Recupera a última view da aplicação armazenada no armazenamento local.
 * Caso não exista nenhuma view armazenada, a view padrão fistView[tutorial ou home] é retornada.
 * @returns {string} - A última view da aplicação armazenada no armazenamento local.
 */
export const getLastView = ()=> storageUtil.getItem(storageKeys.lastView) || FIRST_VIEW;

/**
 * Retorna a lista de videos salvos do local storage
 * 
 * @returns {Array<ObjectVideo>} - A lista de videos salvos do local storage.
 */
export const getVideoList = () => storageUtil.getItem(storageKeys.videoList) || [];

/**
 * salva o objeto video no local storage
 * 
 * @param {ObjectVideo} item - O objeto video a ser salvo.
 * @returns {void}
 */
export const setItemVideoList = (item) => {
    const currentVideoList = getVideoList()
    currentVideoList.push(item)
    storageUtil.setItem(storageKeys.videoList, currentVideoList)
}
export const getTags = () => []
