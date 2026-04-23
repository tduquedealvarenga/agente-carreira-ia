import type { ReviewInput } from "../types/review-input";

export type ReviewInputField =
  | "curriculo_texto"
  | "objetivo_profissional"
  | "senioridade_alvo";

export interface ReviewInputIssue {
  field: ReviewInputField;
  message: string;
}

export interface ReviewInputValidationResult {
  isValid: boolean;
  issues: ReviewInputIssue[];
}

const requiredFieldMessages: Record<ReviewInputField, string> = {
  curriculo_texto: "Pode enviar o texto do curriculo?",
  objetivo_profissional: "Qual e o objetivo profissional?",
  senioridade_alvo: "Qual senioridade voce quer usar como referencia?",
};

function isBlank(value: string | undefined): boolean {
  return typeof value !== "string" || value.trim().length === 0;
}

export function validateReviewInput(
  input: ReviewInput,
): ReviewInputValidationResult {
  const issues: ReviewInputIssue[] = [];

  for (const field of Object.keys(requiredFieldMessages) as ReviewInputField[]) {
    if (isBlank(input[field])) {
      issues.push({
        field,
        message: requiredFieldMessages[field],
      });
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
