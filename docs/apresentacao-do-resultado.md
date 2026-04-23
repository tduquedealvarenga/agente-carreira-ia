# Apresentacao Do Resultado

## Objetivo

Transformar a saida do core em uma resposta clara, util e segura para o usuario final.

## Estrutura Da Resposta

| Bloco | Origem | Funcao |
| --- | --- | --- |
| resumo | core | abrir com leitura geral |
| veredito | core | explicitar a classificacao final |
| prioridades | core | mostrar o que atacar primeiro |
| achados | core | explicar pontos fortes e fracos |
| sugestoes | core | orientar melhoria pratica |
| perguntas pendentes | core | coletar o que ainda falta, se houver |
| proximo passo | core | mostrar a acao minima definida pelo core |
| fechamento | publico | convidar continuidade da conversa |

## Ordem Recomendada

1. resumo curto;
2. veredito;
3. 3 prioridades principais;
4. achados organizados;
5. sugestoes acionaveis;
6. perguntas pendentes, se existirem;
7. convite para proximo ciclo.

## Como A Camada Publica Deve Apresentar

- usar linguagem simples;
- preservar o sentido da saida do core;
- encurtar sem distorcer;
- separar diagnostico de sugestao;
- destacar o que e prioridade agora.
- omitir o bloco de perguntas quando `perguntas_pendentes=[]`;
- apresentar `proximos_passos[0]` como passo principal da v1.

## Como Nao Deve Apresentar

- nao colar resposta tecnica bruta;
- nao mostrar JSON ao usuario final;
- nao citar prompt, rubrica ou cadeia interna;
- nao afirmar criterio que nao veio explicitamente do core;
- nao inventar score publico se o core nao devolver isso como campo final.

## Tratamento De Casos Especiais

| Caso | Acao |
| --- | --- |
| retorno incompleto | pedir nova tentativa ou contexto extra |
| erro do core | informar falha curta e seguir sem detalhe interno |
| pedido de detalhamento | aprofundar o texto, nao a logica privada |

## Limites De Seguranca

- apresentar conclusoes, nao raciocinio interno;
- expor somente campos finais do contrato;
- manter a documentacao publica no nivel de interface e orquestracao.
