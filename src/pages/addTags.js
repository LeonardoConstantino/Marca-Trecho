// src/pages/addTags.js

import { createButton } from '../components/button';
import { showModal } from '../handlers/showModal';
import { getTags } from '../services/storageHandle';
import {
  addChildrenToView,
  getComponent,
  getTextComponent,
} from '../utils/helpers';
import { addVideoContent } from './home';
import { getSelection } from '../components/selection';
import { getTimeSelector } from '../components/timeSelector';
//@ts-ignore
import addNotes from '../assets/images/addNotes.svg';

const tags = getTags();

const divVideoPlaceholder = getComponent(
  'div',
  getTextComponent('Adicionar vídeo')
);
divVideoPlaceholder.props.class = 'video-placeholder';
divVideoPlaceholder.props.title = 'Click Para Adicionar Um Vídeo';
divVideoPlaceholder.props.onClick = () =>
  showModal(addVideoContent, 'home-modal-add-video');

const videoWrapper = getComponent('div', divVideoPlaceholder);
videoWrapper.props.id = 'videoWrapper';

const textarea = getComponent('textarea');
textarea.props.id = 'tagInput';
textarea.props.class = 'scrollbar';
textarea.props.placeholder = 'Adicionar Comentário';

const TimeSelector = getComponent(
  'div',
  getTimeSelector('Início:', 'inicialTime'),
  getTimeSelector('Fim:', 'finalTime')
);
TimeSelector.props.class = 'time-selector-wrapper';

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

const wrapperActions = getComponent('div', prioritiesSelector, addTagsButton);
wrapperActions.props.class = 'wrapper-actions';

const CreateTags = getComponent('div', TimeSelector, textarea, wrapperActions);
CreateTags.props.class = 'create-tags';

const emptyTagsMessage = getComponent(
  'div',
  getComponent('p', getTextComponent('Nenhuma marcação adicionada'))
);
emptyTagsMessage.props.class = 'empty-tags-message';

const TagsList = getComponent('div');

export const TagsListWrapper = getComponent(
  'div',
  getComponent('h5', getTextComponent('Marcações'))
);
TagsListWrapper.props.class = 'tags-list-wrapper';

addChildrenToView(
  TagsListWrapper,
  tags.length === 0,
  [emptyTagsMessage],
  [TagsList]
);

export const addTagsView = getComponent(
  'div',
  videoWrapper,
  CreateTags,
  TagsListWrapper
);
addTagsView.props.class = 'view add-Tags';
