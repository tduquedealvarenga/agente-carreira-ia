# Visão pública do produto — Agente Carreira IA

Este documento apresenta a visão pública e sanitizada do produto.

Ele descreve a camada pública do projeto sem expor lógica sensível, estratégia comercial, prompts internos, réguas de avaliação ou critérios detalhados do núcleo privado.

## Escopo público

O repositório `agente-carreira-ia` é responsável por:

- coletar entrada estruturada;
- conduzir triagem básica;
- montar a chamada para o core;
- receber saída estruturada;
- apresentar o resultado ao usuário final;
- manter exemplos fictícios e seguros;
- documentar contratos públicos.

O repositório público não é responsável por executar a inteligência avaliativa.

## Fluxo de alto nível

| Etapa | Descrição |
|---|---|
| Entrada estruturada | Coleta currículo, objetivo profissional e contexto mínimo necessário |
| Triagem pública | Verifica se os dados mínimos existem e se o pedido cabe na v1 |
| Análise pelo core | O núcleo privado executa a avaliação conforme regras internas não expostas |
| Apresentação | O público transforma a saída final em resposta clara ao usuário |

## Propósito

Apoiar profissionais na leitura crítica de seus materiais de carreira, transformando informações curriculares em devolutivas mais claras, estruturadas e acionáveis.

## Usuário atendido

- Profissionais revisando currículo;
- pessoas em reposicionamento ou candidatura;
- usuários que precisam entender pontos fortes, lacunas e riscos de percepção;
- usuários que desejam uma devolutiva organizada antes de reescrever o currículo.

## Entrega pública

Este repositório expõe:

- camada de entrada e triagem;
- contrato esperado entre interface pública e núcleo privado;
- estrutura de apresentação do resultado ao usuário;
- documentação de limites e responsabilidades.

## Responsabilidade pública

A camada pública deve:

- não reproduzir prompts, critérios, réguas ou regras internas do core;
- garantir que a troca com o núcleo privado seja estável e previsível;
- priorizar clareza, rastreabilidade e separação de responsabilidades;
- tratar exemplos públicos como fictícios, anonimizados ou sanitizados.

## Privacidade e dados

Currículos podem conter dados pessoais e profissionais sensíveis.

Por isso, o projeto deve:

- minimizar coleta;
- evitar exposição desnecessária;
- não usar exemplos reais sem anonimização forte;
- evitar persistência indevida de dados;
- manter limites claros sobre uso e apresentação das informações.

## Limites declarados

O produto não promete:

- contratação;
- entrevista;
- recolocação profissional;
- decisão humana de recrutadores ou gestores;
- exposição integral dos critérios internos de avaliação.

## Artefato visual

A versão visual em HTML fica em:

```text
docs/assets/visao-produto.html
```

Esse HTML é um artefato de apresentação, não a fonte canônica da documentação.
