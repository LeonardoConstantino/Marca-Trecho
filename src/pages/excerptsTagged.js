import {
  getAnchor,
  getComponent,
  getImgComponent,
  getTextComponent,
} from '../utils/helpers';
import { videoManagement } from './home';
import { TagsListWrapper } from './addTags.js';
import { ButtonType, createButton, IconSize } from '../components/button.js';
import { playWithComments } from './../handlers/playWithComments';
//@ts-ignore
import imgPlaceholder from '../assets/images/imgPlaceholder.svg';
//@ts-ignore
import playBookSvg from '../assets/images/playBook.svg';

const thumbnail = getImgComponent(
  imgPlaceholder,
  'Image Placeholder',
  100,
  100
);

const Infos = getComponent(
  'div',
  thumbnail,
  getComponent(
    'div',
    getComponent('h4', getTextComponent('Nada por aqui')),
    getAnchor('', 'N/A')
  )
);
Infos.props.class = 'excerpts-tagged-infos';

const playVideoButton = createButton(
  'Assistir',
  playWithComments,
  playBookSvg,
  'button-shine play-book hidden',
  '',
  false,
  ButtonType.PRIMARY,
  IconSize.LARGE
);

const tags = getComponent('div', Infos, playVideoButton, TagsListWrapper);
tags.props.class = 'excerpts-tagged-tags';

const videos = getComponent('div', videoManagement);
videos.props.class = 'excerpts-tagged-videos';

export const excerptsTagged = getComponent('div', tags, videos);
excerptsTagged.props.class = 'view excerpts-tagged';
