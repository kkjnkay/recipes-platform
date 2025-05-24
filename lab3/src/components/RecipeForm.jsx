import React, { useState } from 'react';
import './Form.css';

export default function RecipeForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, time, ingredients, image });
    setTitle(''); setTime(''); setIngredients(''); setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Назва" required />
      <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Час" required />
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Інгредієнти" required />
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="URL фото" required />
      <button type="submit">Додати</button>
    </form>
  );
}