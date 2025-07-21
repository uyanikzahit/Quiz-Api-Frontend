import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sayfa yönlendirme için kullanılır
import './Login.css';

function Login() {
  // Kullanıcı adı, şifre ve hata mesajı için state değişkenleri
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Yönlendirme fonksiyonu

  
  const handleLogin = async (e) => {
    e.preventDefault();  
    setError('');        

    try {
      // Backend'e login isteği gönderilir
      const response = await fetch('https://localhost:7030/api/auth/login', {
        method: 'POST',                    
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ username, password }),     // Kullanıcı adı ve şifre JSON'a çevrilir
      });

      if (response.ok) {                     
        const data = await response.json(); // Gelen yanıt JSON formatında alınır
        console.log("Giriş başarılı, token: ", data.token);
        localStorage.setItem('token', data.token);  // Token localStorage'a kaydedilir
        navigate("/quiz");                   // Başarılı giriş sonrası quiz sayfasına yönlendirilir
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
    <div className="login-container">    {/* Sayfa ortasında giriş kutusunu tutan konteyner */}
      <form className="login-box" onSubmit={handleLogin}> {/* Giriş formu */}
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
