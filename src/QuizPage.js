import React, { useState } from "react";

function App() {
  // Sorular ve yüklenme durumu state'leri
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Backend URL'sini .env'den alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Soruları backend'den fetch eden async fonksiyon
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/quiz/questions`);
      if (!response.ok) {
        throw new Error("Soruları alırken bir hata oluştu.");
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Quiz Uygulaması</h1>

      {/* Soruları getir butonu */}
      <button onClick={fetchQuestions}>Tüm Soruları Getir</button>

      {/* Yükleniyor durumu */}
      {loading && <p>Yükleniyor...</p>}

      {/* Sorular listesi */}
      {questions.length > 0 && (
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              {/* Soru metni */}
              <strong>{q.questionText}</strong>
              <ul>
                {/* Seçenekler */}
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
