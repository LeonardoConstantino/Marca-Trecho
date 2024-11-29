import { secondsToTime, timeToSeconds } from '../utils/helpers';

/**
 * Ajusta o valor de tempo em um campo de entrada baseado em um incremento/decremento em segundos.
 * @param {Event} e - O evento de clique.
 * @param {number} adjustment - O valor a ser ajustado (positivo para aumentar, negativo para diminuir).
 */
export const adjustTime = (e, adjustment) => {
  e.preventDefault();

  // Verifica se o evento vem de um elemento HTML
  if (!(e.target instanceof HTMLElement)) return;

  // Localiza o elemento mais próximo com a classe 'actions' e recupera o ID do input
  /** @type {HTMLElement | null} */
  const actionsElement = e.target.closest('.actions');
  if (!actionsElement || !actionsElement.dataset.id) return;

  const allButtonsDecreases = actionsElement.querySelectorAll('.decreases');
  const allButtonsIncreases = actionsElement.querySelectorAll('.increases');

  [...allButtonsDecreases, ...allButtonsIncreases].forEach((button) => {
    button.removeAttribute('disabled');
  });

  const inputId = actionsElement.dataset.id;
  /** @type {HTMLInputElement | null} */
  const input = /** @type {HTMLInputElement | null} */ (
    document.getElementById(inputId)
  );

  // Garante que o elemento existe e possui os atributos 'min' e 'max'
  if (!input || input.min === undefined || input.max === undefined) return;

  // Converte os limites e o valor atual para segundos
  const minSeconds = Number(timeToSeconds(input.min));
  const maxSeconds = Number(timeToSeconds(input.max));

  const newValue = timeToSeconds(input.value) + adjustment;

  if (newValue + adjustment < minSeconds) {
    allButtonsDecreases.forEach((button) => {
      button.setAttribute('disabled', '');
    });
  }

  if (newValue + adjustment > maxSeconds) {
    allButtonsIncreases.forEach((button) => {
      button.setAttribute('disabled', '');
    });
  }

  // Ajusta o valor para permanecer dentro dos limites
  const adjustValue =
    newValue < minSeconds
      ? minSeconds
      : newValue > maxSeconds
      ? maxSeconds
      : newValue;

  // Atualiza o valor do input com o novo tempo
  input.value = secondsToTime(adjustValue);
};
