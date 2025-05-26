const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// ✅ Дозволити CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ✅ Тестовий маршрут
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// ✅ Новий маршрут для кореневої сторінки
app.get('/', (req, res) => {
  res.send('✅ Сервер запущено. Використовуйте /api/ для запитів.');
});

// ✅ Отримання рецептів для конкретного користувача
app.get('/api/recipes', async (req, res) => {
  const uid = req.query.uid;

  if (!uid) {
    return res.status(400).json({ error: 'Не вказано uid користувача' });
  }

  try {
    const snapshot = await db
      .collection('recipes')
      .where('uid', '==', uid)
      .orderBy('time')
      .get();

    const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (error) {
    console.error('❌ Помилка при отриманні рецептів:', error);
    res.status(500).json({ error: 'Не вдалося отримати рецепти' });
  }
});

// ✅ Додавання рецепта
app.post('/api/recipes', async (req, res) => {
  const data = req.body;

  if (!data.title || !data.ingredients || !data.time || !data.uid) {
    return res.status(400).json({ error: 'Недостатньо даних або uid відсутній' });
  }

  try {
    await db.collection('recipes').add(data);
    res.status(201).json({ message: 'Рецепт додано' });
  } catch (error) {
    console.error('❌ Помилка при додаванні:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// ✅ Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

