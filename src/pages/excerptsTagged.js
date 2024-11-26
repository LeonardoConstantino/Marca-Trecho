import {
  getAnchor,
  getComponent,
  getImgComponent,
  getTextComponent,
} from '../utils/helpers';
import { videoManagement } from './home';
import { TagsListWrapper } from './addTags.js';
//@ts-ignore
import imgPlaceholder from '../assets/images/imgPlaceholder.svg';

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
    getAnchor('', 'N/A'),
  )
);
Infos.props.class = 'excerpts-tagged-infos';

const tags = getComponent('div', Infos, TagsListWrapper);
tags.props.class = 'excerpts-tagged-tags';

const videos = getComponent('div', videoManagement);
videos.props.class = 'excerpts-tagged-videos';

export const excerptsTagged = getComponent('div', tags, videos);
excerptsTagged.props.class = 'view excerpts-tagged';
