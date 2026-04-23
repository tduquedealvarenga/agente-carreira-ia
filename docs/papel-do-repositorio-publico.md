# Papel Do Repositorio Publico

## Escopo Da V1

| Item | Definicao |
| --- | --- |
| modulo | revisao de curriculo |
| papel | orquestracao e apresentacao |
| dependencia | `agente-carreira-ia-core` |
| fora do escopo | LinkedIn, entrevista, frontend complexo |

## O Que Faz

- conduz a conversa com o usuario;
- coleta os dados minimos;
- faz triagem basica da entrada;
- monta a requisicao para o core;
- recebe a saida estruturada do core;
- apresenta o resultado em linguagem clara.

## O Que Nao Faz

- nao executa avaliacao propria de curriculo;
- nao replica prompt, rubrica ou criterio interno;
- nao expoe regras privadas do core;
- nao inventa recomendacao sem base na resposta do core;
- nao amplia o escopo para outros modulos.

## Dados Coletados Antes Do Core

| Campo | Tipo | Regra |
| --- | --- | --- |
| curriculo_texto | obrigatorio | texto ou conteudo extraido |
| objetivo_profissional | obrigatorio | define a direcao da revisao |
| senioridade_alvo | obrigatorio | define o nivel esperado |
| vaga_alvo | opcional | melhora aderencia da analise |
| restricoes_ou_preferencias | opcional | orienta limites da resposta |
| idioma_resposta | opcional | padrao `pt-BR` |
| observacoes_do_usuario | opcional | contexto curto |

## Quando Perguntar

- faltar curriculo;
- faltar objetivo profissional;
- faltar senioridade alvo;
- curriculo vier vazio ou muito incompleto;
- arquivo nao puder ser lido;
- pedido do usuario estiver ambiguo;
- contexto extra for necessario para destravar a chamada.

## Quando Seguir

- houver curriculo legivel;
- objetivo profissional e senioridade alvo estiverem preenchidos;
- vaga puder ficar em branco sem bloquear a analise;
- a camada publica conseguir montar uma entrada valida para o core.

## Regra Central

O repositorio publico organiza a experiencia.  
O core executa a inteligencia de avaliacao.

## Limites De Seguranca

- nao armazenar prompt privado neste repositorio;
- nao documentar rubrica interna como regra publica;
- nao expor raciocinio interno do core como se fosse fluxo do publico;
- tratar a saida do core como produto final de avaliacao;
- documentar apenas contrato, fluxo e apresentacao.
