// src/pages/home.js

import { getComponent, getTextComponent } from "../utils/helpers";

export const home = getComponent('div', getComponent('h1', getTextComponent('Projeto: Marca Trecho')), getComponent('p', getTextComponent('Em breve mais informações...')));