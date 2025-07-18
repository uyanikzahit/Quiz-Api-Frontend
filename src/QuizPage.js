import React, { useState } from 'react';
import './QuizPage.css';

function QuizPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [answerInput, setAnswerInput] = useState('');
  const [answerId, setAnswerId] = useState('');
  const [checkResult, setCheckResult] = useState('');

  const token = localStorage.getItem('token');

  const fetchAllQuestions = async () => {
    const res = await fetch('https://localhost:7030/api/quiz/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setAllQuestions(data);
  };

  const fetchRandomQuestion = async () => {
    const res = await fetch('https://localhost:7030/api/quiz/random', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setRandomQuestion(data);
  };

  const submitAnswer = async () => {
    const res = await fetch('https://localhost:7030/api/quiz/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        questionId: parseInt(answerId),
        selectedOption: answerInput
      })
    });

    const result = await res.text();
    setCheckResult(result === "true" ? "Cevap Doğru ✅" : "Cevap Yanlış ❌");
  };

  return (
    <div className="quiz-container">
      <div className="section">
        <h2>Tüm Sorular</h2>
        <button onClick={fetchAllQuestions}>Getir</button>
        <ul>
          {allQuestions.map((q) => (
            <li key={q.id}>
              <strong>{q.questionText}</strong>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Rastgele Soru</h2>
        <button onClick={fetchRandomQuestion}>Getir</button>
        {randomQuestion && (
          <div>
            <p><strong>{randomQuestion.questionText}</strong></p>
            <ul>
              {randomQuestion.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="section">
        <h2>Cevap Ver</h2>
        <input
          type="number"
          placeholder="Soru ID"
          value={answerId}
          onChange={(e) => setAnswerId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cevabınız"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
        />
        <button onClick={submitAnswer}>Gönder</button>
        {checkResult && <p>{checkResult}</p>}
      </div>
    </div>
  );
}

export default QuizPage;
