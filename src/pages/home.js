// src/pages/home.js

import { ButtonType, createButton, IconSize } from '../components/button';
import { addChildrenToView, getComponent, getTextComponent } from '../utils/helpers';
import { showModal } from './../handlers/showModal';
//@ts-ignore
import play from '../assets/images/play.svg';
//@ts-ignore
// import arrow from '../assets/images/arrow.svg';
import { getVideoList } from '../services/storageHandle';

const videoList = getVideoList()

const inputAddVideo = getComponent('input')
inputAddVideo.props.type = 'text';
inputAddVideo.props.placeholder = 'Adicionar Vídeo';
inputAddVideo.props.id = 'input-add-video';

const labelInputAddVideo = getComponent('label', inputAddVideo )
labelInputAddVideo.props.for = 'input-add-video';
labelInputAddVideo.props.class = 'home-label-input-add-video';

const wrapperInputAddVideo = getComponent(
  'div',
  labelInputAddVideo,
  createButton(
    'Adicionar Vídeo',
    () => console.log('Adicionar Vídeo'),
    play,
    'button-shine',
    'Adicionar Vídeo',
    false,
    ButtonType.PRIMARY,
    IconSize.LARGE
  )
)
wrapperInputAddVideo.props.class = 'home-wrapper-input-add-video';

const positiveMessage = getComponent(
    'p',
    getTextComponent('Vídeo adicionado com sucesso!')
  
);
positiveMessage.props.class = 'home-positive-message hidden';
const negativeMessage = getComponent(
  'p',
  getTextComponent('Vídeo não adicionado!')
);
negativeMessage.props.class = 'home-negative-message hidden';

const wrapperInputAddVideoMessage = getComponent(
  'div',
  getComponent('label', positiveMessage, negativeMessage),
);
wrapperInputAddVideoMessage.props.class = 'home-wrapper-input-add-video-message';

export const addVideoContent = getComponent(
  'div',
  wrapperInputAddVideo,
  wrapperInputAddVideoMessage
);
addVideoContent.props.class = 'home-add-video';

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
    () => showModal(addVideoContent, 'home-modal-add-video'),
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

// const videoManagementActions = getComponent(
//   'div',
//   createButton(
//     '',
//     () => console.log('abrir/fechar'),
//     arrow,
//     'showHide',
//     'Fechar',
//     false,
//     ButtonType.TERTIARY,
//     IconSize.SMALL
//   )
// );
// videoManagementActions.props.class = 'home-video-management-actions';

export const videoManagement = getComponent('div', addedVideos, playlists);
videoManagement.props.class = 'home-video-management';

export const homeView = getComponent('div');
homeView.props.class = 'view home';

addChildrenToView(
  homeView,
  videoList.length !== 0,
  [addVideoContent, videoManagement],
  [introduction, videoManagement]
);