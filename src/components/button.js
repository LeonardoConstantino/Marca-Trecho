/**
 * @import { ElementConfig } from '../utils/types'
 */
import { getComponent, getTextSpan } from '../utils/helpers';

/**
 * Representa os diferentes tipos de botões disponíveis na aplicação.
 *
 * @typedef {'primary' | 'secondary' | 'tertiary'} BUTTONTYPE
 * @property {String} PRIMARY - O tipo de botão primário.
 * @property {String} SECONDARY - O tipo de botão secundário.
 * @property {String} TERTIARY - O tipo de botão terciário.
 * @readonly
 */
export const ButtonType = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
});
const defaultButtonType = ButtonType.PRIMARY;

/**
 * Representa os diferentes tamanhos de ícones disponíveis na aplicação.
 *
 * @typedef {'small' | 'normal' | 'large'} ICONSIZE
 * @property {'small'} SMALL - O tamanho de ícone pequeno.
 * @property {'normal'} NORMAL - O tamanho de ícone normal.
 * @property {'large'} LARGE - O tamanho de ícone grande.
 * @readonly
 */
export const IconSize = Object.freeze({
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large',
});
const defaultIconSize = IconSize.NORMAL;
/**
 * Cria uma representação de um botão com texto, ícone, evento de clique, classe CSS e título.
 *
 * @param {string} text - O texto a ser exibido no botão.
 * @param {Function} [onClick] - A função a ser chamada quando o botão for clicado.
 * @param {string} [iconUrl] - O URL do ícone a ser exibido no botão.
 * @param {string} [className=''] - Classes CSS adicionais a serem aplicadas ao botão.
 * @param {string} [title=''] - O título (tooltip) do botão.
 * @param {Boolean} [disabled=false] - Indica se o botão está desabilitado.
 * @param {BUTTONTYPE} [tipo=defaultButtonType] - O tipo de botão.
 * @param {...ICONSIZE} [iconSize=defaultIconSize] - O tamanho do ícone.
 * @returns {ElementConfig} Uma representação do botão como um objeto.
 *
 * @example
 * const button = createButton('Click Me', () => alert('Button Clicked'), 'icon.png', 'btn-class', 'Tooltip text');
 * console.log(button);
 * // Exemplo de saída:
 * // {
 * //   type: 'button',
 * //   props: {
 * //     title: 'Tooltip text',
 * //     children: [
 * //       { type: 'span', props: { children: ['Click Me'] } },
 * //       { type: 'i', props: { style: 'background-image: url(icon.png)' } }
 * //     ],
 * //     onClick: [Function],
 * //     class: 'btn-class'
 * //   }
 * // }
 */
export const createButton = (
  text,
  onClick,
  iconUrl,
  className = '',
  title = '',
  disabled = false,
  tipo = defaultButtonType,
  iconSize = defaultIconSize
) => {
  // Cria a representação do ícone.
  const icon = getComponent('i');
  icon.props.style = `background-image: url("${iconUrl}")`;
  if (iconSize !== IconSize.NORMAL) icon.props.class = iconSize;

  // Cria a representação do botão com um span filho contendo o texto.
  const button = getComponent('button');
  button.props['aria-label'] = text;
  if (text !== '') button.props.children.push(getTextSpan(text));

  // Adiciona o evento onClick se for fornecido.
  if (onClick) button.props['onClick'] = onClick;

  // Adiciona o ícone como filho se a URL do ícone for fornecida.
  if (iconUrl) button.props.children.push(icon);

  // Adiciona classes CSS adicionais se fornecidas.
  const classButton = [tipo !== 'primary' ? `button-${tipo}` : '', className]
    .filter(Boolean)
    .join(' ');

  if (classButton) button.props.class = classButton;

  // Adiciona o título (tooltip) do botão.
  if (title) button.props.title = title;

  // Adiciona o atributo disabled se o botão estiver desabilitado.
  if (disabled) button.props.disabled = '';

  // Retorna a representação do botão.
  return button;
};
