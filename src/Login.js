import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        localStorage.setItem('token', data.token); // JWT token'ı sakla
        alert("Giriş başarılı!");
        // İleride yönlendirme yapılabilir
      } else {
        setError("Kullanıcı adı veya şifre hatalı.");
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
