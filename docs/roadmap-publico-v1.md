# Roadmap Publico V1

## Objetivo

Mostrar o caminho curto da v1 do repositorio publico ate a primeira integracao real com o core.

## Roadmap Curto

| Etapa | Status | Observacao |
| --- | --- | --- |
| Escopo da v1 | concluido | so revisao de curriculo |
| Prototipo local mock-first | concluido | coleta, triagem, mock e apresentacao |
| Contrato publico | concluido | input e output travados |
| Composicao do `core-client` | concluido | `src/core-client/index.ts` existe |
| `real-core-client.ts` base | concluido-base | arquivo criado, ainda nao ativo |
| Primeira integracao real controlada | proxima | ligar o publico ao core real sem remover mock |
| Validacao local da chamada real | proxima | primeira execucao controlada |
| HTTP externo | depois | fora desta fase |

## Proximo Foco

- manter mock como padrao seguro;
- preparar a selecao entre mock e real;
- validar a primeira chamada real controlada;
- preservar a UI e o contrato publico.

## O Que Nao Entra Agora

- novos modulos;
- remocao do mock;
- HTTP;
- backend proprio;
- expansao para LinkedIn ou entrevista.
