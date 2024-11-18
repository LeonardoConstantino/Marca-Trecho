import {
  getComponent,
  getTextSpan,
  secondsToTime,
  timeToSeconds,
} from '../utils/helpers';
import { ButtonType, createButton } from './button';
//@ts-ignore
import arrowLeft from '../assets/images/arrowLeft.svg';
//@ts-ignore
import doubleArrowLeft from '../assets/images/doubleArrowLeft.svg';

/**
 * Ajusta o valor de tempo em um campo de entrada baseado em um incremento/decremento em segundos.
 * @param {Event} e - O evento de clique.
 * @param {number} adjustment - O valor a ser ajustado (positivo para aumentar, negativo para diminuir).
 */
const adjustTime = (e, adjustment) => {
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

/**
 * Diminui o tempo em 5 segundos.
 * @param {Event} e - O evento que acionou a função.
 */
const decreasesFiveSeconds = (e) => adjustTime(e, -5);
/**
 * Diminui o tempo em 10 segundos.
 * @param {Event} e - O evento que acionou a função.
 */
const decreasesTenSeconds = (e) => adjustTime(e, -10);
/**
 * Aumenta o tempo em 5 segundos.
 * @param {Event} e - O evento que acionou a função.
 */
const increasesFiveSeconds = (e) => adjustTime(e, 5);
/**
 * Aumenta o tempo em 10 segundos.
 * @param {Event} e - O evento que acionou a função.
 */
const increasesTenSeconds = (e) => adjustTime(e, 10);

/**
 * Cria um componente de seletor de tempo.
 * @param {string} text - O texto do rótulo do seletor de tempo.
 * @param {string} id - O ID único do seletor de tempo.
 * @param {string} [className=''] - A classe CSS aplicada ao seletor de tempo.
 * @param {number} [min=0] - O valor mínimo do seletor de tempo em segundos.
 * @param {number} [max=120] - O valor máximo do seletor de tempo em segundos.
 * @param {number} [defaultValue=60] - O valor padrão do seletor de tempo.
 * @param {number} [step=1] - O incremento do seletor de tempo em segundos.
 * @param {function | null} [onchange=null] - A função de callback chamada quando o valor do seletor de tempo é alterado.
 * @returns {Object} - O componente de seletor de tempo.
 */
export const getTimeSelector = (
  text,
  id,
  className = '',
  min = 0,
  max = 120,
  defaultValue = 60,
  step = 1,
  onchange = null
) => {
  const input = getComponent('input');
  input.props.type = 'time';
  input.props.class = 'form-control';
  input.props.id = id;
  input.props.min = secondsToTime(min);
  input.props.max = secondsToTime(max);
  input.props.step = step;
  input.props.value = secondsToTime(defaultValue);
  if (onchange) input.props.onchange = onchange;

  const label = getComponent('label', getTextSpan(text), input);
  label.props.class = 'form-label';
  label.props.for = id;

  const wrapperActions = getComponent(
    'div',
    createButton(
      '',
      decreasesTenSeconds,
      doubleArrowLeft,
      'decreases',
      'Diminuir 10 segundos',
      false,
      ButtonType.TERTIARY
    ),
    createButton(
      '',
      decreasesFiveSeconds,
      arrowLeft,
      'decreases',
      'Diminuir 5 segundos',
      false,
      ButtonType.TERTIARY
    ),
    createButton(
      '',
      increasesFiveSeconds,
      arrowLeft,
      'increases',
      'Aumentar 5 segundos',
      false,
      ButtonType.TERTIARY
    ),
    createButton(
      '',
      increasesTenSeconds,
      doubleArrowLeft,
      'increases',
      'Aumentar 10 segundos',
      false,
      ButtonType.TERTIARY
    )
  );
  wrapperActions.props.class = 'actions';
  wrapperActions.props['data-id'] = id;

  const wrapper = getComponent('div', label, wrapperActions);
  wrapper.props.class = `time-selector ${className}`;

  return wrapper;
};
