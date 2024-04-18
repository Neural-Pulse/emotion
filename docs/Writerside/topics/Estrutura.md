# Estrutura

Estrutura geral do projeto.

- **CONTRIBUTING.md**: Guia para contribuidores do projeto.
- **LICENSE**: Arquivo de licença do projeto.
- **README.md**: Descrição geral do projeto, incluindo instruções de instalação e uso.
- **dev-dist/**: Pasta que contém arquivos de desenvolvimento para o Service Worker e Workbox.
    - **registerSW.js**: Script para registrar o Service Worker.
    - **sw.js**: Service Worker para cache e estratégias offline.
    - **workbox-b5f7729d.js**: Script do Workbox para gerenciamento avançado de cache.
- **dist/**: Pasta de distribuição, contém os arquivos construídos prontos para produção.
    - **assets/**: Scripts e recursos compilados.
    - **index.html**: Página HTML principal.
    - **manifest.webmanifest**: Arquivo manifest para PWA, define ícones e nome da aplicação.
    - **sw.js, registerSW.js**: Service Worker e seu script de registro para PWA.
- **docs/**: Documentação do projeto.
    - **Writerside/**: Exemplos e configurações específicas.
        - **images/**: Imagens usadas na documentação.
        - **topics/**: Arquivos Markdown detalhando partes específicas do projeto.
- **index.html**: Página HTML principal para desenvolvimento.
- **package.json**: Configurações do projeto e dependências.
- **public/** e **public-dev/**: Pastas contendo recursos públicos como ícones e imagens.
- **pwa-assets.config.ts**: Configurações para geração de ativos de PWA.
- **src/**: Código fonte do projeto.
    - **App.tsx**: Componente raiz do React.
    - **assets/**: Ativos como imagens e estilos globais.
    - **components/**: Componentes React reutilizáveis.
    - **pages/**: Componentes de página do React para rotas específicas.
    - **utils/**: Funções utilitárias, incluindo configurações de criptografia e Firebase.
- **theme.ts**: Definições de tema para estilização.
- **tsconfig.json**, **tsconfig.node.json**: Configurações do TypeScript.
- **vite.config.ts**: Configurações do Vite para build e desenvolvimento.
- **yarn.lock**: Arquivo de lock do Yarn para garantir versões consistentes de pacotes.