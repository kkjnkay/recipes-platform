import React from 'react';
import RecipeCard from '../components/RecipeCard';
import '../App.css';

export default function HomePage() {
  return (
    <>
      <section className="welcome-box">
        <h1>Ласкаво просимо на платформу рецептів!</h1>
        <p>Знаходьте нові рецепти, діліться своїми кулінарними шедеврами, надихайте інших та створюйте власну колекцію смачних ідей.</p>
      </section>

      <section>
        <h2>Популярні рецепти</h2>
        <div className="recipes-grid">
          <RecipeCard title="Шоколадний торт" time="1 год" ingredients="борошно, яйця, какао" image="chocolate-cake.jpg" />
          <RecipeCard title="Картопля по-селянськи" time="40 хв" ingredients="картопля, спеції, олія" image="potato.jpg" />
        </div>
      </section>
    </>
  );
}