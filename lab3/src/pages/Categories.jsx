import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const allRecipes = [
  { category: 'Десерти', title: 'Шоколадний торт', time: '1 год', ingredients: '...', image: 'chocolate-cake.jpg' },
  { category: 'Сніданки', title: 'Омлет з овочами', time: '15 хв', ingredients: '...', image: 'omlet.jpg' },
];

export default function Categories() {
  const [filter, setFilter] = useState('Усі');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'categories'));
      const data = snapshot.docs.map(doc => doc.data().title);
      setCategories(['Усі', ...data]);
    };
    fetchCategories();
  }, []);

  const filtered = filter === 'Усі' ? allRecipes : allRecipes.filter(r => r.category === filter);

  return (
    <div>
      <h1>Категорії страв</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        {categories.map((cat) => <option key={cat}>{cat}</option>)}
      </select>
      <div className="recipes-grid">
        {filtered.map((r, i) => <RecipeCard key={i} {...r} />)}
      </div>
    </div>
  );
}