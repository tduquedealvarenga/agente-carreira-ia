import type { ReviewInput } from "../types/review-input";
import type { ReviewOutput } from "../types/review-output";
import type { CoreClient } from "./core-client";

const CORE_REAL_ENGINE_CLIENT_MODULE =
  "../../../agente-carreira-ia-core/src/modules/revisao-curriculo-v1/real-engine-client.ts";

export interface RealCoreClientRuntimeEnv {
  [key: string]: string | undefined;
}

export interface RealCoreClientOpenAIClientOptions {
  apiKey: string;
  timeout: number;
  maxRetries: number;
}

export interface RealCoreClientOpenAIClient {
  new (options: RealCoreClientOpenAIClientOptions): unknown;
}

export interface RealCoreClientSdkOptions {
  timeoutMs?: number;
  maxRetries?: number;
}

export interface RealCoreClientOperationOptions {
  maxOutputTokens?: number;
}

export interface RealCoreClientOptions {
  env?: RealCoreClientRuntimeEnv;
  provider?: "openai";
  model?: string;
  apiKeyEnvVar?: string;
  OpenAIClient?: RealCoreClientOpenAIClient;
  clientOptions?: RealCoreClientSdkOptions;
  operationOptions?: RealCoreClientOperationOptions;
}

type RunRevisaoCurriculoV1Module = (
  input: ReviewInput,
) => Promise<ReviewOutput>;

async function createRunModule(
  options: RealCoreClientOptions,
): Promise<RunRevisaoCurriculoV1Module> {
  const coreModule = (await import(
    CORE_REAL_ENGINE_CLIENT_MODULE
  )) as {
    createRevisaoCurriculoV1ModuleWithInstantiatedRealClient: (
      options?: RealCoreClientOptions,
    ) => RunRevisaoCurriculoV1Module;
  };

  return coreModule.createRevisaoCurriculoV1ModuleWithInstantiatedRealClient(
    options,
  );
}

export function createRealCoreClient(
  options: RealCoreClientOptions = {},
): CoreClient {
  let runModulePromise: Promise<RunRevisaoCurriculoV1Module> | null = null;

  function getRunModule(): Promise<RunRevisaoCurriculoV1Module> {
    runModulePromise ??= createRunModule(options);
    return runModulePromise;
  }

  return {
    async reviewResume(payload: ReviewInput): Promise<ReviewOutput> {
      const runModule = await getRunModule();
      return runModule(payload);
    },
  };
}
