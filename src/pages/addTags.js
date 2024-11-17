// src/pages/addTags.js

import { ButtonType, createButton, IconSize } from '../components/button';
import { showModal } from '../handlers/showModal';
import { getTags } from '../services/storageHandle';
import {
  addChildrenToView,
  getComponent,
  getTextComponent,
  getTextSpan,
} from '../utils/helpers';
import { addVideoContent } from './home';
//@ts-ignore
import addNotes from '../assets/images/addNotes.svg';
import { getSelection } from '../components/selection';

const tags = getTags();

// const priorities =  {
//   low: 'Baixa 🔵',
//   medium: 'Média 🟠',
//   high: 'Alta 🔴',
// }

const createInput = (labelValue, inputId, className) => {
  const input = getComponent('input');
  input.props.type = 'time';
  input.props.class = className;
  input.props.id = inputId;
  input.props.min = 0;
  input.props.step = 1;

  const label = getComponent('label', getTextSpan(labelValue), input);
  label.props.class = `form-label-${className}`;
  label.props.for = inputId;

  return label;
};

const divVideoPlaceholder = getComponent(
  'div',
  getTextComponent('Adicionar vídeo')
);
divVideoPlaceholder.props.class = 'video-placeholder';
divVideoPlaceholder.props.title = 'Click Para Adicionar Um Vídeo';
divVideoPlaceholder.props.onClick = () => showModal(addVideoContent, 'home-modal-add-video')

const videoWrapper = getComponent('div', divVideoPlaceholder);
videoWrapper.props.id = 'videoWrapper';

// const inputComment = getComponent('input');
// inputComment.props.type = 'text';
// inputComment.props.placeholder = 'Adicionar Comentário';
// inputComment.props.id = 'input-comment';

// const labelInputComment = getComponent('label', inputComment);
// labelInputComment.props.for = 'input-comment';
// labelInputComment.props.class = 'add-tags-label-input-comment';

const textarea = getComponent('textarea');
textarea.props.id = 'tagInput';
textarea.props.class = 'scrollbar';
textarea.props.placeholder = 'Adicionar Comentário';

const TimeSelector = getComponent(
  'div',
  createInput('Início:', 'inicialTime', 'inicialTime'),
  createInput('Fim:', 'finalTime', 'finalTime')
);
TimeSelector.props.class = 'time-selector';

const prioritiesSelector = getSelection(
  'prioritySelector',
  {
    low: 'Baixa 🔵',
    medium: 'Média 🟠',
    high: 'Alta 🔴',
  },
  () => console.log('Selecionar Prioridade'),
  'Selecionar Prioridade'
);

const addTagsButton = createButton(
  'Salvar Trecho',
  () => console.log('Salvar Trecho'),
  addNotes,
  '',
  'Salvar Trecho'
);

const wrapperActions = getComponent(
  'div',
  prioritiesSelector,
  addTagsButton
)
wrapperActions.props.class = 'wrapper-actions';

const CreateTags = getComponent(
  'div',
  TimeSelector,
  textarea,
  wrapperActions
);
CreateTags.props.class = 'create-tags';

const emptyTagsMessage = getComponent(
  'div',
  getComponent('p', getTextComponent('Nenhuma marcação adicionada'))
);
emptyTagsMessage.props.class = 'empty-tags-message';

const TagsList = getComponent('div');

const TagsListWrapper = getComponent('div', getComponent('h5', getTextComponent('Marcações')));
TagsListWrapper.props.class = 'tags-list-wrapper';

addChildrenToView(
  TagsListWrapper,
  tags.length === 0,
  [emptyTagsMessage],
  [TagsList],
);

export const addTagsView = getComponent(
  'div',
  videoWrapper,
  CreateTags,
  TagsListWrapper
);
addTagsView.props.class = 'view contact';

// addChildrenToView(
//   addTagsView,
//   tags.length !== 0,
//   [addVideoContent, videoManagement],
//   [introduction, videoManagement]
// )
