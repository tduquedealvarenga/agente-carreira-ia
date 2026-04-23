import type {
  ReviewFinding,
  ReviewOutput,
  ReviewPendingQuestion,
  ReviewSuggestion,
} from "../types/review-output";

export interface PublicReviewResult {
  resumoGeral: string;
  veredito: string;
  achados: ReviewFinding[];
  sugestoes: ReviewSuggestion[];
  perguntasPendentes: ReviewPendingQuestion[];
  proximoPasso: string;
}

export function buildPublicResult(output: ReviewOutput): PublicReviewResult {
  return {
    resumoGeral: output.resumo_geral,
    veredito: output.veredito,
    achados: output.achados_principais,
    sugestoes: output.sugestoes_priorizadas,
    perguntasPendentes: output.perguntas_pendentes,
    proximoPasso: output.proximos_passos[0]?.acao ?? "",
  };
}
