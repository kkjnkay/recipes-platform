const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Маршрут тесту
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// GET: список рецептів (сортований за часом приготування)
app.get('/api/recipes', async (req, res) => {
  const snapshot = await db.collection('recipes').orderBy('time').get();
  const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(recipes);
});

// POST: додати рецепт
app.post('/api/recipes', async (req, res) => {
  const data = req.body;
  if (!data.title || !data.ingredients || !data.time) {
    return res.status(400).json({ error: 'Недостатньо даних' });
  }

  await db.collection('recipes').add(data);
  res.status(201).json({ message: 'Рецепт додано' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
