Bem-vindo ao Emotion! Estamos felizes por você considerar contribuir. Este guia tem como objetivo fornecer orientações claras sobre como contribuir de forma eficaz e eficiente.

## Utilização do GitHub Flow

Para contribuições, seguimos o [GitHub Flow](https://guides.github.com/introduction/flow/). Isso significa que:

1. **Fork:** Inicie fazendo um fork do repositório.
2. **Clone:** Clone o repositório forkado para sua máquina local.
3. **Branch:** Crie uma nova branch para cada conjunto de alterações que você pretende fazer. Use um nome descritivo para sua branch, como `feature/nome-da-feature` ou `fix/nome-do-fix`.
4. **Commit:** Faça commits de suas alterações na branch criada. Siga as convenções de commits descritas abaixo.
5. **Push:** Envie suas alterações para o seu fork no GitHub.
6. **Pull Request:** Abra um Pull Request (PR) da sua branch no fork para a branch `main` do repositório original. Descreva claramente o que sua alteração faz e por que ela é necessária.
7. **Revisão:** Sua PR será revisada por mantenedores do projeto. Esteja aberto a feedback e faça as alterações necessárias se solicitado.

## Conventional Commits

Adotamos a convenção de [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit. Isso ajuda a criar um histórico de commits explícito e facilita a geração automática de changelogs. Aqui estão alguns exemplos:

- `feat: adicionar nova funcionalidade de login`
- `fix: corrigir bug no carregamento de imagens`
- `docs: atualizar README com novas instruções de instalação`
- `style: remover espaços em branco desnecessários`
- `refactor: otimizar lógica de verificação de usuário`
- `test: adicionar testes para componente de login`

## Antes de Submeter PR

Antes de submeter sua PR, certifique-se de:

1. **Rodar o Lint:** Execute `yarn lint` para garantir que seu código esteja de acordo com as diretrizes de estilo do projeto.
2. **Build:** Execute o comando de build do projeto (`yarn build`) para garantir que tudo está compilando corretamente.
3. **Testar:** Execute `yarn test` para rodar os testes automatizados e verificar se todos estão passando.

## Submetendo Pull Requests

Ao submeter sua PR, inclua uma descrição clara do que foi feito e por que. Se sua PR resolve uma issue, inclua uma referência à issue usando `#numero_da_issue` na descrição.

## Feedback

Feedback é sempre bem-vindo. Se você tiver qualquer dúvida ou sugestão, sinta-se à vontade para abrir uma issue no repositório.

Agradecemos sua contribuição para o projeto! Juntos, podemos construir algo incrível.