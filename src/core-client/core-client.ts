import type { ReviewInput } from "../types/review-input";
import type { ReviewOutput } from "../types/review-output";

export interface CoreClient {
  reviewResume(payload: ReviewInput): Promise<ReviewOutput>;
}
