import {
  getAnchor,
  getComponent,
  getImgComponent,
  getTextComponent,
} from '../utils/helpers';
import { videoManagement } from './home';
import { TagsListWrapper } from './addTags.js';

const thumbnail = getImgComponent(
  'https://dummyimage.com/1000',
  'thumbnail',
  100,
  100
);

const Infos = getComponent(
  'div',
  thumbnail,
  getComponent(
    'div',
    getComponent('h4', getTextComponent('placeholder Titulo do video')),
    getAnchor('fakelink.com', 'Placeholder Link')
  )
);
Infos.props.class = 'excerpts-tagged-infos';

const tags = getComponent('div', Infos, TagsListWrapper);
tags.props.class = 'excerpts-tagged-tags';

const videos = getComponent('div', videoManagement);
videos.props.class = 'excerpts-tagged-videos';

const excerptsTagged = getComponent('div', tags, videos);
excerptsTagged.props.class = 'view excerpts-tagged';

export const createPlaylistView = getComponent('div', tags, videos);
createPlaylistView.props.class = 'create-playlist';
