import React, { useState, useEffect } from 'react';
import './MyRecipes.css';
import { getAuth } from 'firebase/auth';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
  const auth = getAuth();
  const unsubscribe = auth.onAuthStateChanged(currentUser => {
    if (currentUser) {
      fetch(`http://localhost:5000/api/recipes?uid=${currentUser.uid}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setRecipes(data);
          } else {
            console.error('⚠ Очікувався масив, отримано:', data);
            setRecipes([]);
          }
        })
        .catch(err => {
          console.error('❌ Помилка при завантаженні рецептів:', err);
          setRecipes([]);
        });
    }
  });

  return () => unsubscribe();
}, []);

  const addNewRecipe = () => {
    if (!user) {
      alert('Спочатку увійдіть у свій акаунт.');
      return;
    }

    if (!title || !time || !ingredients || !image) {
      alert('Будь ласка, заповніть усі поля.');
      return;
    }

    const newRecipe = {
      title,
      time,
      ingredients,
      image,
      uid: user.uid
    };

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
        return fetch(`http://localhost:5000/api/recipes?uid=${user.uid}`);
      })
      .then(res => res.json())
      .then(data => setRecipes(Array.isArray(data) ? data : []))
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
        {Array.isArray(recipes) &&
          recipes.map((recipe, index) => (
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
