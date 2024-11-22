// src/layout/footer.js
import {
  getTextComponent,
  getComponent,
  getIconComponent,
  getAnchor,
} from '../utils/helpers.js';
//@ts-ignore
import openSource from '../assets/images/openSource.svg';
//@ts-ignore
import github from '../assets/images/github.svg';
import { ButtonType, createButton, IconSize } from '../components/button.js';
import { showModal } from '../handlers/showModal.js';

const currentYear = getTextComponent(` ${new Date().getFullYear()}`);

const aboutContent = getComponent(
  'div',
  getComponent('h3', getTextComponent('Sobre')),
  getComponent(
    'h4',
    getTextComponent(
      'Este projeto é uma ferramenta de marcação de trechos de vídeos diretamente no navegador.'
    )
  ),
  getComponent(
    'p',
    getTextComponent(
      'Com ele, você pode marcar trechos específicos de um vídeo e salvar em sua playlist para acessar posteriormente. Além disso, você pode compartilhar os trechos marcados com outras pessoas, facilitando a colaboração e a discussão sobre o conteúdo.'
    )
  )
);

const privacyPolicyContent = getComponent(
  'div',
  getComponent('h3', getTextComponent('Política de Privacidade')),
  getComponent('h4', getTextComponent('Sem cookies 🍪')),
  getComponent('p', getTextComponent('Nao coletamos dados de usuários.'))
);

const contactContent = getComponent(
  'div',
  getComponent('h3', getTextComponent('Contatos')),
  getComponent('h4', getTextComponent('VAMOS NOS CONECTAR')),
  getComponent(
    'p',
    getIconComponent(github, 'small'),
    getAnchor('https://github.com/LeonardoConstantino', 'Github')
  )
);

const contact = createButton(
  'Contatos',
  () => {
    showModal(contactContent, 'contact-content');
  },
  '',
  '',
  '',
  false,
  ButtonType.TERTIARY,
  IconSize.SMALL
);

const privacyPolicy = createButton(
  'Política de Privacidade',
  () => {
    showModal(privacyPolicyContent, 'privacy-policy-content');
  },
  '',
  '',
  '',
  false,
  ButtonType.TERTIARY,
  IconSize.SMALL
);

const about = createButton(
  'Sobre',
  () => {
    showModal(aboutContent, 'about-content');
  },
  '',
  '',
  '',
  false,
  ButtonType.TERTIARY,
  IconSize.SMALL
);

const brand = getComponent(
  'p',
  getIconComponent(openSource, 'small'),
  getComponent('span', currentYear),
  getComponent('span', getTextComponent('Marca Trecho'))
);
brand.props.class = 'brand'

const nav = getComponent('nav', 
  about,
  privacyPolicy,
  contact,
)

export const footer = getComponent(
  'footer',
  nav,
  brand
);
