import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Navbar.css';

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Головна</Link></li>
          <li><Link to="/my-recipes">Мої рецепти</Link></li>
          <li><Link to="/categories">Категорії</Link></li>
          <li><Link to="/comments">Коментарі</Link></li>

          {user ? (
            <>
              <li style={{ marginLeft: 'auto', color: 'white' }}>
                👋 {user.email}
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">Вийти</button>
              </li>
            </>
          ) : (
            <>
              <li style={{ marginLeft: 'auto' }}><Link to="/login">Вхід</Link></li>
              <li><Link to="/register">Реєстрація</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}