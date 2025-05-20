import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '../components/Form.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/my-recipes');
    } catch (err) {
      alert('Помилка входу: ' + err.message);
    }
  };

  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/my-recipes');
    } catch (err) {
      alert('Помилка Google входу: ' + err.message);
    }
  };

  return (
  <>
    <form onSubmit={handleSubmit} className="form">
      <h2>Вхід</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Увійти</button>
    </form>

    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
      <button type="button" onClick={loginWithGoogle} className="google-btn">
        Увійти через Google
      </button>
    </div>
  </>
  );
}
