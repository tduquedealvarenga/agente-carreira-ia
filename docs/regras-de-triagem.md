# Regras De Triagem

## Objetivo

Decidir se a camada publica deve perguntar mais, seguir para o core ou interromper o fluxo.

## Regra Base

Triagem nao e avaliacao.  
Triagem so decide se a entrada esta pronta para o core.

## Dados Minimos

| Campo | Regra |
| --- | --- |
| curriculo_texto | obrigatorio |
| objetivo_profissional | obrigatorio |
| senioridade_alvo | obrigatorio |
| vaga_alvo | opcional |
| restricoes_ou_preferencias | opcional |
| observacoes_do_usuario | opcional |

## Tabela De Decisao

| Situacao | Decisao |
| --- | --- |
| curriculo ausente | perguntar |
| curriculo vazio | perguntar |
| curriculo ilegivel | perguntar |
| curriculo curto demais para analise | perguntar |
| objetivo ausente | perguntar |
| senioridade ausente | perguntar |
| vaga ausente | seguir |
| pedido de LinkedIn ou entrevista | interromper e reenquadrar |
| usuario envia excesso de contexto irrelevante | resumir e seguir |

## Quando Perguntar

- faltar dado obrigatorio;
- houver ambiguidade que bloqueia a chamada;
- o material vier quebrado, truncado ou sem corpo;
- o usuario pedir algo fora do escopo e precisar reenquadramento.

## Quando Seguir

- o curriculo estiver legivel;
- a revisao puder ser generica;
- os campos opcionais nao mudarem a possibilidade de analise.

## Perguntas Permitidas

- "Pode enviar o texto do curriculo?"
- "Consegue reenviar o arquivo em texto legivel?"
- "Qual e o objetivo profissional?"
- "Qual senioridade voce quer usar como referencia?"
- "Tem alguma vaga-alvo para usar como referencia?"

## Limites Da Triagem

- nao julgar qualidade do curriculo antes do core;
- nao criar checklist secreto de avaliacao;
- nao revelar criterio interno do core como justificativa publica.
