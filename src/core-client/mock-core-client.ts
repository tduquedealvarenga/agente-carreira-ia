import fixtureOkComPerguntas from "../fixtures/revisao-curriculo.ok-com-perguntas.json";
import fixtureOkSemPerguntas from "../fixtures/revisao-curriculo.ok-sem-perguntas.json";
import type { ReviewInput } from "../types/review-input";
import type { ReviewOutput } from "../types/review-output";
import type { CoreClient } from "./core-client";

export type MockFixtureVariant = "ok-com-perguntas" | "ok-sem-perguntas";

export interface MockCoreClientOptions {
  fixture?: MockFixtureVariant;
}

const fixtures: Record<MockFixtureVariant, ReviewOutput> = {
  "ok-com-perguntas": fixtureOkComPerguntas as ReviewOutput,
  "ok-sem-perguntas": fixtureOkSemPerguntas as ReviewOutput,
};

function cloneReviewOutput(output: ReviewOutput): ReviewOutput {
  return JSON.parse(JSON.stringify(output)) as ReviewOutput;
}

export function createMockCoreClient(
  options: MockCoreClientOptions = {},
): CoreClient {
  const fixture = options.fixture ?? "ok-com-perguntas";

  return {
    async reviewResume(_payload: ReviewInput): Promise<ReviewOutput> {
      return cloneReviewOutput(fixtures[fixture]);
    },
  };
}

export const mockCoreClient = createMockCoreClient();
