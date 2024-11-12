# Projeto: Marca Trecho
Este projeto é uma ferramenta de marcação de trechos de vídeos diretamente no navegador. Ele permite ao usuário criar e organizar marcações de partes importantes de vídeos do YouTube e, no futuro, de outros sites de vídeo. Não possui backend ou banco de dados, e todas as funcionalidades são executadas no front-end.

## Estrutura de Views
A seguir, cada view do projeto é detalhada, seguindo uma ordem lógica de uso com verificações (checks) para orientar o desenvolvimento.

### Componentes Fixos: Header e Footer
Para manter a navegação consistente, o Header e o Footer estarão fixos em todas as views. Esses componentes fornecem acesso rápido a funcionalidades principais e ajudam o usuário a navegar pelo aplicativo de forma intuitiva.

### Header
**Descrição**: O Header apresenta a identidade da aplicação, links de navegação e acessos rápidos.

**Estrutura do Header**:

- **Logo**: Nome ou logotipo do aplicativo no canto esquerdo, que leva o usuário à Home ao clicar.
- **Links de Navegação**:
  - **Início**: Link para a página inicial.
  - **Minhas Playlists**: Link que leva para a lista de playlists criadas pelo usuário.
  - **Tutorial**: Link para acessar o tutorial, para guiar novos usuários.
- **Botão de Ajuda**: Um botão de "Ajuda" com um ícone de "?" no canto direito para acessar dicas rápidas abre um popup de ajuda da pagina especifica.
- **Ícone de Compartilhamento**: Opcionalmente, um ícone para compartilhar a página atual ou uma playlist (quando disponível).
#### Exemplo de Estrutura HTML do Header:

```html
<header>
  <div class="logo">Marca Trecho</div>
  <nav>
    <a href="#home">Início</a>
    <a href="#playlists">Minhas Playlists</a>
    <a href="#tutorial">Tutorial</a>
  </nav>
  <div class="header-actions">
    <button class="help-btn">?</button>
    <button class="share-btn">🔗</button>
  </div>
</header>
```
**Checks**:

 - [ ] O logo redireciona para a Home.
 - [ ] Links de navegação levam para as seções correspondentes.
 - [ ] Botão de ajuda abre o tutorial ou dicas rápidas.
 - [ ] Botão de compartilhamento permite gerar link compartilhável (se aplicável).

### Footer
**Descrição**: O Footer exibe informações complementares, como links de suporte, termos de uso, e créditos.

#### Estrutura do Footer:

- **Links Secundários**:
  - **Sobre**: Informações sobre o projeto.
  - **Política de Privacidade**: Link para a política de privacidade.
  - **Contato**: Um link ou botão para enviar feedback ou entrar em contato com o suporte.
- **Mensagem de Direitos Autorais**: Uma breve linha com direitos autorais e ano, como "© 2024 Marca Trecho".
- **Botões de Redes Sociais**: Links opcionais para redes sociais ou páginas externas relevantes.
#### Exemplo de Estrutura HTML do Footer:

```html
<footer>
  <nav>
    <a href="#about">Sobre</a>
    <a href="#privacy">Política de Privacidade</a>
    <a href="#contact">Contato</a>
  </nav>
  <div class="footer-info">
    <p>© 2024 Marca Trecho</p>
  </div>
</footer>
```
#### Checks:

- [ ] Links de navegação redirecionam corretamente.
- [ ] As informações de direitos autorais e políticas estão atualizadas.
- [ ] Links para redes sociais funcionam (caso existam).

### 1. View: Home / Página Inicial
**Descrição**: Página inicial onde o usuário pode começar a criar sua lista de trechos a partir de links de vídeos.

**Elementos**:

- **Campo de Entrada para URL do Vídeo**: Um campo de texto para o usuário inserir links de vídeos do YouTube.
- **Botão "Adicionar Vídeo"**: Botão para processar a URL e validar o ID do vídeo.
- **Lista de Vídeos Adicionados**: Exibe uma lista de vídeos já adicionados para facilitar a visualização.
#### Checks:

- [ ] Implementar função `videoIdFromURL` para extrair e validar o ID do vídeo.
- [ ] Mostrar mensagem de erro se o link do vídeo for inválido.
- [ ] Adicionar vídeo à lista com o título e o thumbnail.

