const express = require('express');
const cors = require('cors');
const admin = require('./firebase');
const axios = require('axios');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');
const authenticate = require('./middleaware/auth');

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

const WIT_TOKEN = 'RMCF65UM5QJHRVTPW22SH2C4NSQ6CQZS'; // Paste your token here

app.get('/', (req, res) => {
  res.send('Firebase backend is running!');
});

// Save a mood entry
app.post('/api/mood', authenticate, async (req, res) => {
  const { mood, note } = req.body;
  const userId = req.user.uid;
  try {
    await db.collection('moods').add({
      userId,
      mood,
      note,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ message: 'Mood saved!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving mood', error });
  }
});

// Get all moods for the authenticated user
app.get('/api/moods', authenticate, async (req, res) => {
  const userId = req.user.uid;
  try {
    const snapshot = await db.collection('moods').where('userId', '==', userId).get();
    const moods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching moods', error });
  }
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received message from UI:', message);
  try {
    const rasaRes = await axios.post('http://127.0.0.1:5005/webhooks/rest/webhook', {
      sender: "user",
      message: message
    });
    console.log('Full Rasa response:', JSON.stringify(rasaRes.data, null, 2));
    const reply = rasaRes.data.length > 0 && rasaRes.data[0].text ? rasaRes.data[0].text : "Sorry, I didn't understand that.";
    res.json({ reply });
  } catch (err) {
    console.error('Error from Rasa:', err);
    res.json({ reply: "Sorry, I didn't understand that." });
  }
});

// Save a journal entry
app.post('/api/journal', authenticate, async (req, res) => {
  const { date, content } = req.body;
  const userId = req.user.uid;
  if (!date || !content) {
    console.error('Missing date or content:', { date, content });
    return res.status(400).json({ message: 'Date and content are required.' });
  }
  try {
    const entryRef = db.collection('journals').doc(userId).collection('entries').doc(date);
    await entryRef.set({ content, date });
    res.status(200).json({ message: 'Journal entry saved!' });
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ message: 'Error saving journal entry', error });
  }
});

// Get all journal entries for the authenticated user
app.get('/api/journal', authenticate, async (req, res) => {
  const userId = req.user.uid;
  try {
    const entriesCol = db.collection('journals').doc(userId).collection('entries');
    const snapshot = await entriesCol.get();
    const entries = snapshot.docs.map(doc => ({ date: doc.id, ...doc.data() }));
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ message: 'Error fetching journal entries', error });
  }
});

// Get a single journal entry by date for the authenticated user
app.get('/api/journal/:date', authenticate, async (req, res) => {
  const userId = req.user.uid;
  const { date } = req.params;
  try {
    const entryRef = db.collection('journals').doc(userId).collection('entries').doc(date);
    const entrySnap = await entryRef.get();
    if (entrySnap.exists) {
      res.status(200).json({ date, ...entrySnap.data() });
    } else {
      res.status(404).json({ message: 'Journal entry not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journal entry', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
