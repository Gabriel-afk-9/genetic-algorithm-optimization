# Genetic Algorithm Optimization

Implementacao em TypeScript de um algoritmo genetico para otimizacao continua com foco em clareza, simplicidade e separacao entre dominio, casos de uso e infraestrutura.

## Estrutura

```text
src/
  domain/
    problems/
    DomainPrimitives.ts
    GAConfig.ts
    Individual.ts
    OptimizationResult.ts
    Problem.ts
    RandomSource.ts
  infrastructure/
    random/
      MathRandomSource.ts
  usecases/
    GeneticAlgorithm.ts
    RunOptimization.ts
  index.ts
```

## Execucao

```bash
npm install
npm run start
```
