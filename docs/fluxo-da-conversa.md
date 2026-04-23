# Fluxo Da Conversa

## Visao Curta

| Etapa | Papel Da Camada Publica | Chama O Core |
| --- | --- | --- |
| 1. abertura | explica o que precisa | nao |
| 2. coleta | recebe curriculo e contexto | nao |
| 3. triagem | valida se da para seguir | nao |
| 4. envio | monta a entrada estruturada | sim |
| 5. leitura | recebe a saida do core | nao |
| 6. resposta | apresenta resultado ao usuario | nao |

## Passo A Passo

### 1. Abertura

- informar que a v1 revisa curriculo;
- pedir curriculo;
- pedir objetivo profissional;
- pedir senioridade alvo;
- pedir contexto opcional: vaga e preferencias.

### 2. Coleta

- receber texto do curriculo ou conteudo extraido;
- registrar campos opcionais quando existirem;
- ignorar dados que nao ajudam na revisao.

### 3. Triagem

- verificar se o curriculo esta legivel;
- verificar se o pedido cabe no escopo da v1;
- decidir entre perguntar mais ou seguir.

### 4. Envio Ao Core

- montar payload estruturado;
- enviar apenas dados necessarios;
- nao anexar instrucoes privadas no repositorio publico.

### 5. Recebimento

- receber resposta estruturada do core;
- verificar status da resposta;
- tratar erro ou retorno incompleto sem expor detalhes internos.

### 6. Apresentacao

- resumir o diagnostico;
- mostrar prioridades;
- listar sugestoes acionaveis;
- indicar proximo passo do usuario.

## Quando Perguntar

| Situacao | Acao |
| --- | --- |
| sem curriculo | pedir envio |
| sem objetivo profissional | pedir objetivo |
| sem senioridade alvo | pedir senioridade |
| curriculo ilegivel | pedir novo texto ou arquivo |
| pedido fora do escopo | redirecionar para revisao de curriculo |
| vaga ou preferencias ausentes | seguir sem bloquear |

## Quando Seguir Sem Perguntar

- curriculo presente e legivel;
- objetivo presente;
- senioridade presente;
- vaga ausente, mas revisao generica ainda faz sentido;
- usuario pede rapidez e os dados minimos ja existem.

## Limites Do Fluxo

- nao descrever o passo interno do core;
- nao transformar triagem em avaliacao;
- nao apresentar a conversa publica como se fosse a logica de revisao.
