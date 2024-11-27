import {
  getAnchor,
  getComponent,
  getIconComponent,
  getImgComponent,
  getTextComponent,
  getTextSpan,
  secondsToTime,
  timeFormat,
} from '../utils/helpers';
import { ButtonType, createButton, IconSize } from './button';
import { openSide } from '../handlers/excerptsTaggedOpenSide';
import { cancelAction } from '../handlers/deleteOrCancelVideoCard';
import { editVideoTags } from '../handlers/editVideoTags';
//@ts-ignore
import deleteIcon from '../assets/images/delete.svg';
//@ts-ignore
import movieInfosEdit from '../assets/images/movieInfosEdit.svg';
//@ts-ignore
import clock from '../assets/images/clock.svg';
//@ts-ignore
import bookmarksTags from '../assets/images/bookmarksTags.svg';
//@ts-ignore
import externalLink from '../assets/images/externalLink.svg';
//@ts-ignore
import expand from '../assets/images/expandPlayer.svg';

export const getVideoCard = (objectVideo) => {
  const { id, videoId, url, title, thumbnailUrl, duration, addedIn, tags } =
    objectVideo;

  const durationWrapper = getTextSpan(`${secondsToTime(duration)}`);

  durationWrapper.props.class = 'video-card-duration';
  durationWrapper.props.title = 'Duração do vídeo';

  const thumbnailWrapper = getComponent(
    'div',
    getImgComponent(thumbnailUrl, `Thumbnail for video ${title}`, 100, 100),
    durationWrapper
  );
  thumbnailWrapper.props.class = 'video-card-thumbnail-wrapper';
  thumbnailWrapper.props.title = `Thumbnail do video ${title}`;

  const titleWrapper = getComponent('h5', getTextComponent(title));
  titleWrapper.props.class = 'video-card-title';

  const dateWrapper = getComponent(
    'spam',
    getIconComponent(clock, 'small'),
    getTextSpan(`${timeFormat(addedIn)}`)
  );
  dateWrapper.props.class = 'video-card-date';
  dateWrapper.props.title = 'Data de adição';

  const numberOfTags = getComponent(
    'spam',
    getIconComponent(bookmarksTags, 'small'),
    getTextSpan(`${tags.length} marcações`)
  );
  numberOfTags.props.class = 'video-card-tags';

  const secondLine = getComponent('spam', dateWrapper, numberOfTags);
  secondLine.props.class = 'video-card-secondLine';

  const videoIdWrapper = getTextSpan(`ID: ${videoId}`);
  videoIdWrapper.props.class = 'video-card-id';
  videoIdWrapper.props.title = 'ID do vídeo';

  const videoUrl = getComponent(
    'spam',
    getIconComponent(externalLink, 'small'),
    getAnchor(url, 'Assista no YouTube')
  );
  videoUrl.props.class = 'video-card-link';

  const infosWrapper = getComponent(
    'div',
    titleWrapper,
    secondLine,
    videoIdWrapper,
    videoUrl
  );
  infosWrapper.props.class = 'video-card-infos';

  const deleteButton = createButton(
    'Excluir',
    cancelAction,
    deleteIcon,
    'video-card-delete',
    `Delete video: ${title}`,
    false,
    ButtonType.PRIMARY,
    IconSize.SMALL
  );

  const editButton = createButton(
    'Editar',
    editVideoTags,
    movieInfosEdit,
    'video-card-edit',
    `Editar informações do video: ${title}`,
    false,
    ButtonType.TERTIARY,
    IconSize.SMALL
  );

  const openSideButton = createButton(
    'Abrir ao lado',
    openSide,
    expand,
    'video-card-open-side',
    `Abrir ao lado: ${title}`,
    false,
    ButtonType.SECONDARY,
    IconSize.NORMAL
  );

  const actionWrapper = getComponent(
    'div',
    openSideButton,
    deleteButton,
    editButton
  );
  actionWrapper.props.class = 'video-card-action';

  const divThumbInfo = getComponent('div', thumbnailWrapper, infosWrapper);
  divThumbInfo.props.class = 'video-card-thumb-info';

  const videoCard = getComponent('li', divThumbInfo, actionWrapper);
  videoCard.props.class = 'video-card';
  videoCard.props['data-id'] = id;

  return videoCard;
};
