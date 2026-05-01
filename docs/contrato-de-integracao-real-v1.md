# Contrato De Integracao Real V1

## Objetivo

Travar a forma minima da chamada real do `agente-carreira-ia` para o `agente-carreira-ia-core` antes da criacao de `real-core-client.ts`.

## Forma Minima Da Chamada

| Item | Definicao |
| --- | --- |
| chamada publica | `reviewResume(payload)` |
| entrada | `ReviewInput` |
| saida | `Promise<ReviewOutput>` |
| contrato estavel | `CoreClient` |
| composition root do core | `createRevisaoCurriculoV1ModuleWithInstantiatedRealClient(...)` |

## Entrada Esperada

`real-core-client.ts` deve enviar ao core apenas o payload do contrato publico:

- `module`
- `request_id`
- `curriculo_texto`
- `objetivo_profissional`
- `senioridade_alvo`
- `vaga_alvo_texto`
- `restricoes_ou_preferencias`
- `idioma_resposta`
- `observacoes_do_usuario`

## Saida Esperada

O retorno esperado para a camada publica continua sendo:

- `status`
- `resumo_geral`
- `veredito`
- `achados_principais`
- `sugestoes_priorizadas`
- `perguntas_pendentes`
- `alertas`
- `proximos_passos`

## Tratamento De Status

| `status` | Regra no publico |
| --- | --- |
| `ok` | apresentar a resposta |
| `needs_input` | voltar para coleta com pergunta objetiva |
| `error` | informar falha sem expor detalhe interno |

## O Que `real-core-client.ts` Deve Assumir

- `CoreClient` continua sendo o contrato unico;
- `ReviewInput` ja representa a entrada publica esperada;
- `ReviewOutput` ja representa a saida publica esperada;
- a UI nao deve mudar para a integracao real;
- a selecao da implementacao continua centralizada em `src/core-client/index.ts`.
- a composition root preferida do core e `createRevisaoCurriculoV1ModuleWithInstantiatedRealClient(...)`.

## O Que `real-core-client.ts` Nao Deve Assumir

- nao assumir prompt interno;
- nao assumir rubrica privada;
- nao assumir parse de texto livre;
- nao assumir campos fora de `ReviewOutput`;
- nao mover triagem publica para dentro do cliente;
- nao acoplar a UI a detalhe de transporte.
- nao preferir `createRevisaoCurriculoV1ModuleWithComposedRealAdapter(...)` como borda publica principal.

## O Que Ja Esta Travado

| Item | Status | Observacao |
| --- | --- | --- |
| assinatura publica | travado | `reviewResume(payload)` |
| entrada publica | travado | `ReviewInput` |
| saida publica | travado | `ReviewOutput` |
| composicao do cliente | travado | `src/core-client/index.ts` |
| composition root escolhida | travado | `createRevisaoCurriculoV1ModuleWithInstantiatedRealClient(...)` |

## O Que Ainda Depende De Decisao Futura

| Item | Status | Observacao |
| --- | --- | --- |
| transporte real | aberto | fica para a proxima microetapa |
| configuracao da integracao | aberto | fica fora deste contrato |
| estrategia de erro fora do contrato | aberto | depende da implementacao real |
