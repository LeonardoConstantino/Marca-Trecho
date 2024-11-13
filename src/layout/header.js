import { getComponent, getTextComponent } from '../utils/helpers'
import { navigation } from './navigation'
// @ts-ignore
import imageLogo from '../assets/images/logo.png'

/**
 * Cria o cabeçalho da página, incluindo o logotipo e a navegação.
 *
 * @returns {object} O componente completo do cabeçalho.
 */
const createHeader = () => {
  // Cria o componente de imagem para o logotipo
  const img = getComponent('img')
  img.props.src = imageLogo
  const title = getComponent('h1', getTextComponent('Marca Trecho'))

  // Cria o componente de logotipo contendo a imagem
  const logo = getComponent('div', img, title)
  logo.props.class = 'header-title' // Define a classe CSS para estilização

  // Retorna o cabeçalho completo com o logotipo e a navegação
  return getComponent('header', logo, navigation)
}

// Exporta o componente de cabeçalho
export const header = createHeader()