### 2. View: Adicionar Marcações ao Vídeo
**Descrição**: Página onde o usuário seleciona e marca trechos específicos do vídeo.

**Elementos**:

- **Player do Vídeo**: Embeds do YouTube para visualização e controle do vídeo.
- **Seletor de Trecho**: Botões para definir o início e o fim de um trecho (timestamp).
- **Campo de Comentário**: Área de texto para adicionar comentários ao trecho.
- **Seletor de Nível de Importância**: Botões ou seletores para escolher a importância (verde, amarelo, vermelho).
- **Botão "Salvar Trecho"**: Salva o trecho com todos os dados (início, fim, comentário, importância) para esse vídeo.
#### Estrutura de dados:
```javascript
const trecho = {
  inicio: '00:00:00',
  fim: '00:00:00',
  comentario: 'Exemplo de comentário',
  importancia: 'verde'
  // Adicionar outros campos conforme necessário
}
```

#### Checks:

- [ ] Player deve carregar o vídeo com base no ID extraído.
- [ ] Trecho deve salvar as timestamps de início e fim corretamente.
- [ ] Comentário e nível de importância devem ser armazenados com o trecho.
- [ ] Verificar se o usuário pode adicionar múltiplos trechos em um único vídeo.

### 3. View: Listagem de Trechos Marcados
Descrição: Exibe uma lista de todos os trechos marcados para cada vídeo, permitindo visualizar e editar as marcações.

**Elementos**:

- **Lista de Trechos por Vídeo**: Exibe todos os trechos com timestamp, importância (cor), e comentário.
- **Botão de Edição para Cada Trecho**: Permite ao usuário editar o início, fim, comentário e importância.
- **Botão de Excluir Trecho**: Permite ao usuário excluir um trecho específico.
- **Botão "Adicionar Novo Trecho"**: Redireciona para a View de Adicionar Marcações ao Vídeo para incluir um novo trecho.
#### Checks:

- [ ] Cada trecho exibe os detalhes (início, fim, comentário, importância) em formato legível.
- [ ] Ao editar um trecho, a view deve atualizar as informações corretamente.
- [ ] Exclusão de trecho deve ser confirmada antes de remover.
- [ ] Verificar se os trechos são ordenados pelo timestamp inicial.

### 4. View: Criar Playlist

**Descrição**: O usuário organiza os trechos selecionados em uma playlist, podendo alterar a ordem e incluir trechos de diferentes vídeos.

**Elementos**:

- **Lista de Trechos Selecionados para Playlist**: Exibe todos os trechos adicionados à playlist com informações básicas (vídeo, início, fim, comentário).
- **Drag and Drop para Ordenação**: Permite ao usuário reorganizar a ordem dos trechos na playlist.
- **Botão "Salvar Ordem da Playlist"**: Salva a ordem estabelecida pelo usuário.
- **Campo de Nome para Playlist**: Permite nomear a playlist para fácil identificação.
#### Estrutura de dados:
```javascript
const playlist = {
  'VIDEO_ID': {
    nome: 'Nome da Playlist',
    trechos: [
      {
        videoId: 'VIDEO_ID',
        inicio: '00:00:00',
        fim: '00:00:00',
        comentario: 'Exemplo de comentário',
        importancia: 'verde'
        // Adicionar outros campos conforme necessário
      },
      // Adicionar outros trechos conforme necessário
  ],
  // Adicionar outras informações conforme necessário
  },
  // Adicionar outras playlists conforme necessário
}
```
#### Checks:

- [ ] Trechos de múltiplos vídeos podem ser adicionados à playlist.
- [ ] Usuário consegue ordenar os trechos por arrastar e soltar.
- [ ] A ordem é mantida e atualizada ao clicar em "Salvar Ordem da Playlist".
- [ ] Nome da playlist é salvo junto com os trechos.

### 5. View: Visualizar e Reproduzir Playlist

**Descrição**: Interface para reproduzir a playlist de trechos organizada pelo usuário, com a opção de compartilhar a playlist.

**Elementos**:

- **Player de Vídeo Sequencial**: Reproduz os trechos em sequência com base na ordem da playlist.
- **Display de Comentário e Importância**: Exibe o comentário e a cor de importância ao reproduzir cada trecho.
- **Botão de Compartilhar Playlist**: Gera um link de compartilhamento para a playlist.
- **Opção de Controle de Edição no Link**: Define se a playlist pode ou não ser editada por outros.

