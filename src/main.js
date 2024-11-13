// src/main.js
// Importa o arquivo CSS principal para aplicar estilos globais à aplicação
import './assets/styles/main.css';

// Importa funções e módulos utilitários e páginas para a estrutura da aplicação
import { renderElement } from './utils/renderElement.js';// Renderiza elementos no DOM
//import { home } from './pages/home.js';// Página inicial da aplicação
import { showSnackbar } from './utils/showSnackbar.js';// Exibe notificações
import { currentTheme } from './services/storageHandle.js';// Obtém tarefas do armazenamento local
import { createButton, ButtonType, IconSize } from './components/button.js';
import svg from './assets/images/play-pause.svg';
import { getComponent, getTextComponent, getTextSpan } from './utils/helpers.js';
import { showModal } from './handlers/showModal.js';
import { homeView } from './pages/home.js';
import { closeModal } from './components/modal.js';
// import { navigation } from './layout/navigation.js';
import { header } from './layout/header.js';

const div = getComponent('div', homeView, createButton('modal', ()=>{showModal(getComponent('div', getTextComponent('Em breve...')), '', (e)=>{
  showSnackbar('Teste teste 123 teste')
  closeModal(e)
}, 'teste', )}, svg, '', 'mostra o modal'))

/**
 * @function main
 * @description Função principal para inicializar a aplicação. Configura o tema, renderiza a página inicial, carrega tarefas e exibe notificações.
 */
const main = () => {
  try {
    // Seleciona o elemento principal da aplicação no DOM
    const app = document.getElementById('app');
        
    // Obtém o tema atual da aplicação do armazenamento local
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    // Lança um erro se o elemento 'app' não for encontrado no DOM
    if (!app) throw new Error('Elemento com o ID "app" não encontrado.');
      
    // Renderiza a página inicial e o layout de tarefas dentro do elemento 'app'
    renderElement(header, true, app);
    renderElement(div, true, app);

    // Exibe uma mensagem de sucesso indicando que a aplicação foi iniciada
    showSnackbar('Aplicação iniciada com sucesso!');
  } catch (error) {
    // Em caso de erro, exibe a mensagem de erro no console e mostra um alerta de erro ao usuário
    console.error(error);
    showSnackbar('Ocorreu um erro ao iniciar a aplicação.');
  }
}

// Aguarda o carregamento completo do DOM para inicializar a aplicação
document.addEventListener('DOMContentLoaded', main);