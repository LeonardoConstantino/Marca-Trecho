/**
 * @import { ElementConfig } from './types.js'
 */

/**
 * EventDelegator fornece um sistema de gerenciamento centralizado para manipulação de eventos
 * em elementos criados dinamicamente. Ele utiliza delegação de eventos para reduzir o uso de memória
 * e melhorar o desempenho, especialmente em aplicações com um grande número de ouvintes de eventos.
 */
export const EventDelegator = {
  /**
   * Armazena os manipuladores de eventos associados a cada ID de manipulador.
   * @type {Map<string, Object>}
   */
  eventHandlers: new Map(),

  /**
   * Armazena os containers que foram inicializados para delegação de eventos,
   * a fim de evitar a adição de ouvintes de eventos duplicados.
   * @type {Set<HTMLElement>}
   */
  initializedContainers: new Set(),

  /**
   * Um contador para gerar IDs únicos para manipuladores.
   * @type {number}
   */
  handlerId: 0,

  /**
   * Inicializa a delegação de eventos em um elemento container especificado.
   * Se nenhum container for especificado, o container padrão será o corpo do documento.
   *
   * @param {HTMLElement} [container=document.body] - O elemento container onde a delegação de eventos será iniciada.
   */

  init(container = document.body) {
    // Se o container já foi inicializado, sair da função para evitar reinicialização.
    if (this.initializedContainers.has(container)) return;

    // Lista dos tipos de eventos que serão delegados.
    const delegatedEvents = [
      'click',
      'submit',
      'change',
      'input',
      'keyup',
      'keydown',
      'mouseenter',
      'mouseleave',
      'focus',
      'blur',
    ];

    // Adiciona um ouvinte de evento único para cada tipo de evento no container.
    delegatedEvents.forEach((eventType) => {
      container.addEventListener(
        eventType,
        (event) => {
          let target = event.target;

          if (!target) return;

          // Sobe na árvore DOM a partir do alvo até o container.
          while (target && target !== container) {
            // Verifica se target é um HTMLElement antes de acessar dataset e parentElement.
            if (target instanceof HTMLElement) {
              // Obtém o ID do manipulador no alvo, se existir.
              const handlerId = target.dataset.handlerId;
              if (handlerId) {
                // Recupera os manipuladores de eventos associados a esse ID.
                const handlers = this.eventHandlers.get(handlerId);
                if (handlers && handlers[eventType]) {
                  // Chama o manipulador para o tipo de evento, se existir.
                  handlers[eventType](event);
                  // Interrompe a propagação com stopPropagation.
                  event.stopPropagation(); // Interrompe a propagação
                  break;
                }
              }
              target = target.parentElement;
            } else {
              // Se o target não é um HTMLElement, interrompe a busca.
              break;
            }
          }
        },
        // Usa a opção passive para eventos de scroll e touchmove para melhorar o desempenho.
        { passive: ['scroll', 'touchmove'].includes(eventType) }
      );
    });

    // Marca o container como inicializado.
    this.initializedContainers.add(container);
  },

  /**
   * Registra manipuladores de eventos para um elemento específico. Isso permite a delegação de
   * múltiplos eventos usando um ID único armazenado no dataset do elemento.
   *
   * @param {HTMLElement} element - O elemento para o qual os manipuladores de eventos serão registrados.
   * @param {Object} listeners - Um objeto contendo ouvintes de eventos, onde as chaves são os nomes dos eventos
   * (por exemplo, 'onClick') e os valores são as funções de manipulação correspondentes.
   * @returns {string} O ID único do manipulador atribuído ao elemento.
   */
  registerEventHandlers(element, listeners) {
    // Gera um ID único para o manipulador.
    const handlerId = `h${++this.handlerId}`;
    // Converte o objeto de listeners para mapear tipos de eventos específicos aos seus manipuladores.
    const handlers = {};
    Object.entries(listeners).forEach(([eventName, handler]) => {
      // Remove o prefixo 'on' e converte o nome do evento para minúsculas.

      const eventType = eventName.replace(/^on/i, '').toLowerCase();
      handlers[eventType] = handler;
    });
    // Armazena os manipuladores no mapa eventHandlers sob o ID gerado.
    this.eventHandlers.set(handlerId, handlers);
    // Associa o ID do manipulador ao dataset do elemento.
    element.dataset.handlerId = handlerId;
    return handlerId;
  },

  /**
   * Remove manipuladores de eventos associados a um ID específico de handler do mapa eventHandlers.
   *
   * @param {string} handlerId - O ID único do elemento cujos manipuladores devem ser removidos.
   */
  removeEventHandlers(handlerId) {
    this.eventHandlers.delete(handlerId);
  },

  /**
   * Limpa os manipuladores de eventos e remove o ID de manipulador do elemento especificado e de todos os seus filhos.
   *
   * @param {HTMLElement} element - O elemento do qual os manipuladores de eventos devem ser removidos.
   */
  cleanup(element) {
    // Obtém o ID do manipulador do dataset do elemento.
    const handlerId = element.dataset.handlerId;
    if (handlerId) {
      // Remove os manipuladores de eventos associados.
      this.removeEventHandlers(handlerId);
      // Remove o ID do manipulador do dataset do elemento.
      delete element.dataset.handlerId;
      // Reduz o contador de IDs de manipuladores.
      --this.handlerId
    }

    // Remove de forma recursiva os IDs de manipuladores e manipuladores de eventos de todos os elementos filhos.
    element.querySelectorAll('[data-handler-id]').forEach((child) => {
      const childElement = /** @type {HTMLElement} */ (child);
      const childHandlerId = childElement.dataset.handlerId;
      if (childHandlerId) {
        this.removeEventHandlers(childHandlerId);
        delete childElement.dataset.handlerId;
        --this.handlerId
      }
    });
  },
};

