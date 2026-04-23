# Exemplo De Troca Com O Core

## Objetivo

Fixture canonico da v1 para contrato, teste e implementacao do `agente-carreira-ia`.

## Caso Ficticio

| Campo | Valor |
| --- | --- |
| perfil | suporte tecnico com contato com planilhas e indicadores |
| objetivo | Analista de Dados Junior |
| senioridade | Junior |
| vaga alvo | nao informada |

## Exemplo De Entrada Minima

```json
{
  "module": "revisao_curriculo_v1",
  "request_id": "req_demo_curriculo_001",
  "curriculo_texto": "Profissional com 3 anos em suporte tecnico. Atendeu usuarios internos, registrou chamados, atualizou planilhas de acompanhamento e consolidou indicadores mensais de atendimento.",
  "objetivo_profissional": "Analista de Dados Junior",
  "senioridade_alvo": "Junior",
  "vaga_alvo_texto": "",
  "restricoes_ou_preferencias": "Nao inventar metricas. Priorizar orientacoes praticas.",
  "idioma_resposta": "pt-BR"
}
```

## Exemplo De Saida Estruturada

```json
{
  "status": "ok",
  "resumo_geral": "Curriculo com base operacional consistente e contato inicial com indicadores, mas ainda comunica pouco a transicao para dados.",
  "veredito": "Promissor, com lacunas claras para Analista de Dados Junior.",
  "achados_principais": [
    {
      "categoria": "ponto_forte",
      "titulo": "Base real de operacao",
      "descricao": "A experiencia mostra rotina profissional concreta com atendimento e organizacao de informacoes."
    },
    {
      "categoria": "ponto_forte",
      "titulo": "Contato com planilhas e indicadores",
      "descricao": "Ja existe um ponto de partida coerente com a transicao para dados."
    },
    {
      "categoria": "lacuna_prioritaria",
      "titulo": "Objetivo pouco traduzido no curriculo",
      "descricao": "A direcao para dados ainda nao aparece com clareza suficiente no posicionamento."
    },
    {
      "categoria": "lacuna_prioritaria",
      "titulo": "Impacto pouco explicitado",
      "descricao": "As atividades aparecem mais como tarefas do que como resultados observaveis."
    }
  ],
  "sugestoes_priorizadas": [
    {
      "prioridade": 1,
      "acao": "Reescrever o resumo profissional para conectar a experiencia em suporte com a meta de atuar com dados."
    },
    {
      "prioridade": 2,
      "acao": "Detalhar melhor quais planilhas, indicadores ou rotinas de analise ja fizeram parte da experiencia."
    },
    {
      "prioridade": 3,
      "acao": "Trocar descricoes genericas de atividade por formulacoes que mostrem contexto, contribuicao e efeito pratico."
    }
  ],
  "perguntas_pendentes": [
    {
      "pergunta": "Quais ferramentas ou recursos de dados voce ja usou, mesmo que em nivel inicial?"
    }
  ],
  "proximos_passos": [
    {
      "acao": "Atualizar primeiro o resumo profissional antes de revisar as experiencias."
    }
  ]
}
```

## Variacao Curta Sem Perguntas Pendentes

### Caso Ficticio

| Campo | Valor |
| --- | --- |
| perfil | assistente administrativo com resultados mais claros no texto |
| objetivo | Analista Administrativo Junior |
| senioridade | Junior |
| vaga alvo | nao informada |

### Exemplo De Entrada Minima

```json
{
  "module": "revisao_curriculo_v1",
  "request_id": "req_demo_curriculo_002",
  "curriculo_texto": "Profissional com 2 anos em rotinas administrativas. Organizou documentos, atualizou planilhas de controle, acompanhou prazos internos e apoiou a consolidacao de relatorios operacionais.",
  "objetivo_profissional": "Analista Administrativo Junior",
  "senioridade_alvo": "Junior",
  "vaga_alvo_texto": "",
  "restricoes_ou_preferencias": "Resposta direta e pratica.",
  "idioma_resposta": "pt-BR"
}
```

### Exemplo De Saida Estruturada

```json
{
  "status": "ok",
  "resumo_geral": "Curriculo com direcao profissional coerente e boa base administrativa, mas ainda com espaco para reforcar impacto e diferenciar melhor as contribuicoes.",
  "veredito": "Promissor, com ajustes pontuais para Analista Administrativo Junior.",
  "achados_principais": [
    {
      "categoria": "ponto_forte",
      "titulo": "Direcao profissional consistente",
      "descricao": "A experiencia apresentada conversa com o objetivo informado."
    },
    {
      "categoria": "ponto_forte",
      "titulo": "Rotina operacional bem identificada",
      "descricao": "As atividades mostram familiaridade com controle, organizacao e acompanhamento de processos."
    },
    {
      "categoria": "lacuna_prioritaria",
      "titulo": "Resultados pouco destacados",
      "descricao": "O texto ainda enfatiza tarefas mais do que contribuicoes percebidas."
    }
  ],
  "sugestoes_priorizadas": [
    {
      "prioridade": 1,
      "acao": "Reescrever as experiencias mais relevantes com foco em contribuicao pratica e efeito no fluxo administrativo."
    },
    {
      "prioridade": 2,
      "acao": "Dar mais destaque a controles, relatorios e rotinas que reforcem prontidao para a funcao alvo."
    },
    {
      "prioridade": 3,
      "acao": "Enxugar descricoes repetitivas para melhorar clareza e leitura."
    }
  ],
  "perguntas_pendentes": [],
  "proximos_passos": [
    {
      "acao": "Revisar primeiro as duas experiencias mais recentes para destacar contribuicoes concretas."
    }
  ]
}
```

## Notas De Uso

- `perguntas_pendentes` usa o formato final da v1;
- a variacao curta usa `perguntas_pendentes=[]` como caso normal;
- `proximos_passos` contem exatamente 1 item;
- `alertas` foi omitido neste fixture porque e opcional.
