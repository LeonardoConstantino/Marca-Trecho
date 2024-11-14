import { getComponent, getImgComponent, getTextComponent } from '../utils/helpers';
import { navigation } from './navigation';
// @ts-ignore
import imageLogo from '../assets/images/logo.png';
// @ts-ignore
import questionMark from '../assets/images/questionMark.svg';
// @ts-ignore
import share from '../assets/images/share.svg';
// @ts-ignore
import settings from '../assets/images/settings.svg';
import { ButtonType, createButton, IconSize } from '../components/button';
import { showModal } from '../handlers/showModal';
import { showSnackbar } from '../utils/showSnackbar';
import { closeModal } from '../components/modal';
import { getInputRadio } from './../components/inputRadio';
import { toggleTheme } from '../handlers/toggleTheme';

const helpButton = createButton(
  '',
  () => {
    showModal(getComponent('div', getTextComponent('Em breve...')), '', (e) => {
      showSnackbar('Teste teste 123 teste');
      closeModal(e);
    });
  },
  questionMark,
  '',
  '',
  false,
  ButtonType.TERTIARY,
  IconSize.SMALL,
);

const shareButton = createButton(
  '',
  () => {
    showModal(
      getComponent('div', getTextComponent('Em breve...')),
      '',
      (e) => {
        showSnackbar('Teste teste 123 teste');
        closeModal(e);
      },
      'Compartilhar'
    );
  },
  share,
  '',
  '',
  false,
  ButtonType.TERTIARY,
  IconSize.SMALL,
);

const contentModalSettings = getComponent(
  'div',
  getComponent('h3', getTextComponent('Configurações')),
  getComponent(
    'fieldset',
    getComponent('legend', getTextComponent('Tema')),
    getInputRadio('theme', 'light', 'Light', true, '', '', null),
    getInputRadio('theme', 'dark', 'Dark', false, '', '', null)
  )
);

const settingsButton = createButton(
  '',
  () => {
    showModal(contentModalSettings, 'modal-settings', toggleTheme);
  },
  settings,
  '',
  '',
  false,
  ButtonType.TERTIARY,
  IconSize.SMALL,
);

const headerActions = getComponent(
  'div',
  helpButton,
  shareButton,
  settingsButton
);
headerActions.props.class = 'header-actions'; // Define a classe CSS para estilização

// Cria o componente de imagem para o logotipo
const img = getImgComponent(imageLogo, 'Logo', '40', '40');
// Cria o componente de título
const title = getComponent('h1', getTextComponent('Marca Trecho'));

// Cria o componente de logotipo contendo a imagem
const logo = getComponent('div', img, title);
logo.props.class = 'header-title'; // Define a classe CSS para estilização

const wrapperActions = getComponent('div', navigation, headerActions);
wrapperActions.props.class = 'wrapper-actions';

// Exporta o componente de cabeçalho
export const header = getComponent('header', logo, wrapperActions);
