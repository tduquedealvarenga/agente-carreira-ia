import type { CoreClient } from "./core-client";
import {
  createMockCoreClient,
  mockCoreClient,
  type MockCoreClientOptions,
} from "./mock-core-client";
import {
  createRealCoreClient,
  type RealCoreClientOptions,
} from "./real-core-client";

export type CoreClientMode = "mock" | "real";
export const LOCAL_CORE_CLIENT_MODE_ENV_VAR =
  "AGENTE_CARREIRA_IA_CORE_CLIENT_MODE";

export interface CreateCoreClientOptions {
  mode?: CoreClientMode;
  mock?: MockCoreClientOptions;
  real?: RealCoreClientOptions;
}

export interface CreateConfiguredCoreClientOptions
  extends Omit<CreateCoreClientOptions, "mode"> {
  requestedMode?: string;
}

export interface LocalCoreClientRuntimeEnv {
  [LOCAL_CORE_CLIENT_MODE_ENV_VAR]?: string | undefined;
  [key: string]: string | undefined;
}

export interface CreateLocallyActivatedCoreClientOptions
  extends Omit<CreateConfiguredCoreClientOptions, "requestedMode"> {
  env?: LocalCoreClientRuntimeEnv;
}

export interface ResolvedCoreClientSelection {
  mode: CoreClientMode;
  client: CoreClient;
}

export const DEFAULT_CORE_CLIENT_MODE: CoreClientMode = "mock";

export function resolveCoreClientMode(requestedMode?: string): CoreClientMode {
  const normalizedMode = requestedMode?.trim().toLowerCase();
  return normalizedMode === "real" ? "real" : DEFAULT_CORE_CLIENT_MODE;
}

export function createCoreClient(
  options: CreateCoreClientOptions = {},
): CoreClient {
  const mode = options.mode ?? DEFAULT_CORE_CLIENT_MODE;

  if (mode === "real") {
    return createRealCoreClient(options.real);
  }

  if (options.mock) {
    return createMockCoreClient(options.mock);
  }

  return mockCoreClient;
}

export function createConfiguredCoreClientSelection(
  options: CreateConfiguredCoreClientOptions = {},
): ResolvedCoreClientSelection {
  const requestedMode = resolveCoreClientMode(options.requestedMode);

  if (requestedMode === "real" && options.real) {
    return {
      mode: "real",
      client: createRealCoreClient(options.real),
    };
  }

  if (options.mock) {
    return {
      mode: "mock",
      client: createMockCoreClient(options.mock),
    };
  }

  return {
    mode: "mock",
    client: mockCoreClient,
  };
}

export function createConfiguredCoreClient(
  options: CreateConfiguredCoreClientOptions = {},
): CoreClient {
  return createConfiguredCoreClientSelection(options).client;
}

export function createLocallyActivatedCoreClientSelection(
  options: CreateLocallyActivatedCoreClientOptions = {},
): ResolvedCoreClientSelection {
  return createConfiguredCoreClientSelection({
    ...options,
    requestedMode: options.env?.[LOCAL_CORE_CLIENT_MODE_ENV_VAR],
  });
}

export function createLocallyActivatedCoreClient(
  options: CreateLocallyActivatedCoreClientOptions = {},
): CoreClient {
  return createLocallyActivatedCoreClientSelection(options).client;
}

export const coreClient = createConfiguredCoreClient();
