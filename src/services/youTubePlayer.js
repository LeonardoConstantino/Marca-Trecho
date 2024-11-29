//@ts-ignore
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

/**
 * Representa uma instância do player do YouTube.
 * Esse player é usado para controlar a reprodução de vídeos do YouTube na aplicação.
 */
let player = null;

/**
 * Representa os possíveis estados do player do YouTube.
 * Esses estados são usados para controlar o comportamento do player durante a reprodução de vídeos.
 */
export const PlayerStates = Object.freeze({
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
});

/**
 * Retorna a origem válida com base no ambiente de execução.
 * @returns {string | null} A origem a ser usada ou null para ignorar.
 */
const getValidOrigin = () => {
  const { hostname, protocol } = window.location;

  // Detecta se está em ambiente de desenvolvimento
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    console.warn(
      'Ambiente de desenvolvimento detectado. Ignorando o parâmetro "origin".'
    );
    return null; // Ignora `origin` para evitar erros em localhost.
  }

  // Retorna a origem completa para produção
  return `${protocol}//${hostname}`;
};

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
    //@ts-ignore
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
export const createPlayer = (elementId, videoId, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!customWindow.YT || !customWindow.YT.Player) {
      reject(new Error('YouTube API is not loaded.'));
      return;
    }

    player = new customWindow.YT.Player(elementId, {
      height: '360',
      width: '640',
      videoId,
      events: {
        //@ts-ignore
        onReady: options.onReady || (() => console.log('Player ready')),
        //@ts-ignore
        onStateChange: options.onStateChange || (() => {}),
      },
      ...options,
    });

    resolve(player);
  });
};
/**
 * Cria dinamicamente uma tag <iframe> para o YouTube Player.
 * @param {string} videoId - O ID do vídeo do YouTube.
 * @param {Object} options - Opções adicionais para o iframe.
 * @param {string} [options.width="640"] - Largura do player.
 * @param {string} [options.height="360"] - Altura do player.
 * @param {string} [options.containerId="player-container"] - ID do elemento que conterá o iframe.
 * @returns {HTMLIFrameElement} O elemento <iframe> criado.
 */
export const createYouTubeIframe = (videoId, options) => {
  if (!videoId) throw new Error('O videoId é obrigatório para criar o iframe.');

  const {
    width = '640',
    height = '360',
    containerId = 'player-container',
  } = options;

  // Obtém a origem válida ou omite o parâmetro
  const origin = getValidOrigin();

  // URL do vídeo com os parâmetros necessários
  const src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1${
    origin ? `&origin=${encodeURIComponent(origin)}` : ''
  }`;

  // Criação do iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'player';
  iframe.width = width;
  iframe.height = height;
  iframe.src = src;
  iframe.allow = 'autoplay; encrypted-media';

  // Adiciona o iframe ao container
  const container = document.getElementById(containerId);
  if (!container)
    throw new Error(`O container com ID "${containerId}" não foi encontrado.`);
  //container.innerHTML = ''; // Limpa o container antes de adicionar o iframe
  container.appendChild(iframe);

  return iframe;
};

/**
 * Configura e retorna uma instância do player de vídeo do YouTube.
 * @async
 * @param {string} videoId - O ID do vídeo do YouTube a ser reproduzido.
 * @param {Object} options - Opções adicionais para o player.
 * @param {function} [options.onReady] - Função de callback chamada quando o player estiver pronto.
 * @param {function} [options.onStateChange] - Função de callback chamada quando o estado do player mudar.
 * @returns {Promise<YT.Player>} Uma promessa que resolve para a instância do player do YouTube.
 */
export const setupIframePlayer = async (videoId, options) => {
  const iframe = createYouTubeIframe(videoId, options);

  // Aguarde o carregamento da API do YouTube
  await loadYouTubeAPI();

  return new Promise((resolve, reject) => {
    if (!customWindow.YT || !customWindow.YT.Player) {
      reject(new Error('YouTube API is not loaded.'));
      return;
    }

    player = new customWindow.YT.Player(iframe.id, {
      events: {
        onReady: options.onReady || (() => console.log('Player pronto!')),
        onStateChange: options.onStateChange || (() => {}),
      },
    });

    resolve(player);
  });
};

/**
 * Obtém a instância atual do player.
 * @returns {YT.Player | null} A instância do player.
 */
export const getPlayer = () => player;

/**
 * Destrói a instância atual do player de vídeo do YouTube.
 * Essa função é útil para limpar o estado do player e liberar recursos quando o player não for mais necessário.
 */
export const playerDestroy = () => {
  if (player) {
    player.destroy();
    player = null;
  }
};
