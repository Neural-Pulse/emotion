# Git

Regras e guides de versionamento do projeto.
## Commits
- Conventional commits
- Micro comites preferencialmente
## Fluxo
### Githubflow
- Branch: Tudo começa com a criação de uma nova branch a partir da branch principal (geralmente chamada de main ou master). Esta branch deve ter um nome descritivo relacionado à funcionalidade ou correção que você está desenvolvendo.
- Desenvolvimento: O desenvolvimento é feito na branch criada, permitindo experimentações e mudanças sem afetar a branch principal.
- Commit: Faça commits regularmente para sua branch, mantendo um histórico claro e detalhado das mudanças.
- Pull Request: Quando o desenvolvimento na branch está completo, cria-se um pull request (PR). Isso move a discussão sobre o código para um espaço onde ele pode ser revisado por outros desenvolvedores, testado e discutido.
- Revisão de Código: Outros desenvolvedores revisam o código, sugerem ou fazem alterações. A revisão de código é crucial para manter a qualidade e a saúde do código base.
- Testes: É importante realizar testes automatizados e manuais para garantir que o novo código não introduza bugs ou problemas no sistema existente.
- Deploy: Após a aprovação no pull request, o código é mesclado (merge) à branch principal. O deploy deve ser feito frequentemente para garantir que as mudanças cheguem rapidamente aos usuários.
- Iteração: Após o deploy, o ciclo começa novamente para novas funcionalidades ou correções.

```mermaid
---
title: GithubFlow 
---
gitGraph:
    options
    {
        "nodeSpacing": 150,
        "nodeRadius": 10
    }
    end
    commit
    branch new-feature
    checkout new-feature
    commit
    commit
    checkout main
    merge new-feature
    commit
    commit
```
