import { useState } from "react";

import {
  validateReviewInput,
  type ReviewInputValidationResult,
} from "./review-triage/validate-review-input";
import type { ReviewInput } from "./types/review-input";
import { coreClient } from "./core-client";
import { ReviewForm } from "./components/ReviewForm";
import { buildPublicResult, type PublicReviewResult } from "./presentation/build-public-result";
import { ReviewResult } from "./components/ReviewResult";

export default function App() {
  const [result, setResult] = useState<PublicReviewResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

  function handleReviewSubmit(payload: ReviewInput): ReviewInputValidationResult {
    const validation = validateReviewInput(payload);

    if (!validation.isValid) {
      setIsLoading(false);
      setRequestError("");
      setResult(null);
      return validation;
    }

    setResult(null);
    setIsLoading(true);
    setRequestError("");

    void coreClient
      .reviewResume(payload)
      .then((output) => {
        setResult(buildPublicResult(output));
      })
      .catch(() => {
        setResult(null);
        setRequestError("Nao foi possivel carregar o resultado mock nesta etapa.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    return validation;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 24px",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: "#f6f7fb",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 1px 2px rgba(17, 24, 39, 0.06)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#4b5563",
          }}
        >
          V1 local
        </p>
        <h1
          style={{
            margin: "12px 0 8px",
            fontSize: "32px",
            lineHeight: 1.1,
          }}
        >
          Agente Carreira IA
        </h1>
        <p
          style={{
            margin: "0 0 24px",
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#374151",
          }}
        >
          Coleta inicial da v1 mock-first para revisao de curriculo. Nesta etapa
          a tela ja consome o mock canonico e apresenta o resultado no formato
          publico da v1.
        </p>
        <ReviewForm onSubmit={handleReviewSubmit} />
        {isLoading ? (
          <p style={{ margin: "24px 0 0", color: "#374151" }}>
            Carregando resultado mock...
          </p>
        ) : null}
        {requestError ? (
          <p style={{ margin: "24px 0 0", color: "#b91c1c" }}>{requestError}</p>
        ) : null}
        {result ? <ReviewResult result={result} /> : null}
      </div>
    </main>
  );
}
