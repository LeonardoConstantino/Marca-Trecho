import { getComponent, getTextComponent } from '../utils/helpers';

export const emptyMessage = (list) => {
  return getComponent(
    'div',
    getComponent(
      'p',
      getTextComponent(
        `Sua lista de ${list} esta vazia, adicione um ${list} para começar.`
      )
    )
  );
};
