# Genetic Algorithm Optimization

## Descrição

Este repositório apresenta uma implementação em TypeScript de um **Algoritmo Genético (AG)** focado em otimização contínua.
## Funcionalidades

*   **Implementação Clara e Modular:** Código bem organizado que facilita a compreensão e a manutenção.
*   **Otimização Contínua:** Projetado para resolver problemas de otimização onde as variáveis são contínuas.
*   **Separação de Preocupações:** Arquitetura que distingue claramente o domínio do problema, a lógica de negócio (casos de uso) e os detalhes de implementação (infraestrutura).
*   **Exemplos de Problemas:** Inclui implementações de problemas de otimização conhecidos, como o problema de Bohachevsky e Camelback, para testar e demonstrar o AG.

## Estrutura do Projeto

A estrutura do projeto segue um padrão modular, com as seguintes pastas principais:

```
src/
├── domain/
│   ├── problems/             # Definições de problemas de otimização (e.g., Bohachevsky, Camelback)
│   ├── DomainPrimitives.ts   # Tipos e interfaces fundamentais do domínio
│   ├── GAConfig.ts           # Configurações do Algoritmo Genético
│   ├── Individual.ts         # Representação de um indivíduo na população
│   ├── OptimizationResult.ts # Estrutura para os resultados da otimização
│   ├── Problem.ts            # Interface base para problemas de otimização
│   └── RandomSource.ts       # Interface para geração de números aleatórios
├── infrastructure/
│   └── random/               # Implementações de fontes de aleatoriedade
│       └── MathRandomSource.ts # Implementação usando Math.random()
├── usecases/
│   ├── GeneticAlgorithm.ts   # Lógica central do Algoritmo Genético
│   └── RunOptimization.ts    # Caso de uso para executar o processo de otimização
└── index.ts                  # Ponto de entrada principal e exemplos de uso
```

## Tecnologias Utilizadas

*   **TypeScript:** Linguagem de programação principal, oferecendo tipagem estática para maior robustez e manutenibilidade.
*   **Node.js:** Ambiente de execução para o TypeScript.
*   **npm:** Gerenciador de pacotes para as dependências do projeto.

## Como Executar

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Gabriel-afk-9/genetic-algorithm-optimization.git
    cd genetic-algorithm-optimization
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Execute o algoritmo:**

    ```bash
    npm run start
    ```

    Ou, para executar em modo de desenvolvimento:

    ```bash
    npm run dev
    ```
