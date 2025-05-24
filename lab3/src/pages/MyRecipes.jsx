import React, { useState, useEffect } from 'react';
import './MyRecipes.css';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');

  // ✅ 1. ЗАВАНТАЖЕННЯ РЕЦЕПТІВ з сервера
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Помилка при завантаженні:', err));
  }, []);

  // ✅ 2. ДОДАВАННЯ РЕЦЕПТУ через POST
  const addNewRecipe = () => {
    if (!title || !time || !ingredients || !image) {
      alert('Будь ласка, заповніть усі поля.');
      return;
    }

    const newRecipe = { title, time, ingredients, image };

    fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    })
      .then(res => res.json())
      .then(() => {
        setTitle('');
        setTime('');
        setIngredients('');
        setImage('');
        // 🔄 оновлюємо список після додавання
        return fetch('http://localhost:5000/api/recipes')
          .then(res => res.json())
          .then(data => setRecipes(data));
      })
      .catch(err => console.error('Помилка при додаванні:', err));
  };

  return (
    <main>
      <h1>Мої рецепти</h1>

      <div id="add-recipe-form">
        <h2>Додати новий рецепт</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Назва рецепту" />
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Час приготування" />
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Інгредієнти"></textarea>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Посилання на фото (URL)" />
        <button onClick={addNewRecipe}>Додати</button>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <article key={index} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>Час приготування: {recipe.time}</p>
            <p>Інгредієнти: {recipe.ingredients}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
