// src/pages/contact.js

import { getComponent, getTextComponent } from "../utils/helpers";

export const contactView = getComponent('div', getComponent('h2', getTextComponent('contact')), getComponent('p', getTextComponent('Em breve mais informações...')));