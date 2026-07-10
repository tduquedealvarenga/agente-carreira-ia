# Fluxo Da Conversa

## Objetivo

Descrever o fluxo conversacional da camada pública do `agente-carreira-ia`.

Este arquivo mostra **a ordem das etapas** e **a responsabilidade da camada pública**. As regras detalhadas para decidir entre perguntar, seguir ou interromper ficam em `docs/regras-de-triagem.md`.

## Visão Curta

| Etapa | Papel Da Camada Pública | Chama O Core |
| --- | --- | --- |
| 1. abertura | explica o que a v1 precisa para revisar currículo | não |
| 2. coleta | recebe currículo e contexto mínimo | não |
| 3. triagem | valida se a entrada está pronta para o core | não |
| 4. envio | monta payload estruturado | sim |
| 5. recebimento | recebe saída estruturada do core | não |
| 6. apresentação | apresenta resultado ao usuário | não |

## Passo A Passo

### 1. Abertura

- informar que a v1 revisa currículo;
- pedir currículo;
- pedir objetivo profissional;
- pedir senioridade alvo;
- pedir contexto opcional: vaga, restrições ou preferências.

### 2. Coleta

- receber texto do currículo ou conteúdo extraído;
- registrar campos opcionais quando existirem;
- ignorar dados que não ajudam na revisão;
- não solicitar dados pessoais sensíveis desnecessários.

### 3. Triagem

- verificar se a entrada mínima existe;
- verificar se o pedido cabe no escopo da v1;
- decidir se a conversa deve perguntar mais, seguir para o core ou interromper.

Fonte da verdade desta decisão: `docs/regras-de-triagem.md`.

### 4. Envio Ao Core

- montar payload conforme `docs/contrato-com-o-core.md`;
- enviar apenas dados necessários;
- não anexar prompts, rubricas ou regras privadas;
- não antecipar avaliação na camada pública.

### 5. Recebimento

- receber resposta estruturada do core;
- verificar `status`;
- tratar erro ou retorno incompleto sem expor detalhes internos.

Schema esperado: `docs/saida-estruturada-do-core.md`.

### 6. Apresentação

- transformar a saída final em resposta clara;
- preservar o sentido do core;
- destacar prioridades e próximo passo;
- não exibir payload técnico ao usuário final.

Regras de apresentação: `docs/apresentacao-do-resultado.md`.

## Limites Do Fluxo

- triagem não é avaliação;
- o público não executa lógica avaliativa;
- o público não descreve o passo interno do core;
- o público não apresenta a conversa como se fosse a metodologia privada.
