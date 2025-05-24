import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MyRecipes from './pages/MyRecipes';
import Categories from './pages/Categories';
import Comments from './pages/Comments';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-recipes" element={
            <ProtectedRoute>
            <MyRecipes />
          </ProtectedRoute>
          } />
          <Route path="/categories" element={<Categories />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;