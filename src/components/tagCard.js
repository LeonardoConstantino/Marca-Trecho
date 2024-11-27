import {
  getComponent,
  getIconComponent,
  getTextComponent,
  secondsToTime,
} from '../utils/helpers';
import { ButtonType, createButton, IconSize } from './button';
import { editTag } from '../handlers/editTag';
import { cancelAction } from '../handlers/deleteOrCancelTagCard';
//@ts-ignore
import clock from '../assets/images/clock.svg';
//@ts-ignore
import commentSvg from '../assets/images/comment.svg';
//@ts-ignore
import deleteIcon from '../assets/images/delete.svg';
//@ts-ignore
import commentEdit from '../assets/images/commentEdit.svg';

export const getTagCard = (tag) => {
  const { id, start, end, comment, priority } = tag;
  const componentId = getComponent('spam', getTextComponent(`ID: ${id}`));
  const componentTime = getComponent(
    'spam',
    getIconComponent(clock, 'small'),
    getComponent(
      'p',
      getTextComponent(`${secondsToTime(start)} - ${secondsToTime(end)}`)
    )
  );
  componentTime.props.class = 'time-wrapper';

  const textComment = getComponent('p', getTextComponent(`${comment}`));

  const commentComponent = getComponent(
    'spam',
    getIconComponent(commentSvg, 'small'),
    textComment
  );
  commentComponent.props.class = 'comment-wrapper';

  const priorityComponent = getComponent('spam');
  priorityComponent.props.class = `priority ${priority}`;

  const fistLine = getComponent('div', priorityComponent, componentId);
  fistLine.props.class = 'fist-line';

  const wrapperActions = getComponent(
    'div',
    createButton(
      '',
      cancelAction,
      deleteIcon,
      'btn-delete-tag',
      'Apagar marcação',
      false,
      ButtonType.PRIMARY,
      IconSize.SMALL
    ),
    createButton(
      '',
      editTag,
      commentEdit,
      'btn-commentEdit-tag',
      'Editar marcação',
      false,
      ButtonType.TERTIARY,
      IconSize.SMALL
    )
  );
  wrapperActions.props.class = 'wrapper-actions';

  const tagCard = getComponent(
    'li',
    fistLine,
    componentTime,
    commentComponent,
    wrapperActions
  );
  tagCard.props.class = 'tag-card';
  tagCard.props['data-id'] = id;
  tagCard.props.title = comment;

  return tagCard;
};
