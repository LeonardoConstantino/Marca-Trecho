// src/pages/home.js

import { ButtonType, createButton, IconSize } from '../components/button';
import { getComponent, getTextComponent } from '../utils/helpers';
//@ts-ignore
import play from '../assets/images/play.svg';
//@ts-ignore
import arrow from '../assets/images/arrow.svg';


const introduction = getComponent(
  'div',
  getComponent(
    'h2',
    getTextComponent('Organize Trechos de Vídeos Importantes')
  ),
  getComponent(
    'h4',
    getTextComponent(
      'Marque trechos de vídeos diretamente no navegador. você pode criar e organizar marcações de partes importantes de vídeos do YouTube.'
    )
  ),
  getComponent(
    'small',
    getTextComponent('No futuro, de outros sites de vídeo.')
  ),
  createButton(
    'Adicionar Meu Primeiro Vídeo',
    () => console.log('Adicionar Meu Primeiro Vídeo'),
    play,
    'button-shine',
    'Adicionar meu primeiro video',
    false,
    ButtonType.PRIMARY,
    IconSize.LARGE
  )
);
introduction.props.class = 'home-introduction';

const addedVideos = getComponent(
  'div',
  getComponent('h5', getTextComponent('Gerencie seus vídeos')),
  getComponent(
    'div',
    getComponent(
      'p',
      getTextComponent(
        'Sua lista de vídeos esta vazia, adicione um vídeo para começar.'
      )
    )
  )
);
addedVideos.props.class = 'home-added-videos';

const playlists = getComponent(
  'div',
  getComponent('h5', getTextComponent('Gerencie suas playlists')),
  getComponent(
    'div',
    getComponent(
      'p',
      getTextComponent(
        'Sua lista de playlists esta vazia, adicione uma playlist para começar.'
      )
    )
  )
);
playlists.props.class = 'home-playlists';

const videoManagementActions = getComponent('div', createButton('', () => console.log('abrir/fechar'), arrow, 'showHide', 'Fechar', false, ButtonType.TERTIARY, IconSize.SMALL));
videoManagementActions.props.class = 'home-video-management-actions';

const videoManagement = getComponent('div', videoManagementActions, addedVideos, playlists);
videoManagement.props.class = 'home-video-management';

export const homeView = getComponent('div', introduction, videoManagement);
homeView.props.class = 'view home';
