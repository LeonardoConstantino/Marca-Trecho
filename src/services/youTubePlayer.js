/**
 * @namespace YT
 */

/**
 * Representa um player do YouTube.
 * @typedef {Object} YT.Player
 * @property {function(): void} playVideo - Reproduz o vídeo.
 * @property {function(): void} pauseVideo - Pausa o vídeo.
 * @property {function(): void} stopVideo - Para o vídeo.
 * @property {function(): string} getVideoUrl - Obtém a URL do vídeo atual.
 * @property {function(): string} getVideoEmbedCode - Obtém o código embed do vídeo.
 * @property {function(): number} getPlayerState - Retorna o estado atual do player.
 */

/**
 * Representa as opções do player do YouTube.
 * @typedef {Object} YT.PlayerOptions
 * @property {string} videoId - O ID do vídeo do YouTube.
 * @property {string} [height] - Altura do player.
 * @property {string} [width] - Largura do player.
 * @property {Object} events - Eventos associados ao player.
 * @property {function(): void} [events.onReady] - Callback chamado quando o player estiver pronto.
 * @property {function(Object): void} [events.onStateChange] - Callback chamado quando o estado do player mudar.
 */

/**
 * Extende o objeto global `window` para incluir a propriedade `YT`.
 * @typedef {Window & { YT?: { Player: typeof window.YT.Player } }} WindowWithYouTube
 */

/** @type {WindowWithYouTube} */
const customWindow = window;

let player = null;

/**
 * Carrega dinamicamente a API do YouTube IFrame.
 * @returns {Promise<void>}
 */
export const loadYouTubeAPI = () =>
  new Promise((resolve, reject) => {
    if (customWindow.YT && customWindow.YT.Player) {
      resolve(); // API já carregada
      return;
    }

    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://www.youtube.com/iframe_api';
    scriptTag.async = true;
    document.body.appendChild(scriptTag);

    // Define a função global esperada pela API.
    customWindow.onYouTubeIframeAPIReady = () => {
      if (customWindow.YT && customWindow.YT.Player) {
        resolve();
      } else {
        reject(new Error('YouTube API failed to load.'));
      }
    };
  });

/**
 * Inicializa o player do YouTube.
 * @param {string} elementId - ID do elemento onde o player será renderizado.
 * @param {string} videoId - ID do vídeo do YouTube.
 * @param {Partial<YT.PlayerOptions>} [options] - Opções adicionais para o player.
 * @returns {Promise<YT.Player>}
 */
export const createPlayer = (elementId, videoId, options = {}) =>
  new Promise((resolve, reject) => {
    if (!customWindow.YT || !customWindow.YT.Player) {
      reject(new Error('YouTube API is not loaded.'));
      return;
    }

    const onReady = options.events?.onReady || (() => console.log('Player ready'));

    player = new customWindow.YT.Player(elementId, {
      height: '360',
      width: '640',
      videoId,
      events: {
        onReady: options.onReady || (() => console.log('Player ready')),
        onStateChange: options.onStateChange || (() => {}),
      },
      ...options,
    });

    resolve(player);
  });

/**
 * Obtém a instância atual do player.
 * @returns {YT.Player | null} A instância do player.
 */
export const getPlayer = () => player;