/**
 * Renderiza um elemento HTML com delegação de eventos
 * @param {ElementConfig} elementConfig - Configuração do elemento
 * @param {boolean} isAppend - Se deve anexar ao container
 * @param {HTMLElement} container - Container para renderização
 * @returns {HTMLElement|Text} Elemento renderizado
 */
export const renderElement = (
  { type, props = {} },
  isAppend = false,
  container = document.body
) => {
  try {
    // Inicializa o delegador de eventos se ainda não foi feito
    EventDelegator.init(document.body);

    // Validação do tipo de elemento
    if (type !== null && type !== undefined && typeof type !== 'string') {
      throw new Error(`Invalid element type: ${type}`);
    }

    // Cria o elemento ou nó de texto
    const element = !type
      ? document.createTextNode(props.nodeValue || '')
      : /** @type {HTMLElement} */ document.createElement(type);

    if (type) {
      // Separa listeners de outros props
      const listeners = {};
      const attributes = {};

      Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
          listeners[key] = value;
        } else if (!['children', 'nodeValue'].includes(key)) {
          attributes[key] = value;
        }
      });

      if (element instanceof HTMLElement) {
        // Registra event handlers se houver
        if (Object.keys(listeners).length > 0) {
          EventDelegator.registerEventHandlers(element, listeners);
        }

        // Aplica atributos
        Object.entries(attributes).forEach(([key, value]) => {
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new Error(`Invalid attribute value for ${key}: ${value}`);
          }
          const parsedValue = typeof value === 'number' ? String(value) : value
          element.setAttribute(key, parsedValue);
        });
      }

      // Processa filhos usando DocumentFragment para melhor performance
      const fragment = document.createDocumentFragment();
      const children = Array.isArray(props.children) ? props.children : [];

      children.forEach((child) => {
        const childElement = renderElement(child, false, container);
        if (childElement) fragment.appendChild(childElement);
      });

      element.appendChild(fragment);
    }

    return isAppend ? container.appendChild(element) : element;
  } catch (error) {
    console.error('Error rendering element:', error);
    throw error;
  }
};
