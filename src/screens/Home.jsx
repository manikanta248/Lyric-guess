import { useState } from "react";

export default function SongGuessGame() {
  const [snippet, setSnippet] = useState("");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSongTitle,setCurrentSongTitle] = useState("")

  const getSnippet = async () => {
    setLoading(true);
    setResult("");
    setGuess("");
    
    try {
      const response = await fetch("https://lyric-guess-backend.onrender.com/snippet");
      const data = await response.json();
      setSnippet(data.snippet);
      setCurrentSongTitle(data.currentSongTitle)
      
    } catch (error) {
      setSnippet("Error loading snippet.");
      console.error("Error fetching snippet:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkGuess = async () => {
    const response = await fetch("https://lyric-guess-backend.onrender.com/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess,currentSongTitle }),
    });
    const data = await response.json();
    setResult(data.correct ? "✅ Correct! 🎉" : `❌ Wrong! The correct song was: "${data.correctTitle}"`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎵 Guess the Song</h1>
        <p style={styles.snippet}>{snippet ? `"${snippet}"` : "Click 'New Snippet' to start!"}</p>

        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter song name"
          style={styles.input}
        />

        <div style={styles.buttonContainer}>
          <button 
            onClick={checkGuess} 
            disabled={!snippet}
            style={snippet ? styles.checkButton : styles.disabledButton}
          >
            Check
          </button>

          <button 
            onClick={getSnippet} 
            disabled={loading}
            style={loading ? styles.disabledButton : styles.newSnippetButton}
          >
            {loading ? "Loading..." : "New Snippet"}
          </button>
        </div>

        {result && <p style={styles.result}>{result}</p>}
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  snippet: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "15px",
    outline: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  checkButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    flex: 1,
    marginRight: "5px",
  },
  newSnippetButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    flex: 1,
    marginLeft: "5px",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    color: "#666",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "not-allowed",
    flex: 1,
  },
  result: {
    marginTop: "15px",
    fontWeight: "bold",
    color: "#333",
  },
};

