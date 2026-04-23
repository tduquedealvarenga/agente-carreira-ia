export default function App() {
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
            margin: 0,
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#374151",
          }}
        >
          Base inicial do prototipo local em Vite + React + TypeScript. A
          proxima etapa adiciona o fluxo mock-first de revisao de curriculo.
        </p>
      </div>
    </main>
  );
}
