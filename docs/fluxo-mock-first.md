# Fluxo Mock-First

## Objetivo

Registrar o fluxo real do prototipo local da v1.

## Passo A Passo

| Etapa | O que acontece | Saida |
| --- | --- | --- |
| 1. coleta | usuario preenche curriculo, objetivo, senioridade e vaga opcional | payload `ReviewInput` |
| 2. triagem | a tela valida os campos obrigatorios | erros de campo ou continuidade |
| 3. mock | a app chama `mockCoreClient.reviewResume` | `ReviewOutput` |
| 4. adaptacao | `buildPublicResult` organiza a saida para a UI | `PublicReviewResult` |
| 5. exibicao | a tela renderiza resumo, veredito, achados, sugestoes e proximo passo | resposta publica da v1 |

## Caminhos

### Entrada invalida

- mostra mensagens por campo;
- nao chama o mock;
- nao mostra resultado.

### Entrada valida

- limpa o resultado anterior;
- mostra estado de carregamento;
- renderiza o resultado mock abaixo do formulario.

## Arquivos Envolvidos

| Arquivo | Papel no fluxo |
| --- | --- |
| `src/App.tsx` | orquestra submit, loading, erro e resultado |
| `src/components/ReviewForm.tsx` | monta o payload inicial |
| `src/review-triage/validate-review-input.ts` | decide se a entrada segue |
| `src/core-client/mock-core-client.ts` | devolve fixture canonicamente tipado |
| `src/presentation/build-public-result.ts` | reduz a saida ao formato da UI |
| `src/components/ReviewResult.tsx` | apresenta o resultado |

## Limite Atual

- a v1 mock-first valida o fluxo publico;
- ainda nao chama o core real;
- ainda nao cobre estados mais amplos de produto.
