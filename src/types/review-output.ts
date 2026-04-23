export type ReviewStatus = "ok" | "needs_input" | "error";

export type ReviewFindingCategory = "ponto_forte" | "lacuna_prioritaria";

export type ReviewAlertType = "risco" | "entrada_incompleta";

export interface ReviewFinding {
  categoria: ReviewFindingCategory;
  titulo: string;
  descricao: string;
}

export interface ReviewSuggestion {
  prioridade: number;
  acao: string;
}

export interface ReviewPendingQuestion {
  pergunta: string;
}

export interface ReviewAlert {
  tipo: ReviewAlertType;
  mensagem: string;
}

export interface ReviewNextStep {
  acao: string;
}

export interface ReviewOutput {
  status: ReviewStatus;
  resumo_geral: string;
  veredito: string;
  achados_principais: ReviewFinding[];
  sugestoes_priorizadas: ReviewSuggestion[];
  perguntas_pendentes: ReviewPendingQuestion[];
  alertas?: ReviewAlert[];
  proximos_passos: ReviewNextStep[];
}
