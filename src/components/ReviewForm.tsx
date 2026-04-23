import { useState } from "react";
import type { FormEvent } from "react";

import type { ReviewInput } from "../types/review-input";
import type {
  ReviewInputIssue,
  ReviewInputValidationResult,
} from "../review-triage/validate-review-input";

interface ReviewFormProps {
  onSubmit: (payload: ReviewInput) => ReviewInputValidationResult;
}

interface ReviewFormState {
  curriculo_texto: string;
  objetivo_profissional: string;
  senioridade_alvo: string;
  vaga_alvo_texto: string;
}

const initialFormState: ReviewFormState = {
  curriculo_texto: "",
  objetivo_profissional: "",
  senioridade_alvo: "",
  vaga_alvo_texto: "",
};

function buildIssueMap(issues: ReviewInputIssue[]): Partial<Record<keyof ReviewFormState, string>> {
  return issues.reduce<Partial<Record<keyof ReviewFormState, string>>>(
    (accumulator, issue) => {
      accumulator[issue.field] = issue.message;
      return accumulator;
    },
    {},
  );
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [formState, setFormState] = useState<ReviewFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ReviewFormState, string>>
  >({});
  const [submitMessage, setSubmitMessage] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: ReviewInput = {
      module: "revisao_curriculo_v1",
      request_id: `local-${Date.now()}`,
      curriculo_texto: formState.curriculo_texto,
      objetivo_profissional: formState.objetivo_profissional,
      senioridade_alvo: formState.senioridade_alvo,
      vaga_alvo_texto: formState.vaga_alvo_texto.trim(),
    };

    const validation = onSubmit(payload);
    const nextErrors = buildIssueMap(validation.issues);

    setFieldErrors(nextErrors);
    setSubmitMessage(
      validation.isValid
        ? "Entrada minima pronta para seguir na proxima etapa."
        : "Preencha os campos obrigatorios para continuar.",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "20px",
      }}
    >
      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="curriculo_texto" style={{ fontWeight: 600 }}>
          Curriculo
        </label>
        <textarea
          id="curriculo_texto"
          value={formState.curriculo_texto}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              curriculo_texto: event.target.value,
            }))
          }
          rows={10}
          placeholder="Cole aqui o texto do curriculo."
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            font: "inherit",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        {fieldErrors.curriculo_texto ? (
          <span style={{ color: "#b91c1c", fontSize: "14px" }}>
            {fieldErrors.curriculo_texto}
          </span>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="objetivo_profissional" style={{ fontWeight: 600 }}>
          Objetivo profissional
        </label>
        <input
          id="objetivo_profissional"
          type="text"
          value={formState.objetivo_profissional}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              objetivo_profissional: event.target.value,
            }))
          }
          placeholder="Ex.: Analista de Dados Junior"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            font: "inherit",
            boxSizing: "border-box",
          }}
        />
        {fieldErrors.objetivo_profissional ? (
          <span style={{ color: "#b91c1c", fontSize: "14px" }}>
            {fieldErrors.objetivo_profissional}
          </span>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="senioridade_alvo" style={{ fontWeight: 600 }}>
          Senioridade alvo
        </label>
        <input
          id="senioridade_alvo"
          type="text"
          value={formState.senioridade_alvo}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              senioridade_alvo: event.target.value,
            }))
          }
          placeholder="Ex.: Junior"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            font: "inherit",
            boxSizing: "border-box",
          }}
        />
        {fieldErrors.senioridade_alvo ? (
          <span style={{ color: "#b91c1c", fontSize: "14px" }}>
            {fieldErrors.senioridade_alvo}
          </span>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="vaga_alvo_texto" style={{ fontWeight: 600 }}>
          Vaga alvo (opcional)
        </label>
        <textarea
          id="vaga_alvo_texto"
          value={formState.vaga_alvo_texto}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              vaga_alvo_texto: event.target.value,
            }))
          }
          rows={4}
          placeholder="Cole a descricao da vaga, se quiser contextualizar."
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            font: "inherit",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          type="submit"
          style={{
            border: 0,
            borderRadius: "8px",
            padding: "12px 16px",
            font: "inherit",
            fontWeight: 600,
            background: "#111827",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Validar entrada
        </button>
        <span style={{ color: "#4b5563", fontSize: "14px" }}>
          {submitMessage}
        </span>
      </div>
    </form>
  );
}
