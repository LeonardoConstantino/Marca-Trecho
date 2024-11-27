import { getComponent, getTextSpan, secondsToTime } from '../utils/helpers';
import { ButtonType, createButton } from './button';
import { adjustTime } from '../handlers/adjustTime';
//@ts-ignore
import arrowLeft from '../assets/images/arrowLeft.svg';
//@ts-ignore
import doubleArrowLeft from '../assets/images/doubleArrowLeft.svg';

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
  defaultValue = 0,
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