#### Checks:

- [ ] Reproduzir trechos sequencialmente na ordem salva.
- [ ] Comentário e nível de importância são exibidos junto com cada trecho.
- [ ] Link de compartilhamento é gerado corretamente.
- [ ] Verificar se as permissões de edição são respeitadas ao compartilhar.

### Funções Essenciais (Pseudo-Código)

#### 1. Extrair ID do Vídeo:

```javascript
function videoIdFromURL(url) {
  const match = url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/i);
  return match ? match[1] : undefined;
}
```
#### 2. Criar Trechos:

```javascript
function addSegment(videoId, start, end, comment, importanceLevel) {
  return { videoId, start, end, comment, importanceLevel };
}
```
#### 3. Organizar Playlist:

```javascript
function organizePlaylist(segments) {
  return segments.sort((a, b) => a.order - b.order);
}
```
#### 4. Gerar Link de Compartilhamento:

```javascript
function generateShareLink(playlistId, isEditable) {
  return `${window.location.origin}/playlist/${playlistId}?editable=${isEditable}`;
}
```
## 6. View: Tutorial

**Descrição**: A View de Tutorial orienta o usuário sobre como utilizar o aplicativo. Ela é acessível pelo Header e apresenta um guia passo a passo para adicionar vídeos, marcar trechos e criar playlists.

### Estrutura do Tutorial:

1. **Introdução ao Aplicativo**: Breve explicação sobre o propósito do aplicativo.
2. **Passo a Passo com Ilustrações**:
    - **Passo 1: Adicionar Vídeos**
      - Explica como inserir links do YouTube.
      - Inclui uma ilustração ou ícone de um campo de entrada de URL.
    - **Passo 2: Marcar Trechos**
      - Orienta sobre o processo de criar e salvar trechos, com exemplo de timestamps e níveis de importância (com ilustrações de cores).
    - **Passo 3: Organizar Playlist**
      - Demonstra como selecionar trechos e reorganizar a ordem.
      - Explica a função de arrastar e soltar (drag-and-drop).
    - **Passo 4: Compartilhar Playlist**
      - Orienta sobre como gerar links compartilháveis e definir permissões.
3. **Dicas e Truques**: Breve seção com dicas adicionais, como atalhos ou sugestões de melhores práticas.
4. **Botão "Começar Agora"**: Um botão que leva o usuário de volta à Home para começar a usar o aplicativo.

#### Exemplo de Estrutura HTML do Tutorial:

```html
<section class="tutorial">
  <h1>Bem-vindo ao Marca Trecho</h1>
  <p>Aprenda a usar o aplicativo com este guia rápido.</p>
  
  <div class="step">
    <h2>Passo 1: Adicionar Vídeos</h2>
    <p>Insira o link do YouTube e adicione à sua lista.</p>
    <img src="assets/add-video.png" alt="Adicionar vídeo">
  </div>

  <div class="step">
    <h2>Passo 2: Marcar Trechos</h2>
    <p>Selecione o trecho que deseja salvar e insira um comentário.</p>
    <img src="assets/mark-segment.png" alt="Marcar trecho">
  </div>

  <div class="step">
    <h2>Passo 3: Organizar Playlist</h2>
    <p>Arraste e solte os trechos na ordem que preferir.</p>
    <img src="assets/organize-playlist.png" alt="Organizar playlist">
  </div>

  <div class="step">
    <h2>Passo 4: Compartilhar Playlist</h2>
    <p>Crie um link e compartilhe com amigos.</p>
    <img src="assets/share-playlist.png" alt="Compartilhar playlist">
  </div>

  <button class="start-btn">Começar Agora</button>
</section>
```
#### Checks:

 - [ ] Cada passo possui uma breve explicação e uma imagem ilustrativa.
 - [ ] O botão "Começar Agora" leva o usuário de volta à Home.
 - [ ] O tutorial cobre todos os principais recursos do aplicativo de maneira clara e concisa.
 
Essa estrutura oferece uma navegação intuitiva e um guia claro para novos usuários, ajudando-os a compreender rapidamente o funcionamento do aplicativo.