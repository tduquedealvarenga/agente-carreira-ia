# Contrato Com O Core

## Objetivo

Definir a troca minima entre `agente-carreira-ia` e `agente-carreira-ia-core` sem expor a logica privada.

## Entrada Enviada Ao Core

| Campo | Obrigatorio | Observacao |
| --- | --- | --- |
| `module` | sim | valor fixo: `revisao_curriculo_v1` |
| `request_id` | sim | id da requisicao publica |
| `curriculo_texto` | sim | texto consolidado para analise |
| `objetivo_profissional` | sim | objetivo informado pelo usuario |
| `senioridade_alvo` | sim | nivel usado como referencia |
| `vaga_alvo_texto` | nao | pode vir vazio |
| `restricoes_ou_preferencias` | nao | limites ou preferencias do usuario |
| `idioma_resposta` | nao | padrao `pt-BR` |
| `observacoes_do_usuario` | nao | observacoes extras, se existirem |

## Regras Da Entrada

- enviar dados do usuario, nao heuristicas do publico;
- nao enviar prompt do repositorio publico como parte do contrato;
- nao tentar antecipar avaliacao com regras proprias;
- normalizar nomes de campo e formato.

## Saida Esperada Do Core

| Campo | Papel Na Camada Publica |
| --- | --- |
| `status` | validar sucesso ou erro |
| `resumo_geral` | abrir a resposta ao usuario |
| `veredito` | classificar a leitura final |
| `achados_principais` | listar pontos fortes e lacunas |
| `sugestoes_priorizadas` | orientar melhoria |
| `perguntas_pendentes` | decidir se a conversa precisa continuar |
| `alertas` | mostrar riscos extras, se existirem |
| `proximos_passos` | fechar com acao pratica |

Ver estrutura detalhada em `docs/saida-estruturada-do-core.md`.

## Tratamento De Resposta

- se `status=ok`, apresentar o conteudo ao usuario;
- se `status=needs_input`, voltar para coleta com pergunta objetiva;
- se `status=error`, informar falha sem expor detalhes internos.

## Regras Da Saida

- `veredito` deve vir como campo proprio;
- `perguntas_pendentes` deve vir como campo proprio;
- `perguntas_pendentes` pode vir como lista vazia sem tratamento especial;
- `alertas` e opcional na v1;
- `proximos_passos` deve conter exatamente 1 item na v1;
- a camada publica nao deve inferir esses campos a partir de texto livre.

## O Que O Publico Nao Deve Enviar

- prompt interno;
- rubrica privada;
- score intermediario;
- cadeia de raciocinio;
- instrucoes sobre como o core deve pensar.

## O Que O Publico Nao Deve Exibir

- payload interno completo do core;
- mensagens tecnicas do motor;
- nomes de prompts, versoes privadas ou regras sigilosas.
