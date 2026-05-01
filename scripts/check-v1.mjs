import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildPublicResult } from "../src/presentation/build-public-result.ts";
import { validateReviewInput } from "../src/review-triage/validate-review-input.ts";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(currentDir, "../src/fixtures");

const baseInput = {
  module: "revisao_curriculo_v1",
  request_id: "check-v1",
  curriculo_texto:
    "Profissional com experiencia em suporte e rotina com planilhas e indicadores.",
  objetivo_profissional: "Analista de Dados Junior",
  senioridade_alvo: "Junior",
};

async function readFixture(filename) {
  const content = await readFile(path.join(fixturesDir, filename), "utf8");
  return JSON.parse(content);
}

function assertReviewOutputShape(output, label) {
  assert.equal(typeof output.status, "string", `${label}: status ausente`);
  assert.equal(typeof output.resumo_geral, "string", `${label}: resumo_geral ausente`);
  assert.equal(typeof output.veredito, "string", `${label}: veredito ausente`);
  assert.ok(Array.isArray(output.achados_principais), `${label}: achados_principais invalido`);
  assert.ok(
    Array.isArray(output.sugestoes_priorizadas),
    `${label}: sugestoes_priorizadas invalido`,
  );
  assert.ok(
    Array.isArray(output.perguntas_pendentes),
    `${label}: perguntas_pendentes invalido`,
  );
  assert.ok(Array.isArray(output.proximos_passos), `${label}: proximos_passos invalido`);
  assert.equal(output.proximos_passos.length, 1, `${label}: deve ter 1 proximo passo`);
}

function runTriageChecks() {
  const invalid = validateReviewInput({
    ...baseInput,
    curriculo_texto: " ",
    objetivo_profissional: "",
  });

  assert.equal(invalid.isValid, false, "triagem: entrada invalida deveria falhar");
  assert.deepEqual(
    invalid.issues.map((issue) => issue.field).sort(),
    ["curriculo_texto", "objetivo_profissional"],
    "triagem: campos obrigatorios invalidos nao bateram",
  );

  const valid = validateReviewInput(baseInput);

  assert.equal(valid.isValid, true, "triagem: entrada valida deveria passar");
  assert.equal(valid.issues.length, 0, "triagem: nao deveria haver issues");
}

async function runCoreClientSelectionChecks() {
  const coreClientIndex = await readFile(
    path.resolve(currentDir, "../src/core-client/index.ts"),
    "utf8",
  );

  assert.match(
    coreClientIndex,
    /export const DEFAULT_CORE_CLIENT_MODE: CoreClientMode = "mock";/,
    "core-client: mock deveria continuar como default seguro",
  );
  assert.match(
    coreClientIndex,
    /export const LOCAL_CORE_CLIENT_MODE_ENV_VAR =\s+"AGENTE_CARREIRA_IA_CORE_CLIENT_MODE";/m,
    "core-client: deveria explicitar a env local de selecao controlada",
  );
  assert.match(
    coreClientIndex,
    /export function resolveCoreClientMode\(requestedMode\?: string\): CoreClientMode \{\s+const normalizedMode = requestedMode\?\.trim\(\)\.toLowerCase\(\);\s+return normalizedMode === "real" \? "real" : DEFAULT_CORE_CLIENT_MODE;\s+\}/m,
    "core-client: deveria normalizar a escolha entre mock e real",
  );
  assert.match(
    coreClientIndex,
    /if \(requestedMode === "real" && options\.real\) \{\s+return \{\s+mode: "real",\s+client: createRealCoreClient\(options\.real\),\s+\};\s+\}/m,
    "core-client: deveria ativar o client real apenas quando houver runtime explicito",
  );
  assert.match(
    coreClientIndex,
    /export function createLocallyActivatedCoreClientSelection\(\s+options: CreateLocallyActivatedCoreClientOptions = \{\},\s+\): ResolvedCoreClientSelection \{\s+return createConfiguredCoreClientSelection\(\{\s+\.\.\.options,\s+requestedMode: options\.env\?\.\[LOCAL_CORE_CLIENT_MODE_ENV_VAR\],\s+\}\);\s+\}/m,
    "core-client: deveria existir uma ativacao local controlada baseada em env",
  );
  assert.match(
    coreClientIndex,
    /export const coreClient = createConfiguredCoreClient\(\);/,
    "core-client: a app deveria continuar usando a composicao segura por default",
  );
}

async function runBuilderChecks() {
  const withQuestions = await readFixture("revisao-curriculo.ok-com-perguntas.json");
  const withoutQuestions = await readFixture("revisao-curriculo.ok-sem-perguntas.json");

  assertReviewOutputShape(withQuestions, "fixture com perguntas");
  assertReviewOutputShape(withoutQuestions, "fixture sem perguntas");

  const publicWithQuestions = buildPublicResult(withQuestions);
  const publicWithoutQuestions = buildPublicResult(withoutQuestions);

  assert.equal(
    publicWithQuestions.resumoGeral,
    withQuestions.resumo_geral,
    "builder: resumoGeral deveria espelhar resumo_geral",
  );
  assert.equal(
    publicWithQuestions.veredito,
    withQuestions.veredito,
    "builder: veredito deveria espelhar veredito",
  );
  assert.equal(
    publicWithQuestions.perguntasPendentes.length,
    withQuestions.perguntas_pendentes.length,
    "builder: perguntasPendentes nao bateu no caso com perguntas",
  );
  assert.equal(
    publicWithoutQuestions.perguntasPendentes.length,
    0,
    "builder: perguntasPendentes deveria aceitar lista vazia",
  );
  assert.equal(
    publicWithoutQuestions.proximoPasso,
    withoutQuestions.proximos_passos[0].acao,
    "builder: proximoPasso deveria vir do primeiro item",
  );
}

async function main() {
  runTriageChecks();
  await runCoreClientSelectionChecks();
  await runBuilderChecks();
  console.log("check:v1 ok");
}

await main();
