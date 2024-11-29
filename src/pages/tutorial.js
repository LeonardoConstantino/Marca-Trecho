import {
  getComponent,
  getImgComponent,
  getTextComponent,
} from '../utils/helpers';
import { ButtonType, createButton, IconSize } from '../components/button';
//@ts-ignore
import placeholder from '../assets/images/imgPlaceholder.svg';
//@ts-ignore
import backToHOme from '../assets/images/return.svg';

const getArticle = (titleContent, descriptionContent, imageSrc) => {
  const header = getComponent('h3', getTextComponent(titleContent));
  const description = getComponent('p', getTextComponent(descriptionContent));
  const imageElement = getImgComponent(imageSrc, titleContent, 100, 100);
  const contentWrapper = getComponent('div', header, description);
  contentWrapper.props.class = 'content-wrapper';
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

export const tutorialViewTutorial = getArticle(
  'Bem-vindo ao Marca Trecho',
  'Aprenda a usar o aplicativo com este guia rápido.',
  placeholder
);

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

const returnToHome = (e) => {
  e.preventDefault();

  const navButton = document.querySelector('[data-navButton="Pagina inicial"]');
  if (!(navButton instanceof HTMLButtonElement)) return;

  // Simula clique no botão de navegação
  navButton.click();
};

const returnToHomeButton = createButton(
  'Voltar para a página inicial',
  returnToHome,
  backToHOme,
  'button-shine return-button',
  'Voltar para a página inicial',
  false,
  ButtonType.PRIMARY,
  IconSize.LARGE
);

export const tutorialView = getComponent(
  'section',
  introduction,
  homeViewTutorial,
  addTagsViewTutorial,
  excerptsTaggedTutorial,
  returnToHomeButton
);
tutorialView.props.class = 'view tutorial';

//TODO - Substituir imagens placeholder por imagens reais.
