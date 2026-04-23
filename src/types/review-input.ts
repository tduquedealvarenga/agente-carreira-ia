export type ReviewModule = "revisao_curriculo_v1";

export interface ReviewInput {
  module: ReviewModule;
  request_id: string;
  curriculo_texto: string;
  objetivo_profissional: string;
  senioridade_alvo: string;
  vaga_alvo_texto?: string;
  restricoes_ou_preferencias?: string;
  idioma_resposta?: string;
  observacoes_do_usuario?: string;
}
