import { currentLanguage } from '../services/storageHandle';

/**
 * Cria um componente genérico com filhos.
 * @param {string} type - O tipo do elemento a ser criado.
 * @param {...Object} children - Os componentes filhos a serem incluídos no elemento.
 * @returns {Object} As configurações para criar um componente genérico.
 */
export const getComponent = (type, ...children) => {
  return {
    type: type,
    props: {
      children: [...children],
    },
  };
};

/**
 * Cria um componente de texto.
 * @param {string} text - O texto a ser exibido.
 * @returns {Object} As configurações para criar um componente de texto.
 */
export const getTextComponent = (text) => {
  return {
    type: null,
    props: {
      nodeValue: text,
    },
  };
};

/**
 * Cria um componente de texto.
 * @param {string} text - O texto a ser exibido.
 * @returns {Object} As configurações para criar um componente de texto.
 */
export const getTextSpan = (text) => {
  return getComponent('span', getTextComponent(text));
};

/**
 * Cria um componente de âncora (link) com texto.
 * @param {string} link - O URL do link.
 * @param {string} nome - O texto a ser exibido no link.
 * @returns {Object} As configurações para criar um componente de âncora.
 */
export const getAnchor = (link, nome) => {
  const a = getComponent('a', getTextComponent(nome));
  a.props.href = link;
  a.props.target = '_blank';
  a.props.rel = 'noopener noreferrer';

  return a;
};

/**
 * Cria um componente de ícone com um tamanho específico.
 *
 * @param {string} icon - A URL da imagem do ícone.
 * @param {'small' | 'normal' | 'large'} [size='normal'] - O tamanho do ícone (por exemplo, 'small', 'medium', 'large').
 * @returns {Object} Um objeto representando o componente de ícone.
 */
export const getIconComponent = (icon, size = 'normal') => {
  return {
    type: 'i',
    props: {
      class: `${size === 'normal' ? 'icon' : `icon ${size}`}`,
      style: `background-image: url("${icon}")`,
    },
  };
};

export const getImgComponent = (src, alt, width, height) => {
  const img = getComponent('img');
  img.props.src = src;
  img.props.alt = alt;
  img.props.width = width;
  img.props.height = height;
  return img;
};

/**
 * Adiciona filhos a uma visualização (view) com base em uma condição.
 * @param {Object} view - A visualização (view) para a qual os filhos serão adicionados.
 * @param {boolean} condition - A condição que determina quais filhos serão adicionados.
 * @param {Array<Object>} childrenWhenTrue - Os filhos a serem adicionados se a condição for verdadeira.
 * @param {Array<Object>} childrenWhenFalse - Os filhos a serem adicionados se a condição for falsa.
 * @returns {void}
 */
export const addChildrenToView = (
  view,
  condition,
  childrenWhenTrue,
  childrenWhenFalse
) => {
  const childrenToAdd = condition ? childrenWhenTrue : childrenWhenFalse;
  view.props.children.push(...childrenToAdd);
};

/**
 * Retorna o idioma do navegador ou o idioma atual da aplicação armazenado no armazenamento local.
 * @returns {string} - O código de idioma em minúsculas.
 */
export const getLang = () => {
  const lang = currentLanguage || navigator.language || 'pt-br';
  return lang.toLowerCase();
};

/**
 * Formata uma data para a localidade 'pt-BR'.
 * @param {Date} date - A data a ser formatada.
 * @returns {string} - A data formatada como uma string no formato 'pt-BR'.
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleString(getLang());
};

/**
 * @function calculateLocalStorageSize
 * @description Calcula o tamanho de um item para ser armazenado no localStorage e o formata em bytes, KB ou MB.
 * @param {object | Array<*> | string | number | boolean} item - O item a ser calculado, que será convertido para string e medido.
 * @returns {string} - O tamanho do item formatado como string, em bytes, KB ou MB.
 */
export const calculateLocalStorageSize = (item) => {
  if (item === null || item === undefined) {
    return '0 bytes';
  }
  const localStorageItem = JSON.stringify(item);
  const bytes = new Blob([localStorageItem]).size;

  if (bytes < 1024) {
    return `${bytes.toLocaleString()} bytes`;
  } else if (bytes < 1024 * 1024) {
    const kilobytes = bytes / 1024;
    return `${kilobytes.toFixed(2)} KB`;
  } else {
    const megabytes = bytes / (1024 * 1024);
    return `${megabytes.toFixed(2)} MB`;
  }
};

/**
 * Capitaliza a primeira letra de uma string.
 * @param {string} str - A string a ser capitalizada.
 * @returns {string} - A string com a primeira letra em maiúsculo.
 */
export const capitalizeFirstLetter = (str) => {
  // Verifica se o argumento fornecido é uma string não vazia
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  // Converte a primeira letra para maiúsculo e junta com o restante da string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
