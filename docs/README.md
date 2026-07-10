# Documentação — agente-carreira-ia

Este repositório público representa a camada de **orquestração, entrada, triagem, contrato e apresentação** do Agente Carreira IA.

A inteligência avaliativa, os prompts, critérios, réguas, exemplos completos e regras internas pertencem ao repositório privado `agente-carreira-ia-core`.

## Fonte da verdade por assunto

| Assunto | Arquivo |
|---|---|
| Papel do repositório público | `docs/papel-do-repositorio-publico.md` |
| Fluxo conversacional | `docs/fluxo-da-conversa.md` |
| Decisão entre perguntar, seguir ou interromper | `docs/regras-de-triagem.md` |
| Contrato entre público e core | `docs/contrato-com-o-core.md` |
| Schema esperado da saída do core | `docs/saida-estruturada-do-core.md` |
| Apresentação da resposta ao usuário | `docs/apresentacao-do-resultado.md` |
| Exemplo fictício de troca com o core | `docs/fixtures/revisao-curriculo-v1.md` |
| Visão pública institucional do produto | `docs/visao-produto.md` |
| Artefato visual HTML | `docs/assets/visao-produto.html` |

## Regra central

O repositório público **organiza a experiência**.

O core privado **executa a inteligência de avaliação**.

## O que não deve estar neste repositório

- prompts internos;
- rubricas privadas;
- critérios detalhados de avaliação;
- régua de notas;
- cadeia de raciocínio;
- exemplos reais com dados pessoais;
- estratégia comercial sensível;
- decisões internas de monetização.

## Como evoluir esta documentação

1. Evitar duplicar regras entre arquivos.
2. Manter cada documento com uma responsabilidade única.
3. Atualizar o `README.md` sempre que criar, mover ou renomear documento.
4. Usar exemplos fictícios e sanitizados.
5. Validar qualquer mudança de contrato contra o repositório privado `agente-carreira-ia-core`.
