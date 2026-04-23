# Saida Estruturada Do Core

## Objetivo

Definir a saida da v1 do `agente-carreira-ia-core` para consumo do repositorio publico sem depender de leitura fragil de texto livre.

## Campos Finais Recomendados

| Campo | Tipo | Uso No Publico |
| --- | --- | --- |
| `status` | texto | controla fluxo |
| `resumo_geral` | texto | abre a resposta |
| `veredito` | texto | classifica a leitura final |
| `achados_principais` | lista | mostra pontos fortes e lacunas |
| `sugestoes_priorizadas` | lista | orienta correcoes |
| `perguntas_pendentes` | lista | vazia quando nao houver perguntas essenciais |
| `alertas` | lista opcional | mostra riscos extras, se existirem |
| `proximos_passos` | lista | na v1 deve conter exatamente 1 item |

## Estrutura Minima Recomendada

| Campo | Subcampo | Observacao |
| --- | --- | --- |
| `status` | - | `ok`, `needs_input`, `error` |
| `resumo_geral` | - | sintese curta |
| `veredito` | - | classificacao final do core |
| `achados_principais[]` | `categoria` | `ponto_forte` ou `lacuna_prioritaria` |
| `achados_principais[]` | `titulo` | rotulo curto |
| `achados_principais[]` | `descricao` | explicacao curta |
| `sugestoes_priorizadas[]` | `prioridade` | ordem numerica |
| `sugestoes_priorizadas[]` | `acao` | recomendacao objetiva |
| `perguntas_pendentes[]` | `pergunta` | texto objetivo |
| `alertas[]` | `tipo` | `risco` ou `entrada_incompleta` |
| `alertas[]` | `mensagem` | texto curto |
| `proximos_passos[]` | `acao` | proximo passo minimo |

## Mapeamento Das Secoes Atuais

| Secao Atual Do Core | Campo Contratual |
| --- | --- |
| Diagnostico geral | `resumo_geral` |
| Veredito | `veredito` |
| Pontos fortes | `achados_principais[]` com `categoria=ponto_forte` |
| Lacunas prioritarias | `achados_principais[]` com `categoria=lacuna_prioritaria` |
| Sugestoes priorizadas | `sugestoes_priorizadas[]` |
| Perguntas pendentes | `perguntas_pendentes[]` |
| Proximo passo minimo | `proximos_passos[]` |

## Regras De Uso

- o core continua decidindo o conteudo da avaliacao;
- o repositorio publico consome campos finais, nao secoes soltas;
- o contrato nao carrega prompt, rubrica ou raciocinio interno;
- o publico nao precisa inferir veredito ou perguntas a partir de texto corrido.
- `perguntas_pendentes=[]` deve ser tratado como caso normal;
- `proximos_passos[0]` deve ser usado como passo principal da v1.

## Exemplo De Forma

```json
{
  "status": "ok",
  "resumo_geral": "Curriculo com boa base, mas com impacto pouco explicito.",
  "veredito": "precisa_reforcar_resultados",
  "achados_principais": [
    {
      "categoria": "ponto_forte",
      "titulo": "Direcao profissional clara",
      "descricao": "O objetivo esta coerente com a trajetoria."
    },
    {
      "categoria": "lacuna_prioritaria",
      "titulo": "Baixa evidencia de impacto",
      "descricao": "As experiencias descrevem tarefas, mas pouco resultado."
    }
  ],
  "sugestoes_priorizadas": [
    {
      "prioridade": 1,
      "acao": "Reescrever as experiencias com foco em resultado e contexto."
    }
  ],
  "perguntas_pendentes": [
    {
      "pergunta": "Quais resultados concretos voce teve nas funcoes mais recentes?"
    }
  ],
  "proximos_passos": [
    {
      "acao": "Atualizar primeiro as duas experiencias mais relevantes."
    }
  ]
}
```

## Limite De Seguranca

- nao incluir prompt interno;
- nao incluir rubrica privada;
- nao incluir cadeia de raciocinio;
- nao expor score intermediario ou etapa interna do core.
