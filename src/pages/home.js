// src/pages/home.js

import { getComponent, getTextComponent } from "../utils/helpers";

export const home = getComponent('div', getComponent('h1', getTextComponent('Projeto: Marca Trecho')));