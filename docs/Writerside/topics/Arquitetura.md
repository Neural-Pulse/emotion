# Arquitetura

## Arquitetura geral do projeto.


```mermaid
graph TD;
    A[Usuário] -->|Interage| B[Frontend React]
    B -->|Roteamento| C[React Router]
    B -->|UI Components| D[Chakra UI]
    B -->|Estilização| E[emotion/styled]
    B -->|Gráficos| F[Chart.js/Recharts]
    B -->|Manipulação de Datas| G[date-fns/dayjs]
    B -->|Gerar PDF| H[jsPDF/html2canvas]
    B -->|Drag and Drop| I[react-draggable]

    J[Firebase] -->|Autenticação| B
    J -->|Armazenamento de Dados| B
    
    K[Vite] -->|Build & Dev Server| B
    K -->|PWA Support| L[Vite-plugin-pwa]
    
    M[TypeScript] -->|Tipagem Estática| B
    
    N[Backend Opcional] -->|API REST| B
    N -->|Processamento de Dados| B
    
    style B fill:#f9f,stroke:#333,stroke-width:2px
    style J fill:#bbf,stroke:#333,stroke-width:2px
    style K fill:#bfb,stroke:#333,stroke-width:2px
    style N fill:#fbb,stroke:#333,stroke-width:2px

```

## Fluxo de dados
```mermaid
flowchart TD;
    A[Usuário] -->|Input de Dados| B[Frontend React]
    B -->|Autenticação| C[Firebase Auth]
    B -->|Armazena Dados| D[Firebase Database]
    B -->|Consulta Dados| D
    B -->|Gera Gráficos| E[Chart.js/Recharts]
    B -->|Manipula Datas| F[date-fns/dayjs]
    B -->|Gera PDF| G[jsPDF/html2canvas]
    B -->|Interage UI| H[Chakra UI/emotion]
    B -->|Roteamento| I[React Router]
    B -->|Drag and Drop| J[react-draggable]

    C -->|Valida Usuário| B
    D -->|Envia Dados| B
    E -->|Exibe Gráficos| B
    F -->|Formato de Datas| B
    G -->|Download PDF| A
    H -->|Renderiza Componentes| B
    I -->|Navegação entre Páginas| B
    J -->|Reposiciona Elementos| B

    style B fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#ccf,stroke:#333,stroke-width:2px
    style F fill:#ccf,stroke:#333,stroke-width:2px
    style G fill:#ccf,stroke:#333,stroke-width:2px
    style H fill:#ccf,stroke:#333,stroke-width:2px
    style I fill:#ccf,stroke:#333,stroke-width:2px
    style J fill:#ccf,stroke:#333,stroke-width:2px
```
## Fluxo de dados sequencial
```mermaid
sequenceDiagram
    participant U as Usuário
    participant FR as Frontend React
    participant FA as Firebase Auth
    participant FD as Firebase Database
    participant CG as Chart.js/Recharts
    participant DM as date-fns/dayjs
    participant PDF as jsPDF/html2canvas
    participant UI as Chakra UI/@emotion
    participant RR as React Router
    participant DR as react-draggable

    U->>FR: Input de Dados
    FR->>FA: Solicita Autenticação
    FA->>FR: Retorna Status
    FR->>FD: Armazena Dados
    FR->>FD: Consulta Dados
    FD->>FR: Envia Dados
    FR->>CG: Solicita Geração de Gráficos
    CG->>FR: Retorna Gráficos
    FR->>DM: Solicita Formatação de Datas
    DM->>FR: Retorna Datas Formatadas
    FR->>PDF: Solicita Geração de PDF
    PDF->>U: Fornece Download de PDF
    FR->>UI: Renderiza Componentes UI
    UI->>FR: Retorna UI Renderizada
    FR->>RR: Navegação entre Páginas
    RR->>FR: Completa Navegação
    FR->>DR: Inicia Drag and Drop
    DR->>FR: Completa Drag and Drop

    Note over U,FR: Fluxo principal de interação do usuário
    Note over FA,FD: Interações com Firebase
    Note over CG,PDF: Processamento de dados visuais e documentos
    Note over UI,RR: Gestão de UI e roteamento
    Note over DR: Funcionalidade interativa
