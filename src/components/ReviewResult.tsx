import type { PublicReviewResult } from "../presentation/build-public-result";

interface ReviewResultProps {
  result: PublicReviewResult;
}

function sectionTitleStyle() {
  return {
    margin: 0,
    fontSize: "18px",
    lineHeight: 1.3,
  } as const;
}

export function ReviewResult({ result }: ReviewResultProps) {
  return (
    <section
      style={{
        display: "grid",
        gap: "24px",
        marginTop: "32px",
        paddingTop: "24px",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div style={{ display: "grid", gap: "8px" }}>
        <h2 style={sectionTitleStyle()}>Resumo geral</h2>
        <p style={{ margin: 0, color: "#374151", lineHeight: 1.6 }}>
          {result.resumoGeral}
        </p>
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <h2 style={sectionTitleStyle()}>Veredito</h2>
        <p style={{ margin: 0, color: "#111827", fontWeight: 600 }}>
          {result.veredito}
        </p>
      </div>

      <div style={{ display: "grid", gap: "12px" }}>
        <h2 style={sectionTitleStyle()}>Achados principais</h2>
        <div style={{ display: "grid", gap: "12px" }}>
          {result.achados.map((achado, index) => (
            <article
              key={`${achado.categoria}-${achado.titulo}-${index}`}
              style={{
                display: "grid",
                gap: "6px",
                padding: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "#f9fafb",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color:
                    achado.categoria === "ponto_forte" ? "#166534" : "#9a3412",
                }}
              >
                {achado.categoria === "ponto_forte"
                  ? "Ponto forte"
                  : "Lacuna prioritaria"}
              </span>
              <strong>{achado.titulo}</strong>
              <p style={{ margin: 0, color: "#374151", lineHeight: 1.6 }}>
                {achado.descricao}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: "12px" }}>
        <h2 style={sectionTitleStyle()}>Sugestoes priorizadas</h2>
        <ol
          style={{
            margin: 0,
            paddingLeft: "20px",
            display: "grid",
            gap: "10px",
            color: "#374151",
            lineHeight: 1.6,
          }}
        >
          {result.sugestoes.map((sugestao) => (
            <li key={`${sugestao.prioridade}-${sugestao.acao}`}>
              {sugestao.acao}
            </li>
          ))}
        </ol>
      </div>

      {result.perguntasPendentes.length > 0 ? (
        <div style={{ display: "grid", gap: "12px" }}>
          <h2 style={sectionTitleStyle()}>Perguntas pendentes</h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              display: "grid",
              gap: "10px",
              color: "#374151",
              lineHeight: 1.6,
            }}
          >
            {result.perguntasPendentes.map((item, index) => (
              <li key={`${item.pergunta}-${index}`}>{item.pergunta}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div style={{ display: "grid", gap: "8px" }}>
        <h2 style={sectionTitleStyle()}>Proximo passo</h2>
        <p style={{ margin: 0, color: "#111827", fontWeight: 600 }}>
          {result.proximoPasso}
        </p>
      </div>
    </section>
  );
}
