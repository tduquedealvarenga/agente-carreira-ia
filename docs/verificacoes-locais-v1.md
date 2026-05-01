# Verificacoes Locais V1

## Objetivo

Aumentar a confiabilidade local da v1 mock-first sem adicionar stack de testes pesada.

## Cobertura Atual

| Item | Tipo | Como validar |
| --- | --- | --- |
| triagem | automatica | `npm run check:v1` |
| builder de apresentacao | automatica | `npm run check:v1` |
| fixture da saida mock | automatica | `npm run check:v1` |
| mock client ativo na UI | manual | `npm run dev` + envio do formulario |
| compilacao da app | automatica | `npm run build` |

## Ordem Recomendada

1. rodar checagem leve:

```bash
npm run check:v1
```

2. validar tipos:

```bash
npm exec tsc --noEmit
```

3. validar build:

```bash
npm run build
```

4. validar fluxo manual do mock:

```bash
npm run dev
```

## Checklist Manual Do Mock

- abrir a tela local;
- deixar um campo obrigatorio vazio e confirmar erro;
- preencher os campos obrigatorios;
- enviar o formulario;
- confirmar loading;
- confirmar que o resultado aparece abaixo.

## Limite Atual

- ainda nao ha testes formais para transporte real;
- ainda nao ha teste automatizado da implementacao real do core-client;
- o mock continua validado principalmente pelo fluxo local ativo.
