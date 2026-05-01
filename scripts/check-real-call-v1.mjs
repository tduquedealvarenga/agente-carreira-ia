import assert from "node:assert/strict";

import { createRealCoreClient } from "../src/core-client/real-core-client.ts";

const LOCAL_CORE_CLIENT_MODE_ENV_VAR = "AGENTE_CARREIRA_IA_CORE_CLIENT_MODE";
const REQUIRED_API_KEY_ENV_VAR = "OPENAI_API_KEY";

const payload = {
  module: "revisao_curriculo_v1",
  request_id: "check-real-v1",
  curriculo_texto:
    "Profissional com experiencia em suporte, indicadores e rotina com planilhas.",
  objetivo_profissional: "Analista de Dados Junior",
  senioridade_alvo: "Junior",
};

async function loadOpenAIClientConstructor() {
  try {
    const module = await import("openai");
    return module.default;
  } catch (error) {
    const reason =
      error instanceof Error ? error.message : "falha desconhecida ao importar openai";

    throw new Error(
      "OpenAIClient ausente para a chamada real controlada. " +
        "Instale a dependencia `openai` no ambiente local antes de rodar este check. " +
        `Detalhe: ${reason}`,
    );
  }
}

function assertRequiredEnv() {
  const mode = process.env[LOCAL_CORE_CLIENT_MODE_ENV_VAR];
  const apiKey = process.env[REQUIRED_API_KEY_ENV_VAR];

  assert.equal(
    mode,
    "real",
    `Defina ${LOCAL_CORE_CLIENT_MODE_ENV_VAR}=real para validar o modo real.`,
  );

  assert.equal(
    typeof apiKey,
    "string",
    `Defina ${REQUIRED_API_KEY_ENV_VAR} no ambiente local antes da chamada real.`,
  );

  assert.notEqual(
    apiKey?.trim(),
    "",
    `${REQUIRED_API_KEY_ENV_VAR} nao pode estar vazio.`,
  );
}

async function main() {
  assertRequiredEnv();

  const OpenAIClient = await loadOpenAIClientConstructor();
  const client = createRealCoreClient({
    env: process.env,
    OpenAIClient,
  });

  assert.equal(
    process.env[LOCAL_CORE_CLIENT_MODE_ENV_VAR],
    "real",
    "A ativacao local deveria estar em modo real nesta execucao.",
  );

  const output = await client.reviewResume(payload);

  assert.equal(typeof output.status, "string", "status ausente na saida real");
  assert.equal(typeof output.resumo_geral, "string", "resumo_geral ausente na saida real");
  assert.equal(typeof output.veredito, "string", "veredito ausente na saida real");
  assert.ok(Array.isArray(output.achados_principais), "achados_principais invalidos");
  assert.ok(
    Array.isArray(output.sugestoes_priorizadas),
    "sugestoes_priorizadas invalidas",
  );
  assert.ok(
    Array.isArray(output.perguntas_pendentes),
    "perguntas_pendentes invalidas",
  );
  assert.ok(Array.isArray(output.proximos_passos), "proximos_passos invalidos");

  console.log(
    JSON.stringify(
      {
        mode: process.env[LOCAL_CORE_CLIENT_MODE_ENV_VAR],
        status: output.status,
        veredito: output.veredito,
        perguntas_pendentes: output.perguntas_pendentes.length,
        proximo_passo: output.proximos_passos[0]?.acao ?? null,
      },
      null,
      2,
    ),
  );
}

await main();
