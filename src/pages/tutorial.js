import {
  getComponent,
  getImgComponent,
  getTextComponent,
} from '../utils/helpers';
//@ts-ignore
import placeholder from '../assets/images/imgPlaceholder.svg';

const getArticle = (titleContent, descriptionContent, imageSrc) => {
  const header = getComponent('h3', getTextComponent(titleContent));
  const description = getComponent('p', getTextComponent(descriptionContent));
  const imageElement = getImgComponent(imageSrc, titleContent, 100, 100);
  const contentWrapper = getComponent('div', header, description);
  contentWrapper.props.class = 'content-wrapper'
  const article = getComponent('article', contentWrapper, imageElement);
  article.props.class = 'step';

  return article;
};

const introduction = getComponent(
  '<>',
  getComponent('h2', getTextComponent('Bem-vindo ao Marca Trecho')),
  getComponent(
    'p',
    getTextComponent('Aprenda a usar o aplicativo com este guia rápido.')
  )
);

export const tutorialViewTutorial = getArticle('Bem-vindo ao Marca Trecho', 'Aprenda a usar o aplicativo com este guia rápido.', placeholder);

export const homeViewTutorial = getArticle(
  'Pagina inicial',
  'Adicione novos videos, apague ou edite videos adicionados',
  placeholder
);

export const addTagsViewTutorial = getArticle(
  'Marcar trechos',
  'Selecione o trecho que deseja salvar e insira um comentário',
  placeholder
);

export const excerptsTaggedTutorial = getArticle(
  'Trechos Marcados',
  'Organize seus trechos marcados em playlists',
  placeholder
);
  

export const tutorialView = getComponent(
  'section',
  introduction,
  homeViewTutorial,
  addTagsViewTutorial,
  excerptsTaggedTutorial
);
tutorialView.props.class = 'view tutorial';
