// src/main.js
// Importa o arquivo CSS principal para aplicar estilos globais à aplicação
import './assets/styles/main.css';

// Importa funções e módulos utilitários e páginas para a estrutura da aplicação
import { renderElement } from './utils/renderElement.js';// Renderiza elementos no DOM
import { showSnackbar } from './utils/showSnackbar.js';// Exibe notificações
import { header } from './layout/header.js';
import { footer } from './layout/footer.js';
import { viewContainer } from './layout/grid.js';
import { currentTheme } from './services/storageHandle.js';// Obtém o tema do armazenamento local

/**
 * @function main
 * @description Função principal para inicializar a aplicação. Configura o tema, renderiza a página inicial e exibe notificações.
 */
const main = () => {
  try {
    // Seleciona o elemento principal da aplicação no DOM
    const app = document.getElementById('app');
        
    // Obtém o tema atual da aplicação do armazenamento local
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    // Lança um erro se o elemento 'app' não for encontrado no DOM
    if (!app) throw new Error('Elemento com o ID "app" não encontrado.');
      
    // Renderiza os componentes da aplicação no DOM
    renderElement(header, true, app);
    renderElement(viewContainer, true, app);
    renderElement(footer, true, app);

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