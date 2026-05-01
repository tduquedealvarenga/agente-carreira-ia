# Transicao Mock Para Core Real

## Objetivo

Preparar a troca do mock atual pelo `agente-carreira-ia-core` real sem mexer no fluxo publico da v1.

## Veredito Da Interface Atual

| Item | Status | Observacao |
| --- | --- | --- |
| `CoreClient` | bom | ja isola a chamada ao core |
| `src/core-client/index.ts` | bom | centraliza a escolha da implementacao ativa |
| `reviewResume(payload)` | bom | nome e assinatura servem para mock e real |
| `ReviewInput` | bom | segue o contrato publico |
| `ReviewOutput` | bom | segue a saida estruturada da v1 |

## O Que Deve Ficar Igual

- `ReviewForm` continua gerando `ReviewInput`;
- `App.tsx` continua chamando `reviewResume(payload)`;
- `App.tsx` continua importando o cliente pelo ponto unico de composicao;
- `buildPublicResult` continua recebendo `ReviewOutput`;
- `ReviewResult` continua apresentando a saida publica.

## O Que Troca Depois

| Hoje | Depois |
| --- | --- |
| `mockCoreClient` devolve fixture local | `realCoreClient` consome o core real |
| fixture JSON | resposta real do contrato |
| sem transporte | transporte real definido fora desta etapa |

## Composition Root Escolhida

| Escolha | Status | Observacao |
| --- | --- | --- |
| `createRevisaoCurriculoV1ModuleWithInstantiatedRealClient(...)` | escolhida | root mais alta e mais estavel para o repositorio publico |
| `createRevisaoCurriculoV1ModuleWithComposedRealAdapter(...)` | interna | fica como opcao mais baixa dentro do core |

## Estrutura Minima Recomendada

```text
src/core-client/
├── core-client.ts
├── index.ts
├── mock-core-client.ts
└── real-core-client.ts
```

## Regra De Transicao

1. manter `CoreClient` como contrato unico;
2. manter `index.ts` como ponto unico de selecao;
3. criar `real-core-client.ts` consumindo `createRevisaoCurriculoV1ModuleWithInstantiatedRealClient(...)`;
4. trocar a composicao em `index.ts`;
5. manter mock disponivel para teste local.

## O Que Nao Fazer Nesta Etapa

- nao mudar o contrato publico;
- nao mover triagem para o core-client;
- nao acoplar a UI a detalhes de transporte;
- nao remover o mock atual.
