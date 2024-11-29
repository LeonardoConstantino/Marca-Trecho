// src/pages/home.js
import { ButtonType, createButton, IconSize } from '../components/button';
import {
  addChildrenToView,
  getComponent,
  getTextComponent,
} from '../utils/helpers';
import { showModal } from './../handlers/showModal';
//@ts-ignore
import play from '../assets/images/play.svg';
import { getVideoList } from '../services/storageHandle';
import { addVideoHandler } from '../handlers/addVideo';
import { getVideoCard } from '../components/videoCard';
import { emptyMessage } from './../components/emptyMessage';

const playerContainer = getComponent('div');
playerContainer.props.id = 'player';
playerContainer.props.class = 'hidden';

const inputAddVideo = getComponent('input');
inputAddVideo.props.type = 'text';
inputAddVideo.props.placeholder = 'Adicionar Vídeo';
inputAddVideo.props.id = 'input-add-video';
inputAddVideo.props.required = '';

const labelInputAddVideo = getComponent('label', inputAddVideo);
labelInputAddVideo.props.for = 'input-add-video';
labelInputAddVideo.props.class = 'home-label-input-add-video';

const wrapperInputAddVideo = getComponent(
  'div',
  labelInputAddVideo,
  createButton(
    'Adicionar Vídeo',
    addVideoHandler,
    play,
    'button-shine',
    'Adicionar Vídeo',
    false,
    ButtonType.PRIMARY,
    IconSize.LARGE
  )
);
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
  getComponent('label', positiveMessage, negativeMessage)
);
wrapperInputAddVideoMessage.props.class =
  'home-wrapper-input-add-video-message';

export const addVideoContent = getComponent(
  'div',
  getComponent('h2', getTextComponent('Adicionar Vídeo')),
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

export const getAddedVideos = ()=>{
  const currentVideoList = getVideoList()
  
  const videosCards = currentVideoList.map((video) => {
    return getVideoCard(video);
  });
  
  const videosList = getComponent('ol', ...videosCards);
  videosList.props.class = 'videos-list';
  
  const addedVideos = getComponent('div');
  addedVideos.props.class = 'home-added-videos';
  addedVideos.props['data-videosCardsContainer'] = '';
  
  addChildrenToView(
    addedVideos,
    currentVideoList.length === 0,
    [
      getComponent('h4', getTextComponent('Gerencie seus vídeos')),
      emptyMessage('vídeos'),
    ],
    [getComponent('h4', getTextComponent('Gerencie seus vídeos')), videosList]
  );

  return addedVideos
}

const playlists = getComponent(
  'div',
  getComponent('h4', getTextComponent('Gerencie suas playlists')),
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

export const videoManagement = getComponent('div', getAddedVideos(), playlists);
videoManagement.props.class = 'home-video-management';

export const homeView = getComponent('div');
homeView.props.class = 'view home';

addChildrenToView(
  homeView,
  getVideoList().length === 0,
  [introduction, videoManagement],
  [addVideoContent, videoManagement]
);
homeView.props.children.push(playerContainer);
