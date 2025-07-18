// src/pages/QuizPage.js
import React, { useState } from 'react';
import './QuizPage.css';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [answerData, setAnswerData] = useState({ questionId: '', selectedOption: '', username: 'admin' });
  const [result, setResult] = useState(null);

  const token = localStorage.getItem('token');

  const fetchAllQuestions = async () => {
    const res = await fetch('https://localhost:7030/api/quiz/questions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setQuestions(data);
  };

  const fetchRandomQuestion = async () => {
    const res = await fetch('https://localhost:7030/api/quiz/question/random', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setRandomQuestion(data);
  };

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
