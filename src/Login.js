import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // yönlendirme için
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // yönlendirme tanımı

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://localhost:7030/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Giriş başarılı, token: ", data.token);
        localStorage.setItem('token', data.token);
        navigate("/quiz");
      } else {
        setError("Kullanıcı adı veya şifre hatalı.");
        console.log("Giriş hatası:", response.status);
      }

    } catch (error) {
      setError("Sunucuya bağlanılamadı.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Giriş Yap</h2>

        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Giriş Yap</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
