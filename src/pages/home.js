// src/pages/home.js

import { getComponent, getTextComponent } from "../utils/helpers";

export const homeView = getComponent('div', getComponent('h2', getTextComponent('Projeto: Marca Trecho')), getComponent('p', getTextComponent('Em breve mais informações...')));