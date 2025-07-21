// src/pages/QuizPage.js
import React, { useState } from 'react';
import './QuizPage.css';

function QuizPage() {
  // Sorular listesini tutar
  const [questions, setQuestions] = useState([]);
  // Rastgele gelen soruyu tutar
  const [randomQuestion, setRandomQuestion] = useState(null);
  // Cevap gönderimi için gerekli veriler: soru id, seçilen cevap ve kullanıcı adı
  const [answerData, setAnswerData] = useState({ questionId: '', selectedOption: '', username: 'admin' });
  // Cevap sonucu ve skor bilgisini tutar
  const [result, setResult] = useState(null);

  // LocalStorage'dan token'ı alıyoruz
  const token = localStorage.getItem('token');

  // Tüm soruları backend'den çeker
  const fetchAllQuestions = async () => {
    const res = await fetch('https://localhost:7030/api/quiz/questions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setQuestions(data);
  };

  // Rastgele bir soru getirir
  const fetchRandomQuestion = async () => {
    const res = await fetch('https://localhost:7030/api/quiz/question/random', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setRandomQuestion(data);
  };

  // Kullanıcının cevabını backend'e gönderir ve sonucu alır
  const submitAnswer = async () => {
    const res = await fetch('https://localhost:7030/api/quiz/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...answerData,
        sentAt: new Date().toISOString()
      })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz Page</h1>

      {/* Tüm soruları listeleyen bölüm */}
      <div className="quiz-section">
        <h2>📚 Tüm Soruları Getir</h2>
        <button onClick={fetchAllQuestions}>Soruları Getir</button>
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              <strong>{q.questionText}</strong>
              <ul>
                {q.options.map((o, idx) => (
                  <li key={idx}>{o}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Rastgele soru getirme bölümü */}
      <div className="quiz-section">
        <h2>🎲 Rastgele Soru</h2>
        <button onClick={fetchRandomQuestion}>Rastgele Soru Getir</button>
        {randomQuestion && (
          <div>
            <p><strong>{randomQuestion.questionText}</strong></p>
            <ul>
              {randomQuestion.options.map((o, idx) => (
                <li key={idx}>{o}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Cevap gönderme bölümü */}
      <div className="quiz-section">
        <h2>📝 Soruyu Cevapla</h2>
        <input
          type="number"
          placeholder="Soru ID"
          value={answerData.questionId}
          onChange={(e) => setAnswerData({ ...answerData, questionId: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Cevap"
          value={answerData.selectedOption}
          onChange={(e) => setAnswerData({ ...answerData, selectedOption: e.target.value })}
        />
        <button onClick={submitAnswer}>Cevabı Gönder</button>

        {/* Cevap sonucu ve skor bilgisi */}
        {result && (
          <p>
            Cevap Doğru mu? <strong>{result.correct ? 'Evet ✅' : 'Hayır ❌'}</strong><br />
            Skor: {result.score}
          </p>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
