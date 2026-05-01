# Integracao Real Com O Core V1

## Objetivo

Marcar quando a integracao real com o core comeca no repositorio publico e o que precisa acontecer antes disso.

## Decisoes Ja Fechadas

| Item | Status | Observacao |
| --- | --- | --- |
| contrato publico | fechado | `ReviewInput` e `ReviewOutput` |
| contrato do client | fechado | `CoreClient` com `reviewResume(payload)` |
| composition root preferida | fechada | `createRevisaoCurriculoV1ModuleWithInstantiatedRealClient(...)` |
| ponto unico de selecao | fechado | `src/core-client/index.ts` |
| mock preservado | fechado | continua no repositorio |

## Quando O Mock Continua Existindo

- enquanto a composicao ativa em `src/core-client/index.ts` apontar para o mock;
- enquanto `AGENTE_CARREIRA_IA_CORE_CLIENT_MODE` nao estiver em `real`;
- enquanto o runtime explicito do client real nao for fornecido;
- enquanto a primeira chamada real controlada nao for validada;
- como fallback de desenvolvimento local.

## Quando A Integracao Real Comeca

A integracao real comeca quando estes 3 pontos acontecerem juntos:

1. `createLocallyActivatedCoreClientSelection(...)` ler `AGENTE_CARREIRA_IA_CORE_CLIENT_MODE=real`;
2. o runtime minimo do client real estiver disponivel;
3. a primeira chamada real controlada for validada localmente.

## Runtime Minimo Do Client Real

- `AGENTE_CARREIRA_IA_CORE_CLIENT_MODE=real`;
- `env` com a chave real esperada pelo core;
- `OPENAI_API_KEY`;
- `OpenAIClient` explicito;
- `provider`, `model` e `apiKeyEnvVar` so quando fizer sentido.

## Script Da Primeira Chamada Real

```text
npm run check:real:v1
```

O script:

- usa o mesmo gate local de `AGENTE_CARREIRA_IA_CORE_CLIENT_MODE=real`;
- instancia `createRealCoreClient(...)` no check controlado;
- exige `AGENTE_CARREIRA_IA_CORE_CLIENT_MODE=real`;
- exige `OPENAI_API_KEY`;
- tenta importar `openai` como `OpenAIClient`;
- roda `reviewResume(payload)` em modo real.

Forma minima de fornecer runtime local:

```text
AGENTE_CARREIRA_IA_CORE_CLIENT_MODE=real OPENAI_API_KEY=sua-chave npm run check:real:v1
```

Resultado atual da tentativa local:

- sem `OPENAI_API_KEY`, o script bloqueia antes da chamada;
- a dependencia `openai` ja foi instalada no repositorio publico;
- com chave dummy, a chamada controlada executou e devolveu saida estruturada:
  - `mode=real`
  - `status=error`
  - `veredito=indisponivel no momento`
- para uma resposta real util, ainda falta um `OPENAI_API_KEY` valido.

## Ordem Recomendada

| Ordem | Etapa | Resultado esperado |
| --- | --- | --- |
| 1 | ativar a selecao real via `AGENTE_CARREIRA_IA_CORE_CLIENT_MODE=real` | composicao local muda sem tocar na UI |
| 2 | fornecer runtime minimo do client real | `real-core-client.ts` pode ser usado |
| 3 | rodar `npm run check:real:v1` | primeira chamada real controlada |
| 4 | revisar tratamento de erro real | mensagem publica coerente |
| 5 | manter mock como fallback | regressao baixa |

## Limite Desta Fase

- sem remover o mock;
- sem mudar o contrato publico;
- sem criar HTTP;
- sem expandir escopo da v1.
