# Estado Atual Publico V1

## Veredito

O repositorio publico esta funcional localmente e pronto para entrar na fase de integracao real controlada com o core.

## O Que Ja Existe

| Bloco | Status | Arquivos chave |
| --- | --- | --- |
| Coleta inicial | pronto | `src/components/ReviewForm.tsx` |
| Triagem publica | pronto | `src/review-triage/validate-review-input.ts` |
| Apresentacao publica | pronto | `src/components/ReviewResult.tsx`, `src/presentation/build-public-result.ts` |
| Mock client | pronto | `src/core-client/mock-core-client.ts` |
| Contrato do client | pronto | `src/core-client/core-client.ts` |
| Composicao central | pronto | `src/core-client/index.ts` |
| Client real base | pronto-base | `src/core-client/real-core-client.ts` |
| Verificacoes leves | prontas | `scripts/check-v1.mjs` |

## O Que Ainda Falta

| Item | Status | Observacao |
| --- | --- | --- |
| Selecionar mock ou real em `index.ts` | pronto-controlado | mock continua ativo hoje e o modo real exige runtime explicito |
| Definir runtime real no uso publico | pronto-minimo | `openai` instalado; falta fornecer `OPENAI_API_KEY` valido no ambiente |
| Validar a primeira chamada real | pronto-controlado | chamada executada; com chave dummy o core devolveu saida estruturada com `status=error` |
| Ajustar mensagem operacional de erro real | depois da primeira chamada | hoje a UI ainda fala em mock |

## Leitura Rapida

- o contrato publico ja esta travado;
- o mock continua existindo e segue como fallback;
- o `real-core-client.ts` ja foi criado, mas ainda nao esta ativo;
- a selecao controlada entre mock e real ja existe em `src/core-client/index.ts`;
- a ativacao local do modo real passa por `AGENTE_CARREIRA_IA_CORE_CLIENT_MODE=real` lido por `createLocallyActivatedCoreClientSelection(...)` mais o runtime explicito do client real;
- a primeira chamada real controlada agora tem script proprio em `scripts/check-real-call-v1.mjs`;
- a dependencia `openai` ja esta instalada no publico;
- a primeira execucao controlada com chave dummy retornou saida estruturada real com `status=error`;
- a proxima fase e integracao controlada, nao reescrita da v1.
