import assert from "node:assert/strict";

import { createRealCoreClient } from "../src/core-client/real-core-client.ts";

const LOCAL_CORE_CLIENT_MODE_ENV_VAR = "AGENTE_CARREIRA_IA_CORE_CLIENT_MODE";
const REQUIRED_API_KEY_ENV_VAR = "OPENAI_API_KEY";
const CLIENT_TIMEOUT_MS = 30000;
const CLIENT_MAX_RETRIES = 0;
const MAX_OUTPUT_TOKENS = 900;

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

  let technicalObservation = null;
  const OpenAIClient = await loadOpenAIClientConstructor();
  const client = createRealCoreClient({
    env: process.env,
    OpenAIClient,
    clientOptions: {
      timeoutMs: CLIENT_TIMEOUT_MS,
      maxRetries: CLIENT_MAX_RETRIES,
    },
    operationOptions: {
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    },
    onTechnicalObservation: (observation) => {
      technicalObservation = {
        requestId: observation.requestId,
        model: observation.model,
        statusTecnico: observation.statusTecnico,
        durationMs: observation.durationMs,
        responseId: observation.responseId,
        inputTokens: observation.inputTokens,
        outputTokens: observation.outputTokens,
        totalTokens: observation.totalTokens,
      };
    },
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
  assert.notEqual(
    technicalObservation,
    null,
    "observabilidade tecnica ausente na chamada real controlada",
  );

  console.log(JSON.stringify(technicalObservation, null, 2));
}

await main();
