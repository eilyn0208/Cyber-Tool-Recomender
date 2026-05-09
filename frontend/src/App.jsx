import { useState } from "react";

function App() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const analyzeChallenge = async () => {

    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt
      }),
    });

    const data = await res.json();

    setResponse(data.response);
  };

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>Cyber Tool Recomender</h1>

      <p>
AI-powered cybersecurity assistant for ethical hacking education and CTF methodology guidance.
</p>

      <textarea
        rows="10"
        cols="60"
        placeholder="Example: I found an IP address and want to investigate open ports..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
        }}
      />

      <br /><br />

      <button
        onClick={analyzeChallenge}
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Analyze
      </button>

      <div style={{ marginTop: "30px" }}>
        <h2>AI Recommendations</h2>

        <pre
          style={{
            backgroundColor: "#111827",
            padding: "20px",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </pre>
      </div>
    </div>
  );
}

export default App;