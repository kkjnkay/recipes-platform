import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({ title, time, ingredients, image }) {
  return (
    <article className="recipe-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>Час приготування: {time}</p>
      <p>Інгредієнти: {ingredients}</p>
    </article>
  );
}