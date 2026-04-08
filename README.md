# Genetic Algorithm Optimization

Este repositório apresenta uma implementação de um Algoritmo Genético (AG) desenvolvido em TypeScript, focado na otimização de funções matemáticas.

## Visão Geral do Projeto

O objetivo principal deste trabalho é demonstrar a aplicação de Algoritmos Genéticos na resolução de problemas de otimização contínua, utilizando as funções de teste Bohachevsky 1 (BF1) e Camel Back 3 (CB3). A implementação detalha cada componente do AG, desde a representação dos indivíduos até os critérios de parada, com um foco na eficiência e na robustez da solução.

## Funcionalidades e Características

*   **Arquitetura:** Implementado com **Clean Architecture** em TypeScript, promovendo um código organizado e escalável.
*   **Representação:** Utiliza **representação real** (vetores de números decimais) para indivíduos, ideal para problemas de otimização contínua.
*   **Tamanho da População:** População fixa de **100 indivíduos**.
*   **Seleção de Pais:** Emprega **Seleção por Torneio** para escolher os pais da próxima geração.
*   **Crossover:** Implementa **Crossover Aritmético** com fator de carga genética (**Alpha**), permitindo uma recombinação controlada.
*   **Mutação:** Utiliza **Mutação Aleatória Uniforme**, substituindo genes dentro do domínio para explorar o espaço de busca.
*   **Elitismo:** O melhor indivíduo é sempre preservado e transferido para a próxima geração, garantindo a retenção das melhores soluções.
*   **Critérios de Parada:** Três critérios de parada são definidos: atingir o ótimo global (tolerância 0.01), repetição do melhor *fitness* por 5 gerações, ou limite de 1000 gerações.
*   **AutoTuner:** Um script auxiliar para **busca automática de hiperparâmetros**, permitindo encontrar configurações otimizadas para problemas específicos (e.g., BF1 e CB3), visando o menor NFE com 100% de sucesso.

## Resultados

As configurações otimizadas pelo AutoTuner demonstraram um desempenho superior em comparação com a literatura para os problemas BF1 e CB3, alcançando um Número de Avaliações de Função (NFE) significativamente menor com 100% de Taxa de Sucesso (SR). Por exemplo, para BF1, o NFE foi de 754 com SR de 100%, e para CB3, o NFE foi de 387 com SR de 100%.


## Como Executar

Para clonar o repositório e executar o projeto, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Gabriel-afk-9/genetic-algorithm-optimization.git
    cd genetic-algorithm-optimization
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Compile e execute o projeto:**
    ```bash
    npm run start
    ```

Para executar o AutoTuner, você pode modificar o `src/index.ts` ou criar um novo arquivo para chamar a função `startTuning()` de `src/autoTuner.ts`.
