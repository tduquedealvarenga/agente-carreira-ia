import assert from "node:assert/strict";

import { executeRevisaoCurriculoV1 } from "../../agente-carreira-ia-core/src/modules/revisao-curriculo-v1/execute.ts";
import {
  RealRevisaoCurriculoV1EngineAdapter,
} from "../../agente-carreira-ia-core/src/modules/revisao-curriculo-v1/real-engine-adapter.ts";
import { instantiateRealRevisaoCurriculoV1Client } from "../../agente-carreira-ia-core/src/modules/revisao-curriculo-v1/real-engine-client.ts";
import { composeRealRevisaoCurriculoV1EngineDependencies } from "../../agente-carreira-ia-core/src/modules/revisao-curriculo-v1/real-engine-dependencies.ts";

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

function isRecord(value) {
  return typeof value === "object" && value !== null;
}

function pickString(value, key) {
  if (!isRecord(value)) {
    return null;
  }

  const property = value[key];
  return typeof property === "string" && property.trim() !== ""
    ? property
    : null;
}

function pickNumber(value, key) {
  if (!isRecord(value)) {
    return null;
  }

  const property = value[key];
  return typeof property === "number" ? property : null;
}

function redactSecrets(value) {
  return value
    .replace(/sk-[A-Za-z0-9_-]+/g, "[REDACTED]")
    .replace(/Bearer\s+[A-Za-z0-9._-]+/g, "Bearer [REDACTED]");
}

function sanitizeErrorMessage(error) {
  if (!isRecord(error)) {
    return "Erro interno nao estruturado capturado.";
  }

  const rawMessage = pickString(error, "message");
  if (!rawMessage) {
    return "Erro interno sem mensagem capturada.";
  }

  if (
    /Veredito invalido|Secao obrigatoria|Secao inesperada|output_text|markdown_sections|parser|resposta do motor/i.test(
      rawMessage,
    )
  ) {
    return "Erro interno sanitizado no processamento da resposta do modelo.";
  }

  return redactSecrets(rawMessage);
}

function buildSanitizedObservation(capturedInternalError, technicalObservation) {
  const nestedError = isRecord(capturedInternalError?.error)
    ? capturedInternalError.error
    : null;

  return {
    errorName:
      pickString(capturedInternalError, "name") ??
      capturedInternalError?.constructor?.name ??
      null,
    errorType:
      pickString(capturedInternalError, "type") ??
      pickString(nestedError, "type"),
    errorCode:
      pickString(capturedInternalError, "code") ??
      pickString(nestedError, "code"),
    httpStatus: pickNumber(capturedInternalError, "status"),
    errorMessage: capturedInternalError
      ? sanitizeErrorMessage(capturedInternalError)
      : null,
    requestId: technicalObservation?.requestId ?? payload.request_id,
    model: technicalObservation?.model ?? null,
    durationMs: technicalObservation?.durationMs ?? null,
  };
}

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

  let capturedInternalError = null;
  let technicalObservation = null;
  const OpenAIClient = await loadOpenAIClientConstructor();
  const realClient = instantiateRealRevisaoCurriculoV1Client({
    env: process.env,
    OpenAIClient,
    clientOptions: {
      timeoutMs: CLIENT_TIMEOUT_MS,
      maxRetries: CLIENT_MAX_RETRIES,
    },
    operationOptions: {
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    },
  });

  const engineAdapter = new RealRevisaoCurriculoV1EngineAdapter(
    realClient.config,
    composeRealRevisaoCurriculoV1EngineDependencies({
      client: realClient.client,
    }),
  );

  assert.equal(
    process.env[LOCAL_CORE_CLIENT_MODE_ENV_VAR],
    "real",
    "A ativacao local deveria estar em modo real nesta execucao.",
  );

  const output = await executeRevisaoCurriculoV1(payload, {
    engineAdapter,
    onInternalError: (error) => {
      capturedInternalError = error;
    },
    onTechnicalObservation: (observation) => {
      technicalObservation = {
        requestId: observation.requestId,
        model: observation.model,
        durationMs: observation.durationMs,
      };
    },
  });

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

  if (output.status === "error") {
    assert.notEqual(
      capturedInternalError,
      null,
      "erro interno sanitizado ausente na chamada real controlada",
    );
  }

  assert.notEqual(
    technicalObservation,
    null,
    "observabilidade tecnica ausente na chamada real controlada",
  );

  console.log(
    JSON.stringify(
      buildSanitizedObservation(capturedInternalError, technicalObservation),
      null,
      2,
    ),
  );
}

await main();
